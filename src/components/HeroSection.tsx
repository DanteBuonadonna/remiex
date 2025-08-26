import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* Logo/Brand */}
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 rounded-full bg-gradient-primary">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">
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
          <Button size="lg" variant="hero" className="text-lg px-8 py-4">
            Upload Screenshots & Start
          </Button>
          <p className="text-sm text-muted-foreground">
            Free to try • No credit card required
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;