import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""; // Must use service role to bypass RLS for seeding

const supabase = createClient(supabaseUrl, supabaseKey);

function parseMarkdown(fileContent: string) {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match || !match[1] || !match[2]) throw new Error("Could not parse frontmatter");

  const frontmatterStr = match[1];
  const content = match[2].trim();

  const frontmatter: Record<string, unknown> = {};
  frontmatterStr.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    const colonIdx = trimmed.indexOf(":");
    if (colonIdx === -1) return;
    
    const key = trimmed.slice(0, colonIdx).trim();
    const valueStr = trimmed.slice(colonIdx + 1).trim();
    
    if (valueStr === "null") {
      frontmatter[key] = null;
    } else if (valueStr.startsWith('"') && valueStr.endsWith('"')) {
      frontmatter[key] = valueStr.slice(1, -1);
    } else if (valueStr.startsWith("'") && valueStr.endsWith("'")) {
      frontmatter[key] = valueStr.slice(1, -1);
    } else {
      frontmatter[key] = valueStr;
    }
  });

  return { frontmatter, content };
}

async function run() {
  console.log("Fetching categories...");
  const { data: categories, error: catError } = await supabase
    .from("resource_categories")
    .select("id, slug");

  if (catError || !categories) {
    console.error("Failed to fetch categories", catError);
    process.exit(1);
  }

  const categoryMap = Object.fromEntries(categories.map(c => [c.slug, c.id]));

  const baseDir = path.join(process.cwd(), "content", "study-hub");
  const folders = ["reviewed", "drafts"];

  for (const folder of folders) {
    const folderPath = path.join(baseDir, folder);
    if (!fs.existsSync(folderPath)) continue;

    const files = fs.readdirSync(folderPath).filter(f => f.endsWith(".md"));

    for (const file of files) {
      console.log(`Processing ${folder}/${file}...`);
      const fileContent = fs.readFileSync(path.join(folderPath, file), "utf-8");
      
      const { frontmatter, content } = parseMarkdown(fileContent);

      const categorySlug = frontmatter.concern_category as string;
      const categoryId = categoryMap[categorySlug];
      if (!categoryId) {
        console.error(`Category ID not found for slug: ${categorySlug}`);
        continue;
      }

      // Prepare payload
      const payload = {
        title: frontmatter.title as string,
        slug: frontmatter.slug as string,
        summary: frontmatter.summary as string,
        seo_description: (frontmatter.seo_description as string) || null,
        content_warning_flag: frontmatter.content_warning !== null && frontmatter.content_warning !== undefined,
        content_warning_text: (frontmatter.content_warning as string) || null,
        content_type: frontmatter.content_type as string,
        content_tier: frontmatter.content_tier as string,
        published: true, // as instructed
        category_id: categoryId,
        content: content
      };

      // Upsert to handle re-runs safely
      const { error } = await supabase
        .from("resources")
        .upsert(payload, { onConflict: 'slug' });

      if (error) {
        console.error(`Error inserting ${file}:`, error);
      } else {
        console.log(`Successfully inserted ${file}`);
      }
    }
  }

  console.log("Done seeding.");
}

run();
