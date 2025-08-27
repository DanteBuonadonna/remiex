import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Send, ArrowLeft, Bot } from "lucide-react";
import avatarPlaceholder from "@/assets/avatar-placeholder.jpg";

interface ChatMessage {
  id: string;
  message: string;
  role: 'user' | 'assistant';
  created_at: string;
}

interface Clone {
  id: string;
  name: string;
  avatar_url?: string;
  personality_description?: string;
}

interface ChatInterfaceProps {
  clone: Clone;
  onBack: () => void;
}

const ChatInterface = ({ clone, onBack }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    fetchMessages();
  }, [clone.id]);

  const fetchMessages = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('clone_id', clone.id)
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages((data || []) as ChatMessage[]);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: "Error",
        description: "Failed to load chat history",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !user || sending) return;

    const userMessage = newMessage.trim();
    setNewMessage('');
    setSending(true);

    try {
      // Add user message to database
      const { error: userError } = await supabase
        .from('chat_messages')
        .insert({
          clone_id: clone.id,
          user_id: user.id,
          message: userMessage,
          role: 'user',
        });

      if (userError) throw userError;

      // Add user message to local state immediately
      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        message: userMessage,
        role: 'user',
        created_at: new Date().toISOString(),
      };
      setMessages(prev => [...prev, userMsg]);

      // Call chat function to get AI response
      const { data, error } = await supabase.functions.invoke('chat-with-clone', {
        body: {
          cloneId: clone.id,
          message: userMessage,
          cloneName: clone.name,
          personalityDescription: clone.personality_description,
        },
      });

      if (error) throw error;

      const assistantMessage = data.response;

      // Add assistant response to database
      const { error: assistantError } = await supabase
        .from('chat_messages')
        .insert({
          clone_id: clone.id,
          user_id: user.id,
          message: assistantMessage,
          role: 'assistant',
        });

      if (assistantError) throw assistantError;

      // Add assistant message to local state
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: assistantMessage,
        role: 'assistant',
        created_at: new Date().toISOString(),
      };
      setMessages(prev => [...prev, assistantMsg]);

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px]">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <Avatar className="w-10 h-10">
          <AvatarImage src={clone.avatar_url || avatarPlaceholder} alt={clone.name} />
          <AvatarFallback className="bg-gradient-primary text-white">
            {clone.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{clone.name}'s Clone</h3>
          <p className="text-sm text-muted-foreground">AI Assistant</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <Bot className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Start a conversation with {clone.name}'s clone!
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <Avatar className="w-8 h-8">
                  <AvatarImage src={clone.avatar_url || avatarPlaceholder} alt={clone.name} />
                  <AvatarFallback className="bg-gradient-primary text-white text-xs">
                    {clone.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground ml-auto'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{message.message}</p>
                <p className="text-xs opacity-70 mt-1">
                  {new Date(message.created_at).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Message ${clone.name}...`}
            onKeyPress={handleKeyPress}
            disabled={sending}
          />
          <Button onClick={sendMessage} disabled={!newMessage.trim() || sending}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;