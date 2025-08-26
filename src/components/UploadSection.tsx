import { useState, useCallback } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileImage, Smartphone, MessageSquare, CheckCircle } from "lucide-react";

const UploadSection = () => {
  const [uploadedFiles, setUploadedFiles] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const maxFiles = 50;

  const handleFiles = useCallback(async (files: FileList) => {
    if (!user) return;

    setUploading(true);
    const fileArray = Array.from(files);
    let successCount = 0;

    for (const file of fileArray) {
      try {
        // Upload to Supabase Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('chat-screenshots')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Save file record to database
        const { error: dbError } = await supabase
          .from('uploaded_files')
          .insert({
            user_id: user.id,
            file_name: file.name,
            file_path: filePath,
            file_size: file.size,
          });

        if (dbError) throw dbError;

        successCount++;
      } catch (error) {
        console.error('Upload error:', error);
        toast({
          title: "Upload Error",
          description: `Failed to upload ${file.name}`,
          variant: "destructive",
        });
      }
    }

    setUploadedFiles(prev => prev + successCount);
    setUploading(false);

    if (successCount > 0) {
      toast({
        title: "Success!",
        description: `Uploaded ${successCount} file(s) successfully`,
      });
    }
  }, [user, toast]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  return (
    <section id="upload-section" className="py-20 px-6">
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
              {uploadedFiles > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium">{uploadedFiles} of {maxFiles} files uploaded</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(uploadedFiles / maxFiles) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              <div 
                className={`border-2 border-dashed rounded-lg p-12 transition-colors cursor-pointer relative ${
                  dragActive 
                    ? 'border-primary bg-primary/5' 
                    : 'border-primary/30 bg-white/5 hover:bg-white/10'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={uploading}
                />
                <div className="space-y-4">
                  <FileImage className="w-16 h-16 text-primary/60 mx-auto" />
                  <div>
                    <p className="font-medium">Drop screenshots here or click to browse</p>
                    <p className="text-sm text-muted-foreground">Supports PNG, JPG, JPEG files</p>
                    <p className="text-xs text-muted-foreground mt-2">Maximum {maxFiles} files</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={uploading}
                    className="pointer-events-none"
                  >
                    {uploading ? 'Uploading...' : 'Choose Files'}
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
              disabled={uploadedFiles === 0}
              className="min-w-48"
            >
              {uploadedFiles > 0 ? `Create Clone (${uploadedFiles} files)` : 'Upload Files First'}
            </Button>
            {uploadedFiles > 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                Processing will take about {Math.ceil(uploadedFiles / 10)} minute{uploadedFiles > 10 ? 's' : ''}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;