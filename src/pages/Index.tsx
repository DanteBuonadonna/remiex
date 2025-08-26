import HeroSection from "@/components/HeroSection";
import UploadSection from "@/components/UploadSection";
import ChatPreview from "@/components/ChatPreview";
import CloneManagement from "@/components/CloneManagement";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <UploadSection />
      <ChatPreview />
      <CloneManagement />
    </main>
  );
};

export default Index;