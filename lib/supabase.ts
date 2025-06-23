/* Получаем переменные окружения из разных возможных источников:   */
/* – process.env в Node.js, import.meta.env в vite/next-lite        */
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  (typeof import.meta !== "undefined"
    ? import.meta.env.NEXT_PUBLIC_SUPABASE_URL
    : undefined) ??
  "";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  (typeof import.meta !== "undefined"
    ? import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    : undefined) ??
  "";

/* Показываем понятную ошибку, если переменные не заданы */
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase credentials are missing.\n" +
      "Добавьте переменные NEXT_PUBLIC_SUPABASE_URL и NEXT_PUBLIC_SUPABASE_ANON_KEY " +
      "в настройки проекта Vercel (Project → Settings → Environment Variables)."
  );
}

/* Единый клиент для браузера и сервера */
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export interface Project {
  id: string;
  title: string;
  description: string;
  long_description?: string;
  image_url?: string;
  tech: string[];
  category: string;
  github_url?: string;
  demo_url?: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject?: string;
  project_type?: string;
  budget?: string;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}
