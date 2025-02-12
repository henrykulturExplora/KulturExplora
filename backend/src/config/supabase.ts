import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string; // Fix this

console.log("supabaseUrl: ", supabaseUrl);
console.log("supabaseKey: ", supabaseKey);

export const supabase = createClient(supabaseUrl, supabaseKey);
