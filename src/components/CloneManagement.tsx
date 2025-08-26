import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Settings, Plus, Crown } from "lucide-react";
import avatarPlaceholder from "@/assets/avatar-placeholder.jpg";

const CloneManagement = () => {
  const clones = [
    {
      id: 1,
      name: "Alex",
      avatar: avatarPlaceholder,
      lastActive: "2 hours ago",
      accuracy: 98,
      messages: 247,
      status: "active",
      isPremium: false,
    },
    {
      id: 2,
      name: "Sam",
      avatar: null,
      lastActive: "1 day ago", 
      accuracy: 94,
      messages: 89,
      status: "processing",
      isPremium: true,
    },
    {
      id: 3,
      name: "Jordan",
      avatar: avatarPlaceholder,
      lastActive: "3 days ago",
      accuracy: 96,
      messages: 156,
      status: "active", 
      isPremium: true,
    },
  ];

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
          {clones.map((clone) => (
            <Card key={clone.id} className="p-6 hover:shadow-card transition-all duration-300 hover:scale-105 bg-gradient-secondary/20 backdrop-blur-sm">
              <div className="space-y-4">
                {/* Clone Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={clone.avatar} alt={clone.name} />
                      <AvatarFallback className="bg-gradient-primary text-white">
                        {clone.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{clone.name}'s Clone</h3>
                        {clone.isPremium && (
                          <Crown className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">Last active {clone.lastActive}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{clone.accuracy}%</p>
                    <p className="text-xs text-muted-foreground">Accuracy</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{clone.messages}</p>
                    <p className="text-xs text-muted-foreground">Messages</p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between">
                  <Badge 
                    variant={clone.status === "active" ? "default" : "secondary"}
                    className={clone.status === "active" ? "bg-green-500 hover:bg-green-600" : ""}
                  >
                    {clone.status === "active" ? "Ready to Chat" : "Processing..."}
                  </Badge>
                  {clone.isPremium && (
                    <Badge variant="outline" className="border-yellow-500 text-yellow-600">
                      Voice Enabled
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button 
                    variant={clone.status === "active" ? "default" : "outline"} 
                    size="sm" 
                    className="flex-1"
                    disabled={clone.status !== "active"}
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
          ))}

          {/* Add New Clone Card */}
          <Card className="p-6 border-dashed border-primary/30 hover:border-primary/50 transition-colors cursor-pointer group">
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 group-hover:scale-105 transition-transform">
              <div className="p-4 rounded-full bg-gradient-primary/10 group-hover:bg-gradient-primary/20 transition-colors">
                <Plus className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Create New Clone</h3>
                <p className="text-sm text-muted-foreground">
                  Upload chat screenshots to create another personality clone
                </p>
              </div>
              <Button variant="outline" size="sm" className="mt-2">
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
              <Button variant="hero" className="w-full">
                Upgrade for $9/month
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CloneManagement;