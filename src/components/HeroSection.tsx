import { Button } from "@/components/ui/button";
import { MessageCircle, Sparkles, Upload } from "lucide-react";
import heroBackground from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-hero/80" />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="space-y-8">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="p-3 rounded-full bg-gradient-primary shadow-glow">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Remi
            </h1>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Relive
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Conversations</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Upload chat screenshots and create AI clones that perfectly capture the personality, 
              tone, and style of your past conversations
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="flex flex-wrap justify-center gap-6 my-12">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Upload className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Upload Screenshots</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">AI Personality Clone</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <MessageCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Natural Conversations</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="hero" className="min-w-48">
              Create Your First Clone
            </Button>
            <Button size="lg" variant="outline" className="min-w-48">
              See How It Works
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-sm text-muted-foreground mb-4">
              Your privacy is our priority. All data is encrypted and secure.
            </p>
            <div className="flex justify-center items-center gap-8 text-xs text-muted-foreground/70">
              <span>🔒 End-to-End Encrypted</span>
              <span>🗑️ Delete Anytime</span>
              <span>🔥 No Data Mining</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;