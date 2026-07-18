/**
 * study-hub feature — data access layer
 *
 * Supabase data-access functions for the study-hub module.
 * All queries go through the Supabase client — no raw SQL from client-reachable paths.
 */

import { createClient } from "@/lib/supabase/server";
import type { GetResourcesQuery } from "./schema";

export async function fetchResources(query: GetResourcesQuery) {
  const supabase = await createClient();
  let dbQuery = supabase
    .from("resources")
    .select(`
      *,
      category:resource_categories!inner (
        id,
        slug,
        label,
        audience
      )
    `)
    .eq("published", true)
    .order("created_at", { ascending: false })
    .order("id", { ascending: false });

  // Handle category filtering
  if (query.category) {
    dbQuery = dbQuery.eq("category.slug", query.category);
  }

  // Handle contentType filtering
  if (query.contentType) {
    dbQuery = dbQuery.eq("content_type", query.contentType);
  }

  // Handle ILIKE keyword search
  if (query.q) {
    dbQuery = dbQuery.or(`title.ilike.%${query.q}%,content.ilike.%${query.q}%`);
  }

  // Handle cursor pagination
  if (query.cursor) {
    const [createdAt, id] = query.cursor.split(",");
    if (createdAt && id) {
      dbQuery = dbQuery.or(`created_at.lt.${createdAt},and(created_at.eq.${createdAt},id.lt.${id})`);
    }
  }

  // Limit
  dbQuery = dbQuery.limit(query.limit);

  const { data, error } = await dbQuery;

  if (error) {
    throw error;
  }

  return data;
}

export async function fetchResourceBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("resources")
    .select(`
      *,
      category:resource_categories (
        id,
        slug,
        label,
        audience
      )
    `)
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // not found
    throw error;
  }

  return data;
}

export async function fetchRelatedResources(categoryId: string, excludeId: string, limit: number = 3) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("resources")
    .select(`
      *,
      category:resource_categories (
        id,
        slug,
        label,
        audience
      )
    `)
    .eq("category_id", categoryId)
    .neq("id", excludeId)
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw error;
  }

  return data;
}

export async function fetchCategories() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("resource_categories")
    .select("*")
    .order("label", { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}
