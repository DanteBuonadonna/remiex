import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const { user, loading } = useAuth();

  console.log('HeroSection - user:', user?.email, 'loading:', loading);

  const scrollToUpload = () => {
    console.log('Scroll to upload clicked');
    const uploadSection = document.getElementById('upload-section');
    if (uploadSection) {
      uploadSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* Logo/Brand */}
        <div className="flex items-center justify-center gap-6">
          <img 
            src="/lovable-uploads/095cbc89-efc6-43e1-9694-05d55aaf5d15.png" 
            alt="Remi Logo" 
            className="w-16 h-16"
          />
          <h1 className="text-8xl font-bold text-foreground">
            Remi
          </h1>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
            Turn Chat Screenshots Into
            <br />
            <span className="text-primary">AI Conversation Partners</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Upload your chat screenshots and create AI clones that text exactly like your friends, 
            family, or anyone you've messaged before.
          </p>
        </div>

        {/* Simple CTA */}
        <div className="space-y-4 -mt-4">
           {user ? (
            <Button 
              size="lg" 
              variant="hero" 
              className="text-lg px-8 py-4" 
              onClick={() => {
                console.log('User button clicked');
                scrollToUpload();
              }}
            >
              Upload Screenshots & Start
            </Button>
          ) : (
            <Link to="/auth">
              <Button 
                size="lg" 
                variant="hero" 
                className="text-lg px-8 py-4"
                onClick={() => console.log('Auth button clicked')}
              >
                Get Started Free
              </Button>
            </Link>
          )}
          <p className="text-sm text-muted-foreground">
            Free to try • No credit card required
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;