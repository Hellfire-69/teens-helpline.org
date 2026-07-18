import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Must use service role to bypass RLS for seeding

const supabase = createClient(supabaseUrl, supabaseKey);

function parseMarkdown(fileContent: string) {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error("Could not parse frontmatter");

  const frontmatterStr = match[1];
  const content = match[2].trim();

  const frontmatter: Record<string, any> = {};
  frontmatterStr.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    const colonIdx = trimmed.indexOf(":");
    if (colonIdx === -1) return;
    
    const key = trimmed.slice(0, colonIdx).trim();
    let value = trimmed.slice(colonIdx + 1).trim();
    
    if (value === "null") {
      frontmatter[key] = null;
    } else if (value.startsWith('"') && value.endsWith('"')) {
      frontmatter[key] = value.slice(1, -1);
    } else if (value.startsWith("'") && value.endsWith("'")) {
      frontmatter[key] = value.slice(1, -1);
    } else {
      frontmatter[key] = value;
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

      const categoryId = categoryMap[frontmatter.concern_category];
      if (!categoryId) {
        console.error(`Category ID not found for slug: ${frontmatter.concern_category}`);
        continue;
      }

      // Prepare payload
      const payload = {
        title: frontmatter.title,
        slug: frontmatter.slug,
        summary: frontmatter.summary,
        seo_description: frontmatter.seo_description,
        content_warning_flag: frontmatter.content_warning !== null ? true : false,
        content_warning_text: frontmatter.content_warning,
        content_type: frontmatter.content_type,
        content_tier: frontmatter.content_tier,
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
