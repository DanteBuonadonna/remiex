import { useAuth } from "@/components/auth/AuthProvider";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/HeroSection";
import UploadSection from "@/components/UploadSection";
import ChatPreview from "@/components/ChatPreview";
import CloneManagement from "@/components/CloneManagement";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      {user && (
        <>
          <UploadSection />
          <ChatPreview />
          <CloneManagement />
        </>
      )}
    </main>
  );
};

export default Index;