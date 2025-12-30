import { supabase } from "./supabaseClient";

export const getProductsById = async (id) => {
  const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }
  return data;
}