import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Settings, Plus, Crown } from "lucide-react";
import { useClones } from "@/hooks/useClones";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import avatarPlaceholder from "@/assets/avatar-placeholder.jpg";
import EnhancedCloneCreation from "./EnhancedCloneCreation";
import ChatInterface from "./ChatInterface";

const CloneManagement = () => {
  const { clones, loading, refetchClones } = useClones();
  const [view, setView] = useState<'list' | 'create' | 'chat'>('list');
  const [selectedClone, setSelectedClone] = useState<any>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    checkSubscription();
  }, [user]);

  const checkSubscription = async () => {
    if (!user) return;

    try {
      const { data } = await supabase.functions.invoke('check-subscription');
      setIsSubscribed(data?.subscribed || false);
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  const handleUpgradeClick = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout');
      if (error) throw error;
      
      // Open Stripe checkout in new tab
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Error",
        description: "Failed to start checkout process",
        variant: "destructive",
      });
    }
  };

  const handleCloneCreated = (cloneId: string) => {
    refetchClones();
    setView('list');
    toast({
      title: "Success!",
      description: "Your clone is ready to chat!",
    });
  };

  const handleChatClick = (clone: any) => {
    setSelectedClone(clone);
    setView('chat');
  };

  if (loading) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your clones...</p>
        </div>
      </section>
    );
  }

  if (view === 'create') {
    return (
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <EnhancedCloneCreation
            onBack={() => setView('list')}
            onCloneCreated={handleCloneCreated}
          />
        </div>
      </section>
    );
  }

  if (view === 'chat' && selectedClone) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <ChatInterface
              clone={selectedClone}
              onBack={() => setView('list')}
            />
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Manage Your <span className="bg-gradient-primary bg-clip-text text-transparent">AI Clones</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Create multiple personality clones and customize their behavior. 
            Each clone learns and adapts to provide more accurate conversations over time.
          </p>
        </div>

        {/* Clone Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
              <Card key={clone.id} className="p-6 hover:shadow-card transition-all duration-300 hover:scale-105 bg-gradient-secondary/20 backdrop-blur-sm">
                <div className="space-y-4">
                  {/* Clone Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={clone.avatar_url || avatarPlaceholder} alt={clone.name} />
                        <AvatarFallback className="bg-gradient-primary text-white">
                          {clone.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{clone.name}'s Clone</h3>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Last active {clone.last_active ? formatDate(clone.last_active) : formatDate(clone.created_at)}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{clone.accuracy_score}%</p>
                      <p className="text-xs text-muted-foreground">Accuracy</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{clone.message_count}</p>
                      <p className="text-xs text-muted-foreground">Messages</p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={clone.training_status === "completed" ? "default" : "secondary"}
                      className={clone.training_status === "completed" ? "bg-green-500 hover:bg-green-600" : ""}
                    >
                      {clone.training_status === "completed" ? "Ready to Chat" : "Processing..."}
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      variant={clone.training_status === "completed" ? "default" : "outline"} 
                      size="sm" 
                      className="flex-1"
                      disabled={clone.training_status !== "completed"}
                      onClick={() => handleChatClick(clone)}
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Chat
                    </Button>
                    <Button variant="outline" size="sm">
                      Customize
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}

          {/* Add New Clone Card */}
          <Card 
            className="p-6 border-dashed border-primary/30 hover:border-primary/50 transition-colors cursor-pointer group"
            onClick={() => setView('create')}
          >
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 group-hover:scale-105 transition-transform">
              <div className="p-4 rounded-full bg-gradient-primary/10 group-hover:bg-gradient-primary/20 transition-colors">
                <Plus className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Create New Clone</h3>
                <p className="text-sm text-muted-foreground">
                  Create another personality clone
                </p>
              </div>
              <Button variant="outline" size="sm" className="mt-2 pointer-events-none">
                Get Started
              </Button>
            </div>
          </Card>
        </div>

        {/* Free vs Premium */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6 bg-gradient-secondary/30">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Free Plan</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✅ 1 personality clone</li>
                <li>✅ Text-only conversations</li>
                <li>✅ Basic personality matching</li>
                <li>✅ 100 messages per month</li>
                <li>❌ Voice cloning</li>
                <li>❌ Unlimited clones</li>
              </ul>
              <Button variant="outline" className="w-full">
                Current Plan
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-primary/5 border-primary/20">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold">Premium Plan</h3>
                <Crown className="w-5 h-5 text-yellow-500" />
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✅ Unlimited personality clones</li>
                <li>✅ Voice cloning & responses</li>
                <li>✅ Advanced personality tuning</li>
                <li>✅ Unlimited messages</li>
                <li>✅ Priority processing</li>
                <li>✅ Export conversations</li>
              </ul>
              <Button 
                variant="hero" 
                className="w-full"
                onClick={handleUpgradeClick}
                disabled={isSubscribed}
              >
                {isSubscribed ? 'Current Plan' : 'Upgrade for $9/month'}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CloneManagement;