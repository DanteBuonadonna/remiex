import { useState, useCallback } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileImage, CheckCircle, ArrowLeft } from "lucide-react";

interface EnhancedCloneCreationProps {
  onBack: () => void;
  onCloneCreated: (cloneId: string) => void;
}

const EnhancedCloneCreation = ({ onBack, onCloneCreated }: EnhancedCloneCreationProps) => {
  const [step, setStep] = useState(1);
  const [cloneName, setCloneName] = useState('');
  const [cloneDescription, setCloneDescription] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [creating, setCreating] = useState(false);
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

  const handleCreateClone = async () => {
    if (!user) return;
    
    setCreating(true);
    try {
      const { data, error } = await supabase
        .from('ai_clones')
        .insert({
          user_id: user.id,
          name: cloneName,
          personality_description: cloneDescription,
          training_status: 'completed', // Mark as ready for demo
          uploaded_image_count: uploadedFiles,
          accuracy_score: Math.max(60, Math.min(95, 60 + uploadedFiles * 2)), // Simple scoring
        })
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Clone Created!",
        description: `${cloneName}'s clone is ready to chat`,
      });
      
      onCloneCreated(data.id);
    } catch (error) {
      console.error('Error creating clone:', error);
      toast({
        title: "Error",
        description: "Failed to create clone",
        variant: "destructive",
      });
    } finally {
      setCreating(false);
    }
  };

  if (step === 1) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-2xl font-bold">Create New Clone</h2>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="clone-name">Clone Name</Label>
              <Input
                id="clone-name"
                placeholder="Enter the person's name you want to clone"
                value={cloneName}
                onChange={(e) => setCloneName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="clone-description">Personality Description (Optional)</Label>
              <Textarea
                id="clone-description"
                placeholder="Describe their personality, communication style, or any other details..."
                value={cloneDescription}
                onChange={(e) => setCloneDescription(e.target.value)}
              />
            </div>
            <Button 
              onClick={() => setStep(2)} 
              className="w-full"
              disabled={!cloneName.trim()}
            >
              Next: Upload Screenshots
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => setStep(1)}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Upload Screenshots for {cloneName}</h2>
          <p className="text-muted-foreground">Step 2 of 2</p>
        </div>
      </div>

      <Card className="p-8">
        <div className="text-center space-y-6">
          <div className="p-6 rounded-full bg-gradient-primary/10 w-fit mx-auto">
            <Upload className="w-12 h-12 text-primary" />
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-2">Upload Chat Screenshots</h3>
            <p className="text-muted-foreground">
              Upload screenshots from conversations with {cloneName}
            </p>
          </div>

          {/* Upload Progress */}
          {uploadedFiles > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium">{uploadedFiles} files uploaded</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((uploadedFiles / 10) * 100, 100)}%` }}
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

          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={() => handleCreateClone()}
              disabled={creating}
              className="flex-1"
            >
              {creating ? 'Creating Clone...' : 'Create Clone Without Images'}
            </Button>
            <Button 
              onClick={() => handleCreateClone()}
              disabled={uploadedFiles === 0 || creating}
              className="flex-1"
            >
              {creating ? 'Creating Clone...' : `Create Clone (${uploadedFiles} images)`}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EnhancedCloneCreation;