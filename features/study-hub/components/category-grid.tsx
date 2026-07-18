import Link from "next/link";
import { ResourceCategory } from "@/features/study-hub/types";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

interface CategoryGridProps {
  categories: ResourceCategory[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  // A predefined mapping of category slugs to specific aurora colors for subtle tints
  const colorMap: Record<string, string> = {
    "academic-stress": "group-hover:bg-aurora-sea/10",
    "bullying": "group-hover:bg-signal-crisis/10",
    "family-concerns": "group-hover:bg-aurora-dusk/10",
    "friendships-relationships": "group-hover:bg-aurora-blush/10",
    "emotional-overwhelm": "group-hover:bg-aurora-sea/10",
    "behavioural-concerns": "group-hover:bg-aurora-dawn/10",
    "confidence-identity": "group-hover:bg-aurora-dusk/10",
    "career-exploration": "group-hover:bg-aurora-sea/10",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-4 md:gap-space-6 w-full">
      {categories.map((category) => {
        const hoverTint = colorMap[category.slug] || "group-hover:bg-white/10";
        return (
          <Link href={`/study-hub/${category.slug}`} key={category.id} className="group outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea focus-visible:ring-offset-2 rounded-radius-md block">
            <Card variant="glass" interactive className="h-full flex flex-col justify-between">
              <div className={`absolute inset-0 transition-colors duration-fast ${hoverTint}`} />
              <CardContent className="p-space-6 relative z-10 flex flex-col h-full justify-between gap-space-8">
                <div>
                  <h3 className="text-type-title-lg text-ink-900 dark:text-white mb-2">{category.label}</h3>
                  <p className="text-type-body-sm text-ink-600 dark:text-ink-300">
                    Explore resources and tools about {category.label.toLowerCase()}.
                  </p>
                </div>
                <div className="flex items-center text-aurora-sea text-type-label group-hover:translate-x-1 transition-transform duration-fast">
                  Browse category <ArrowRight weight="bold" className="ml-2" />
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
