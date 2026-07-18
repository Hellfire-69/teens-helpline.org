/**
 * study-hub feature — service layer
 */
import type { GetResourcesQuery } from "./schema";
import { fetchResources, fetchResourceBySlug, fetchRelatedResources, fetchCategories } from "./data";

export async function getCategories() {
  return fetchCategories();
}

export async function getResources(query: GetResourcesQuery) {
  return fetchResources(query);
}

export async function getResource(slug: string) {
  const resource = await fetchResourceBySlug(slug);
  
  if (!resource) {
    return null;
  }

  // Fetch related resources
  const related = await fetchRelatedResources(resource.category_id, resource.id, 3);

  return {
    ...resource,
    related_resources: related,
  };
}
