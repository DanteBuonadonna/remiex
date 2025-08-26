import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';

export interface Clone {
  id: string;
  name: string;
  avatar_url?: string;
  personality_description?: string;
  training_status: string;
  accuracy_score: number;
  message_count: number;
  last_active?: string;
  created_at: string;
  updated_at: string;
}

export const useClones = () => {
  const [clones, setClones] = useState<Clone[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchClones = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('ai_clones')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClones(data || []);
    } catch (error) {
      console.error('Error fetching clones:', error);
    } finally {
      setLoading(false);
    }
  };

  const createClone = async (name: string, personalityDescription?: string) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('ai_clones')
        .insert({
          user_id: user.id,
          name,
          personality_description: personalityDescription,
          training_status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;
      
      await fetchClones(); // Refresh the list
      return data;
    } catch (error) {
      console.error('Error creating clone:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchClones();
  }, [user]);

  return {
    clones,
    loading,
    createClone,
    refetchClones: fetchClones,
  };
};