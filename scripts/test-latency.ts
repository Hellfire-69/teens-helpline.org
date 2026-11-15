import { generateWithFailover } from "../services/ai/manager";

async function runTest() {
  const context = {
    systemPrompt: "You are a helpful assistant.",
    messages: [{ role: "user" as const, content: "Reply with the word SUCCESS." }]
  };
  
  console.log("=== TESTING PRIMARY PATH (GEMINI) ===");
  const start = Date.now();
  try {
    const res = await generateWithFailover(context);
    console.log(`Latency: ${Date.now() - start}ms`);
    console.log(`Provider: ${res.providerUsed}`);
    console.log(`Reply: ${res.reply}`);
  } catch (e) {
    console.error(e);
  }

  console.log("\n=== TESTING FALLBACK PATH (GROQ) ===");
  process.env.GEMINI_API_KEY = "invalid";
  const start2 = Date.now();
  try {
    const res2 = await generateWithFailover(context);
    console.log(`Latency: ${Date.now() - start2}ms`);
    console.log(`Provider: ${res2.providerUsed}`);
    console.log(`Reply: ${res2.reply}`);
  } catch (e) {
    console.error(e);
  }
}
runTest();
