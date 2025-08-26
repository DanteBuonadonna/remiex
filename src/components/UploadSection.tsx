import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Image, Smartphone, MessageSquare } from "lucide-react";

const UploadSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Upload Your <span className="bg-gradient-primary bg-clip-text text-transparent">Chat History</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Simply upload screenshots from any messaging app. Our AI analyzes conversation patterns, 
            emoji usage, tone, and personality to create an authentic clone.
          </p>
        </div>

        {/* Upload Interface */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Upload Card */}
          <Card className="p-8 shadow-card border-primary/10 bg-gradient-secondary/50 backdrop-blur-sm">
            <div className="text-center space-y-6">
              <div className="p-6 rounded-full bg-gradient-primary/10 w-fit mx-auto">
                <Upload className="w-12 h-12 text-primary" />
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-2">Drag & Drop Screenshots</h3>
                <p className="text-muted-foreground">
                  Upload chat screenshots from iMessage, WhatsApp, Instagram, or any messaging app
                </p>
              </div>

              <div className="border-2 border-dashed border-primary/30 rounded-lg p-12 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="space-y-4">
                  <Image className="w-16 h-16 text-primary/60 mx-auto" />
                  <div>
                    <p className="font-medium">Drop your screenshots here</p>
                    <p className="text-sm text-muted-foreground">or click to browse files</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Choose Files
                  </Button>
                </div>
              </div>

              <div className="flex justify-center gap-4 text-xs text-muted-foreground">
                <span>📱 iOS Screenshots</span>
                <span>🤖 Android Screenshots</span>
                <span>💻 Desktop Screenshots</span>
              </div>
            </div>
          </Card>

          {/* Supported Apps */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-center lg:text-left">
              Works with any messaging app
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "iMessage", icon: "💬", color: "from-blue-500 to-cyan-500" },
                { name: "WhatsApp", icon: "📱", color: "from-green-500 to-emerald-500" },
                { name: "Instagram", icon: "📷", color: "from-pink-500 to-purple-500" },
                { name: "Discord", icon: "🎮", color: "from-indigo-500 to-purple-500" },
                { name: "Telegram", icon: "✈️", color: "from-sky-500 to-blue-500" },
                { name: "Messenger", icon: "💙", color: "from-blue-500 to-indigo-500" },
              ].map((app) => (
                <Card key={app.name} className="p-4 hover:shadow-card transition-all duration-300 hover:scale-105 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${app.color} flex items-center justify-center text-white text-lg`}>
                      {app.icon}
                    </div>
                    <span className="font-medium">{app.name}</span>
                  </div>
                </Card>
              ))}
            </div>

            {/* Process Steps */}
            <div className="space-y-4 mt-8">
              <h4 className="font-semibold text-lg">How it works:</h4>
              <div className="space-y-3">
                {[
                  { step: "1", text: "Upload chat screenshots", icon: Upload },
                  { step: "2", text: "AI analyzes personality patterns", icon: MessageSquare },
                  { step: "3", text: "Start chatting with your clone", icon: Smartphone },
                ].map(({ step, text, icon: Icon }) => (
                  <div key={step} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-primary text-white flex items-center justify-center text-sm font-bold">
                      {step}
                    </div>
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;