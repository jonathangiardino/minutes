import { supabase } from "@/utils/supabaseClient";

// TYPES
export interface User {
  id?: number;
  created_at?: string;
  subscribed?: boolean;
  subscribed_on?: string;
  subscription_expires_on?: string;
  beta?: boolean;
  user_id: string;
}

export interface Log {
  id?: number;
  unique_id: string;
  created_at?: string;
  date: string;
  json: string;
  user_id: string;
}

// USER HANDLERS
export const createUser = async (userData: User) => {
  const { error } = await supabase.from("user").insert([{ ...userData }]);

  if (error) return { error };

  return { error: null };
};

export const getUser = async (uuid: string) => {
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("user_id", uuid);

  if (error) return { error, data: null };
  return { error: null, data };
};

// LOGS HANDLERS
export const saveLog = async (log: Log) => {
  const { error } = await supabase.from("log").upsert({ ...log });

  if (error) return { error };
  return { error: null };
};

export const saveBulkLogs = async (logs: Log[]) => {
  const { error } = await supabase.from("log").upsert([...logs]);

  if (error) return { error };
  return { error: null };
};

export const getLogs = async (uuid: string | undefined) => {
  const { data, error } = await supabase
    .from("log")
    .select("*")
    .eq("user_id", uuid);

  if (error) return { error, data: null };
  return { error: null, data };
};
