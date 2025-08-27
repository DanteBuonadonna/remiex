import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, MessageCircle, Image, Zap, Crown, Users } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "AI Personality Cloning",
      description: "Create digital clones that mimic your personality, communication style, and knowledge.",
      status: "Available",
      premium: false
    },
    {
      icon: Image,
      title: "Image-Based Training",
      description: "Upload multiple images to help your clone understand visual context and references.",
      status: "Available", 
      premium: false
    },
    {
      icon: Zap,
      title: "Real-time Conversations",
      description: "Chat with your clones in real-time using advanced AI models.",
      status: "Available",
      premium: false
    },
    {
      icon: Users,
      title: "Multiple Clone Profiles",
      description: "Create and manage multiple AI clones for different purposes and personalities.",
      status: "Coming Soon",
      premium: true
    },
    {
      icon: Crown,
      title: "Premium AI Models",
      description: "Access to GPT-4 and other premium AI models for enhanced clone intelligence.",
      status: "Premium",
      premium: true
    },
    {
      icon: Sparkles,
      title: "Advanced Customization",
      description: "Fine-tune your clone's responses, personality traits, and knowledge base.",
      status: "Coming Soon",
      premium: true
    }
  ];

  return (
    <main className="min-h-screen bg-background pb-16 md:pb-0">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl font-bold text-foreground">Features</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the powerful capabilities of Remi's AI clone technology
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-card transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Icon className="h-8 w-8 text-primary" />
                      <div className="flex gap-2">
                        {feature.premium && (
                          <Badge variant="secondary" className="text-xs">
                            <Crown className="h-3 w-3 mr-1" />
                            Premium
                          </Badge>
                        )}
                        <Badge 
                          variant={
                            feature.status === "Available" ? "default" :
                            feature.status === "Premium" ? "secondary" : "outline"
                          }
                          className="text-xs"
                        >
                          {feature.status}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center space-y-6">
            <Card className="bg-gradient-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="text-2xl">Ready to Create Your First Clone?</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Get started with Remi and experience the future of AI personality cloning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="bg-background text-foreground hover:bg-background/90"
                >
                  Create Your Clone
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Features;