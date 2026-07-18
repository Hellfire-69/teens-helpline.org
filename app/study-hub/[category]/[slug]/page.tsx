import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getResource } from "@/features/study-hub/service";
import { ArticleViewer } from "@/features/study-hub/components/article-viewer";
import { ResourceCard } from "@/features/study-hub/components/resource-card";
import { ArrowLeft, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Resource } from "@/features/study-hub/types";

// ISR strategy per TRD §18
export const revalidate = 3600;

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const resource = await getResource(params.slug);

  if (!resource) {
    return { title: "Article Not Found" };
  }

  return {
    title: `${resource.title} | Study Hub`,
    description: resource.seo_description || resource.summary,
  };
}

export default async function ArticleDetailPage(
  props: { params: Promise<{ category: string, slug: string }> }
) {
  const params = await props.params;
  const data = await getResource(params.slug);

  if (!data) {
    notFound();
  }

  const resource = data as unknown as Resource & { 
    category: { slug: string, label: string }, 
    related_resources: any[] 
  };

  // Ensure category matches to prevent duplicate URLs for the same resource
  if (resource.category?.slug !== params.category) {
    notFound();
  }

  return (
    <main className="min-h-screen py-space-12 px-space-5 md:px-space-8 max-w-content mx-auto w-full pt-24 relative z-10">
      <div className="mb-space-12 max-w-[800px] mx-auto">
        <Link href={`/study-hub/${resource.category.slug}`} className="inline-flex items-center text-aurora-sea font-medium hover:underline mb-space-8 outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea rounded-sm">
          <ArrowLeft className="mr-2" /> Back to {resource.category.label}
        </Link>
        
        {resource.content_warning_flag && (
          <div className="bg-signal-caution/10 border border-signal-caution/20 rounded-radius-md p-space-4 mb-space-8 flex items-start gap-space-3">
            <WarningCircle size={24} className="text-signal-caution shrink-0 mt-0.5" weight="fill" />
            <div>
              <h4 className="text-type-label text-ink-900 dark:text-white mb-1">Content Warning</h4>
              <p className="text-type-body-sm text-ink-600 dark:text-ink-300">
                {resource.content_warning_text}
              </p>
            </div>
          </div>
        )}

        <ArticleViewer content={resource.content} />
      </div>

      {resource.related_resources && resource.related_resources.length > 0 && (
        <div className="mt-space-16 pt-space-12 border-t border-ink-300/20 max-w-[800px] mx-auto">
          <h2 className="text-type-title-lg font-inter text-ink-900 dark:text-white mb-space-6">
            Related Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-4 md:gap-space-6">
            {resource.related_resources.map((relatedResource) => (
              <ResourceCard key={relatedResource.id} resource={relatedResource} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
