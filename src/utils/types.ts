import { RealtimeChannel } from '@supabase/supabase-js';

export interface Star {
  cx: string;
  cy: string;
  r: number;
  opacity: number;
}

export type SupabaseChannel = RealtimeChannel; 