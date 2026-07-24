import type { Metadata } from "next";
import { getCategories, getResources } from "@/features/study-hub/service";
import { CategoryGrid } from "@/features/study-hub/components/category-grid";
import { SearchBar } from "@/features/study-hub/components/search-bar";
import { ResourceCard } from "@/features/study-hub/components/resource-card";
import type { ResourceCategory, Resource } from "@/features/study-hub/types";
import { ArrowLeft, Books, Sparkle, Leaf, TrendUp } from "@phosphor-icons/react/dist/ssr";
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
    const results = await getResources({ q, limit: 50 });
    // Filter sensitive content from search results on landing too
    const safeResults = results.filter((r: Resource) => !r.content_warning_flag);
    
    return (
      <main className="min-h-screen py-space-8 px-4 md:px-space-8 w-full relative z-10">
        <div className="mb-space-10 max-w-4xl">
          <Link
            href="/study-hub"
            className="inline-flex items-center gap-2 text-ink-500 hover:text-ink-900 dark:hover:text-white font-medium mb-space-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea rounded-sm"
          >
            <ArrowLeft weight="bold" aria-hidden="true" />
            Back to Study Hub
          </Link>
          <h1 className="text-type-title-xl font-fraunces font-semibold text-ink-900 dark:text-white mb-space-6">
            Results for <span className="text-aurora-sea">"{q}"</span>
          </h1>
          <SearchBar />
        </div>

        {safeResults.length === 0 ? (
          <div className="text-center py-space-16 bg-white/50 dark:bg-black/20 rounded-radius-2xl border border-white/20 dark:border-white/10">
            <Sparkle weight="duotone" className="w-12 h-12 text-ink-300 mx-auto mb-space-4" aria-hidden="true" />
            <h2 className="text-type-title-md font-semibold text-ink-900 dark:text-white mb-space-2">Nothing found yet</h2>
            <p className="text-type-body-md text-ink-600 dark:text-ink-300 max-w-sm mx-auto">
              Try different keywords, or browse our topic categories below.
            </p>
            <Link href="/study-hub" className="inline-flex mt-space-6 px-6 py-2.5 bg-aurora-sea text-white font-semibold rounded-radius-full text-type-body-sm hover:bg-aurora-sea/90 transition-colors">
              Browse topics
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-space-4 md:gap-space-6">
            {safeResults.map((resource: Resource) => (
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
  
  // Fetch safe resources only (no content warnings) for the landing "Featured" section
  const allRecent = await getResources({ limit: 20 }) as Resource[];
  const featuredResources = allRecent
    .filter((r) => !r.content_warning_flag)
    .slice(0, 4);

  const hasFeatured = featuredResources.length > 0;

  return (
    <main className="min-h-screen py-space-8 px-4 md:px-space-8 w-full relative z-10 space-y-space-12">
      
      {/* Hero Section */}
      <section
        aria-labelledby="study-hub-heading"
        className="relative bg-gradient-to-br from-aurora-dusk/10 via-aurora-sea/5 to-aurora-blush/5 border border-white/30 dark:border-white/10 rounded-radius-2xl p-space-8 md:p-space-12 overflow-hidden"
      >
        {/* Subtle decorative orbs */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-aurora-dusk/20 blur-3xl rounded-full pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-aurora-sea/15 blur-3xl rounded-full pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-space-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-aurora-dusk font-bold uppercase tracking-wider text-[11px] mb-space-4">
              <Leaf weight="fill" className="w-4 h-4" aria-hidden="true" /> Your wellbeing library
            </div>
            <h1 id="study-hub-heading" className="text-type-display font-fraunces font-semibold text-ink-900 dark:text-white mb-space-4 leading-[1.1]">
              Everything you need,<br className="hidden sm:block" /> right here.
            </h1>
            <p className="text-type-body-lg text-ink-600 dark:text-ink-300 leading-relaxed max-w-lg">
              A welcoming space for articles, breathing exercises, tools, and guides — created to support you through whatever you're facing today.
            </p>
          </div>
          <div className="w-full lg:w-96 shrink-0">
            <SearchBar />
          </div>
        </div>

        {/* Stat chips */}
        <div className="relative z-10 flex flex-wrap gap-3 mt-space-8">
          {[
            { icon: Books, text: `${categories.length} topics` },
            { icon: TrendUp, text: "Updated weekly" },
            { icon: Sparkle, text: "Safe & reviewed" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 bg-white/60 dark:bg-black/30 border border-white/30 dark:border-white/10 px-3 py-1.5 rounded-radius-full text-type-body-sm font-medium text-ink-700 dark:text-ink-300">
              <Icon weight="duotone" className="w-4 h-4 text-aurora-dusk" aria-hidden="true" />
              {text}
            </div>
          ))}
        </div>
      </section>

      {/* Featured Resources (safe content only, no warnings) */}
      {hasFeatured && (
        <section aria-labelledby="featured-heading">
          <div className="flex items-center justify-between mb-space-6">
            <h2 id="featured-heading" className="text-type-title-xl font-fraunces font-semibold text-ink-900 dark:text-white">
              Start here
            </h2>
            <Link href="/study-hub?q=wellbeing" className="text-aurora-sea font-semibold text-type-body-sm hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea rounded-sm">
              See all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-4 md:gap-space-6">
            {featuredResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </section>
      )}
      
      {/* Categories Grid */}
      <section aria-labelledby="topics-heading">
        <div className="flex items-center justify-between mb-space-6">
          <h2 id="topics-heading" className="text-type-title-xl font-fraunces font-semibold text-ink-900 dark:text-white">
            Browse by topic
          </h2>
        </div>
        <CategoryGrid categories={categories} />
      </section>

    </main>
  );
}
