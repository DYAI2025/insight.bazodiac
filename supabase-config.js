// supabase-config.js
// Supabase client — imported by all auth-aware pages via ES module.
// The anon key is the PUBLIC key, safe to ship in frontend code.
// It is protected by Row Level Security policies in the database.
// The service_role key NEVER goes here.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = 'https://eximozifocnzyazcszuh.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4aW1vemlmb2NuenlhemNzenVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMzUxMTIsImV4cCI6MjA5MDkxMTExMn0.MsHPCMIpU01_u7DI0SLgHU5CsMMTjvR8jewsSyA4GP0'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
