import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface UserScore {
  id?: number;
  user_id: string;
  user_email: string;
  user_name: string;
  score: number;
  win_streak: number;
  total_wins: number;
  total_losses: number;
  total_draws: number;
  created_at?: string;
  updated_at?: string;
}

export interface GameHistory {
  id?: number;
  user_id: string;
  result: 'win' | 'loss' | 'draw';
  score_change: number;
  win_streak_after: number;
  bonus_earned: boolean;
  created_at?: string;
}
