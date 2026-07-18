import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategories, getResources } from "@/features/study-hub/service";
import { ResourceCard } from "@/features/study-hub/components/resource-card";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { ResourceCategory } from "@/features/study-hub/types";

// ISR strategy per TRD §18
export const revalidate = 3600;

export async function generateMetadata(
  props: { params: Promise<{ category: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const categoriesData = await getCategories();
  const category = (categoriesData as ResourceCategory[]).find((c) => c.slug === params.category);

  if (!category) {
    return { title: "Category Not Found" };
  }

  return {
    title: `${category.label} | Study Hub`,
    description: `Resources and tools for dealing with ${category.label.toLowerCase()}.`,
  };
}

export default async function CategoryPage(
  props: { params: Promise<{ category: string }> }
) {
  const params = await props.params;
  const categoriesData = await getCategories();
  const category = (categoriesData as ResourceCategory[]).find((c) => c.slug === params.category);

  if (!category) {
    notFound();
  }

  const resources = await getResources({ category: category.slug, limit: 50 });

  return (
    <main className="min-h-screen py-space-12 px-space-5 md:px-space-8 max-w-content mx-auto w-full pt-24 relative z-10">
      <div className="mb-space-10">
        <Link href="/study-hub" className="inline-flex items-center text-aurora-sea font-medium hover:underline mb-space-4 outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea rounded-sm">
          <ArrowLeft className="mr-2" /> Back to Study Hub
        </Link>
        <h1 className="text-type-title-xl font-inter text-ink-900 dark:text-white mb-space-2">
          {category.label}
        </h1>
        <p className="text-type-body-lg text-ink-600 dark:text-ink-300">
          Resources and tools for dealing with {category.label.toLowerCase()}.
        </p>
      </div>

      {resources.length === 0 ? (
        <div className="text-center py-space-16">
          <p className="text-type-body-lg text-ink-600 dark:text-ink-300">
            No resources found in this category yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-4 md:gap-space-6">
          {resources.map((resource: any) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </main>
  );
}
