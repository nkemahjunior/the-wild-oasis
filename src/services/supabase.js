
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://ezkecyzhdopnxuhdhqrp.supabase.co'

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6a2VjeXpoZG9wbnh1aGRocXJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ0ODI5NDcsImV4cCI6MjAxMDA1ODk0N30.iYFs9-RrOr1BRLGTsNIt-vBEtLeXxwDdn8LaGF5gAZU"

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;