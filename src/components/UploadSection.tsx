import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Image, Smartphone, MessageSquare, CheckCircle } from "lucide-react";
import { useState } from "react";

const UploadSection = () => {
  const [uploadedCount, setUploadedCount] = useState(0);
  const maxFiles = 50;

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Upload Your <span className="text-primary">Chat Screenshots</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Upload up to 50 screenshots from any messaging app. More screenshots = better personality accuracy.
          </p>
        </div>

        {/* Upload Interface */}
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 shadow-card border-primary/10 bg-gradient-secondary/30">
            <div className="text-center space-y-6">
              <div className="p-6 rounded-full bg-gradient-primary/10 w-fit mx-auto">
                <Upload className="w-12 h-12 text-primary" />
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-2">Drop Your Screenshots Here</h3>
                <p className="text-muted-foreground">
                  Upload up to {maxFiles} chat screenshots from any messaging app
                </p>
              </div>

              {/* Upload Progress */}
              {uploadedCount > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium">{uploadedCount} of {maxFiles} files uploaded</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(uploadedCount / maxFiles) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="border-2 border-dashed border-primary/30 rounded-lg p-12 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="space-y-4">
                  <Image className="w-16 h-16 text-primary/60 mx-auto" />
                  <div>
                    <p className="font-medium">Drop screenshots here or click to browse</p>
                    <p className="text-sm text-muted-foreground">Supports PNG, JPG, JPEG files</p>
                    <p className="text-xs text-muted-foreground mt-2">Maximum {maxFiles} files</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setUploadedCount(Math.min(uploadedCount + 5, maxFiles))}
                  >
                    Choose Files
                  </Button>
                </div>
              </div>

              <div className="flex justify-center gap-6 text-xs text-muted-foreground">
                <span>📱 iPhone Screenshots</span>
                <span>🤖 Android Screenshots</span>
                <span>💻 Desktop Screenshots</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Tips Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tips Cards */}
            <Card className="p-6 text-center hover:shadow-card transition-all duration-300">
              <MessageSquare className="w-10 h-10 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">More is Better</h4>
              <p className="text-sm text-muted-foreground">
                Upload 20+ screenshots for the most accurate personality cloning
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-card transition-all duration-300">
              <Smartphone className="w-10 h-10 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Any App Works</h4>
              <p className="text-sm text-muted-foreground">
                iMessage, WhatsApp, Instagram, Discord, Telegram, and more
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-card transition-all duration-300 md:col-span-2 lg:col-span-1">
              <Upload className="w-10 h-10 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Quick Processing</h4>
              <p className="text-sm text-muted-foreground">
                Your clone will be ready to chat in under 2 minutes
              </p>
            </Card>
          </div>

          {/* Next Step */}
          <div className="text-center mt-12">
            <Button 
              variant="hero" 
              size="lg" 
              disabled={uploadedCount === 0}
              className="min-w-48"
            >
              {uploadedCount > 0 ? `Create Clone (${uploadedCount} files)` : 'Upload Files First'}
            </Button>
            {uploadedCount > 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                Processing will take about {Math.ceil(uploadedCount / 10)} minute{uploadedCount > 10 ? 's' : ''}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;