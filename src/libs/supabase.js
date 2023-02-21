import { createClient } from "@supabase/supabase-js";
import { useSession } from "next-auth/react";

export const getSupabaseAccessToken = () => {
    const { data: session } = useSession();
    const { supabaseAccessToken } = session;
    return supabaseAccessToken;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
        headers: {
            Authorization: `Bearer ${getSupabaseAccessToken}`,
        },
    },
});
