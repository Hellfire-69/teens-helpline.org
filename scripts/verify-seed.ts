import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: resources, error } = await supabase
    .from("resources")
    .select(`
      id,
      content_tier,
      resource_categories(slug)
    `);

  if (error) {
    console.error(error);
    process.exit(1);
  }

  const total = resources.length;
  const reviewed = resources.filter(r => r.content_tier === 'reviewed').length;
  const drafts = resources.filter(r => r.content_tier === 'seed_draft').length;

  const cats = new Set(resources.map(r => 
    r.resource_categories && typeof r.resource_categories === 'object' && 'slug' in r.resource_categories
      ? String((r.resource_categories as Record<string, unknown>).slug)
      : ""
  ));

  console.log(`Total Resources: ${total}`);
  console.log(`Reviewed: ${reviewed}`);
  console.log(`Seed Drafts: ${drafts}`);
  console.log(`Categories represented: ${Array.from(cats).join(", ")}`);
}

run();
