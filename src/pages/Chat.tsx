import React, { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import ChatInterface from '@/components/ChatInterface';
import ChatPreview from '@/components/ChatPreview';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import { useClones } from '@/hooks/useClones';
import avatarPlaceholder from '@/assets/avatar-placeholder.jpg';

const Chat = () => {
  const { user } = useAuth();
  const { clones, loading } = useClones();
  const [selectedClone, setSelectedClone] = useState<any>(null);

  if (!user) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center pb-16 md:pb-0">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Please sign in to chat</h1>
          <p className="text-muted-foreground">You need to be authenticated to access the chat feature.</p>
        </div>
      </main>
    );
  }

  // If a clone is selected, show the chat interface
  if (selectedClone) {
    return (
      <main className="min-h-screen bg-background pb-16 md:pb-0">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedClone(null)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Clones
            </Button>
            <Card className="overflow-hidden">
              <ChatInterface
                clone={selectedClone}
                onBack={() => setSelectedClone(null)}
              />
            </Card>
          </div>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center pb-16 md:pb-0">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your clones...</p>
        </div>
      </main>
    );
  }

  // Show clone selection if user has clones
  if (clones.length > 0) {
    return (
      <main className="min-h-screen bg-background pb-16 md:pb-0">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-8">Chat with Your Clones</h1>
            
            <div className="grid gap-4">
              {clones.map((clone) => {
                const formatDate = (dateString: string) => {
                  const date = new Date(dateString);
                  const now = new Date();
                  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
                  
                  if (diffInHours < 1) return "Just now";
                  if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
                  
                  const diffInDays = Math.floor(diffInHours / 24);
                  return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
                };

                return (
                  <Card 
                    key={clone.id} 
                    className="p-6 hover:shadow-card transition-all duration-300 cursor-pointer"
                    onClick={() => clone.training_status === "completed" && setSelectedClone(clone)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={clone.avatar_url || avatarPlaceholder} alt={clone.name} />
                          <AvatarFallback className="bg-gradient-primary text-white text-lg">
                            {clone.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-xl font-semibold">{clone.name}'s Clone</h3>
                          <p className="text-muted-foreground">
                            Last active {clone.last_active ? formatDate(clone.last_active) : formatDate(clone.created_at)}
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-sm text-muted-foreground">
                              {clone.accuracy_score}% accuracy
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {clone.message_count} messages
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge 
                          variant={clone.training_status === "completed" ? "default" : "secondary"}
                          className={clone.training_status === "completed" ? "bg-green-500 hover:bg-green-600" : ""}
                        >
                          {clone.training_status === "completed" ? "Ready to Chat" : "Processing..."}
                        </Badge>
                        <Button 
                          variant={clone.training_status === "completed" ? "default" : "outline"} 
                          disabled={clone.training_status !== "completed"}
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Start Chat
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Show welcome message with demo if no clones
  return (
    <main className="min-h-screen bg-background pb-16 md:pb-0">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">No Clones Yet</h1>
            <p className="text-muted-foreground mb-6">
              Create your first AI clone to start chatting! Go to the Clones tab to get started.
            </p>
          </div>
          <ChatPreview />
        </div>
      </div>
    </main>
  );
};

export default Chat;