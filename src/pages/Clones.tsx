import React from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import HeroSection from '@/components/HeroSection';
import UploadSection from '@/components/UploadSection';
import CloneManagement from '@/components/CloneManagement';

const Clones = () => {
  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-background pb-16 md:pb-0">
      <HeroSection />
      {user && (
        <>
          <UploadSection />
          <CloneManagement />
        </>
      )}
    </main>
  );
};

export default Clones;