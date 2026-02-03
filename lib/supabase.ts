import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type DetectionResult = {
  id: string;
  user_id: string;
  type: 'url' | 'email' | 'file';
  input: string;
  result: {
    isPhishing: boolean;
    risk_score: number;
    indicators: string[];
    recommendation: string;
  };
  created_at: string;
};

export type Report = {
  id: string;
  user_id: string;
  detection_id: string;
  category: string;
  description: string;
  created_at: string;
};
