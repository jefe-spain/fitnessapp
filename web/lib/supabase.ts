import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for our database tables
export type Client = {
  id: string;
  name: string;
  email: string;
  registration_date: string;
  subscription_status: 'Active' | 'Expired' | 'Cancelled';
  subscription_plan_id?: string;
};

export type Plan = {
  id: string;
  name: string;
  type: 'Workout' | 'Nutrition';
  description?: string;
};

export type ClientPlan = {
  client_id: string;
  plan_id: string;
};
