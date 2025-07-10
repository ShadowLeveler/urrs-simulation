import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://anopwstocseosukezsgo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFub3B3c3RvY3Nlb3N1a2V6c2dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNzAxNjgsImV4cCI6MjA2Nzc0NjE2OH0.CyXH2dL60i8NARHm52e-5LlznqhfCIG_xFN2LeVqbak'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
