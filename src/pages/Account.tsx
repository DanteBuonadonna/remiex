import React, { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Crown, LogOut, Settings, CreditCard, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Account = () => {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleUpgradeToPremium = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { userId: user.id }
      });

      if (error) throw error;
      
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Failed to create checkout session');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center pb-16 md:pb-0">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Please sign in</h1>
          <p className="text-muted-foreground">You need to be authenticated to access your account.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pb-16 md:pb-0">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
            <p className="text-muted-foreground">Manage your profile and subscription</p>
          </div>

          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user.user_metadata?.avatar_url} alt="Profile" />
                  <AvatarFallback>
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    {user.user_metadata?.full_name || user.email}
                  </h3>
                  <p className="text-muted-foreground">{user.email}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Free Plan</Badge>
                    <Badge variant="secondary" className="text-xs">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-primary" />
                Subscription
              </CardTitle>
              <CardDescription>
                Upgrade to Premium for unlimited clones and advanced features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Current Plan</span>
                  <Badge variant="outline">Free</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Clones Created</span>
                  <span className="text-sm font-medium">0 / 1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Messages per Month</span>
                  <span className="text-sm font-medium">0 / 100</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="bg-gradient-primary p-4 rounded-lg text-primary-foreground">
                  <h4 className="font-semibold mb-2">Premium Benefits</h4>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• Unlimited AI clones</li>
                    <li>• Unlimited messages</li>
                    <li>• Priority support</li>
                    <li>• Advanced customization</li>
                  </ul>
                </div>
                
                <Button 
                  onClick={handleUpgradeToPremium}
                  disabled={loading}
                  className="w-full"
                  size="lg"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  {loading ? 'Processing...' : 'Upgrade to Premium - $9.99/month'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Account Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => toast.info('Settings panel coming soon!')}
              >
                <Settings className="h-4 w-4 mr-2" />
                Account Settings
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start text-destructive hover:text-destructive"
                onClick={signOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Account;