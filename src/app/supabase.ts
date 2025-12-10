import { createClient } from '@supabase/supabase-js';

const Supabase = createClient(
  "https://itmyvglglpxgcvikpjfy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0bXl2Z2xnbHB4Z2N2aWtwamZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxMDM5MjcsImV4cCI6MjA4MDY3OTkyN30.a_f8t9uB9bmpGhqFMM6QPoQ7havDjUKk_gJMeHcFMMY"
);
export default Supabase;
