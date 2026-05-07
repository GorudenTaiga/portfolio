import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase: ReturnType<typeof createClient> | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export async function fetchProjects() {
  if (!supabase) {
    console.warn('Supabase not configured, returning empty projects');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return [];
  }
}

export async function fetchSkills() {
  if (!supabase) {
    console.warn('Supabase not configured, returning empty skills');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching skills:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch skills:', error);
    return [];
  }
}
