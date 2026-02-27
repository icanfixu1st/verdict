import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

const supabaseUrl = "https://hzhhjyfelnyimhvevbow.supabase.co"

const supabaseAnonKey = "sb_publishable_CC4uTbAtubOy0VKQTJy4Rg_P9T3LtSc"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)