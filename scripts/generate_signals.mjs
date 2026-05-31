import fs from 'fs';
import path from 'path';
import { fetchSearchContext } from './web_crawler.mjs';

const DEEPSEEK_API_KEY = "sk-a2dc0881aaac4bfcbe75b200177655b1";
const SIGNALS_DIR = path.join(process.cwd(), 'src', 'content', 'signals');

if (!fs.existsSync(SIGNALS_DIR)) fs.mkdirSync(SIGNALS_DIR, { recursive: true });

function sanitizeSlug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function callDeepSeek(prompt) {
  const reqBody = {
    model: "deepseek-chat",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2, // Low temp for analytical/factual tone
    response_format: { type: "json_object" }
  };

  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
    },
    body: JSON.stringify(reqBody)
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

async function generateSignalReport(signalName, platform) {
  console.log(`\n======================================================`);
  console.log(`📡 Analyzing Signal: ${signalName}`);
  
  // 1. Crawl for facts
  console.log(`🔍 Crawling web for ${signalName} signal performance...`);
  let searchResults = "";
  try {
    searchResults = await fetchSearchContext(`"${signalName}" forex signal ${platform} copy trading review drawdown monthly return`);
  } catch (e) {
    console.warn(`⚠️ Crawl failed: ${e.message}`);
  }

  // 2. Ask DeepSeek to generate Schema + Markdown
  console.log(`🧠 Generating Institutional Quant Report...`);
  const prompt = `
You are a highly analytical Quantitative Researcher for FX278.com.
Write an independent, data-heavy analysis report on the copy trading signal: "${signalName}".
Platform: ${platform}.

I have scraped the web for factual data. Here are the snippets:
---
${searchResults}
---

Your task is to output a single JSON object containing BOTH the frontmatter metadata and the full markdown report.
Maintain a "Bloomberg Terminal" tone: highly technical, exposing risks like Martingale, grid systems, or survivorship bias.

Output exactly this JSON structure (no markdown fences around it, just raw JSON):
{
  "title": "Exact Signal Name",
  "description": "A 1-2 sentence technical summary of the trading logic and risk profile.",
  "platform": "${platform}",
  "monthlyReturn": "e.g., +4.2%",
  "maxDrawdown": "e.g., -15.4%",
  "subscribers": a realistic integer like 4500,
  "riskLevel": "Low", "Medium", or "High",
  "winRate": "e.g., 78%",
  "markdownContent": "The full quantitative analysis report in Markdown. Include H2s like '## Strategy Mechanics', '## Drawdown Analysis', '## Risk Warnings'. Use bullet points and bold text. Do not include the title (H1) or frontmatter."
}
`;

  const responseJson = await callDeepSeek(prompt);
  let parsed;
  try {
    parsed = JSON.parse(responseJson);
  } catch (e) {
    console.error("❌ Failed to parse output:", responseJson);
    return;
  }

  // 3. Write File
  const slug = sanitizeSlug(parsed.title);
  const filePath = path.join(SIGNALS_DIR, `${slug}.md`);
  const dateStr = new Date().toISOString().split('T')[0];

  const frontmatter = `---
title: "${parsed.title.replace(/"/g, '\\"')}"
description: "${parsed.description.replace(/"/g, '\\"')}"
platform: "${parsed.platform}"
monthlyReturn: "${parsed.monthlyReturn}"
maxDrawdown: "${parsed.maxDrawdown}"
subscribers: ${parsed.subscribers}
riskLevel: "${parsed.riskLevel}"
winRate: "${parsed.winRate}"
publishedAt: ${dateStr}
---

${parsed.markdownContent}
`;

  fs.writeFileSync(filePath, frontmatter, 'utf-8');
  console.log(`   ✅ Created signal report: ${slug}.md`);
}

async function run() {
  const signals = [
    { name: "Waka Waka EA", platform: "MQL5" },
    { name: "Night Owl", platform: "MQL5" },
    { name: "Aura Black Edition", platform: "MQL5" },
    { name: "Perceptrader AI", platform: "MQL5" },
    { name: "SafeScalper", platform: "ZuluTrade" }
  ];
  
  for (const s of signals) {
    await generateSignalReport(s.name, s.platform);
    await new Promise(r => setTimeout(r, 2000));
  }
  console.log(`\n🎉 Batch complete! Analyzed 5 trading signals.`);
}

run();
