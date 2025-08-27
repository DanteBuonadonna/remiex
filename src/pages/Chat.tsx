import React from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import ChatInterface from '@/components/ChatInterface';
import ChatPreview from '@/components/ChatPreview';

const Chat = () => {
  const { user } = useAuth();

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

  return (
    <main className="min-h-screen bg-background pb-16 md:pb-0">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">Chat with Your Clones</h1>
          <ChatPreview />
        </div>
      </div>
    </main>
  );
};

export default Chat;