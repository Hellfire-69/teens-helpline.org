import type { Metadata } from "next";
import { getCategories, getResources } from "@/features/study-hub/service";
import { CategoryGrid } from "@/features/study-hub/components/category-grid";
import { SearchBar } from "@/features/study-hub/components/search-bar";
import { ResourceCard } from "@/features/study-hub/components/resource-card";
import type { ResourceCategory, Resource } from "@/features/study-hub/types";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Study Hub | TeensHelpline",
  description: "Curated resources, articles, and tools to support your wellbeing.",
};

// ISR strategy per TRD §18
export const revalidate = 3600;

export default async function StudyHubPage(props: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const searchParams = await props.searchParams;
  const q = searchParams?.q;
  
  if (q) {
    // Render search results
    const results = await getResources({ q, limit: 50 });
    
    return (
      <main className="min-h-screen py-space-12 px-space-5 md:px-space-8 max-w-content mx-auto w-full pt-24 relative z-10">
        <div className="mb-space-10">
          <Link href="/study-hub" className="inline-flex items-center text-aurora-sea font-medium hover:underline mb-space-4 outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea rounded-sm">
            <ArrowLeft className="mr-2" /> Back to Study Hub
          </Link>
          <h1 className="text-type-title-xl font-inter text-ink-900 dark:text-white mb-space-4">
            Search Results for "{q}"
          </h1>
          <SearchBar />
        </div>

        {results.length === 0 ? (
          <div className="text-center py-space-16">
            <p className="text-type-body-lg text-ink-600 dark:text-ink-300">
              We couldn't find any resources matching your search. Try different keywords or browse our categories.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-4 md:gap-space-6">
            {results.map((resource: Resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}
      </main>
    );
  }

  // Render standard landing page
  const categoriesData = await getCategories();
  const categories = categoriesData as ResourceCategory[];

  return (
    <main className="min-h-screen py-space-12 px-space-5 md:px-space-8 max-w-content mx-auto w-full pt-24 relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-6 mb-space-10">
        <div className="max-w-2xl">
          <h1 className="text-type-display font-fraunces text-ink-900 dark:text-white mb-space-4">
            Study Hub
          </h1>
          <p className="text-type-body-lg text-ink-600 dark:text-ink-300">
            A quiet space to find articles, tools, and exercises to help you handle whatever you're going through today.
          </p>
        </div>
        <div className="w-full md:w-auto md:min-w-[320px]">
          <SearchBar />
        </div>
      </div>
      
      <section>
        <CategoryGrid categories={categories} />
      </section>
    </main>
  );
}
