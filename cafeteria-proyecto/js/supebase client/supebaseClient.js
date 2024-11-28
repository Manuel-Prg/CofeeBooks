import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tdxceutynbqfjevvhoeu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkeGNldXR5bmJxZmpldnZob2V1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3NTcyMzUsImV4cCI6MjA0ODMzMzIzNX0.DTV7g_1nU_5xRTmm_WguOgQkCBuK9fPsXraW1WVJ7jk'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase