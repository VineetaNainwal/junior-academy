import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "Bal Vidya Kids Learning" });
});

// API: Ask Bal Mitra (Kid-Friendly Q&A for children aged 2-6)
app.post("/api/gemini/ask-mitra", async (req, res) => {
  try {
    const { question, ageGroup = "3-4" } = req.body;
    if (!question || typeof question !== "string") {
      res.status(400).json({ error: "Question is required" });
      return;
    }

    const ai = getGeminiClient();
    const systemPrompt = `You are "Bal Ganesha" / "Bal Mitra", a warm, loving, joyful, and gentle friend for children aged ${ageGroup} years.
Tone: Warm, encouraging, simple, full of wonder and kindness, with cheerful Indian cultural touchpoints (peacock feathers, sweet modaks, bright sunshine, lotus flowers, festive lights).
Rules:
1. Keep the answer extremely short (2 to 3 simple sentences max) so a young child or parent reading aloud can easily understand.
2. Use simple kid vocabulary and enthusiastic phrasing.
3. Include an optional English or Hindi friendly exclamation like "Arre waah!", "Shabash!", or "Did you know?".
4. Always promote kindness, love for animals and nature, truthfulness, and happiness.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `A curious child asked: "${question}". Answer them cheerfully and simply!`,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    const answer = response.text || "You are wonderful and full of curiosity! Keep learning and smiling!";
    res.json({ answer });
  } catch (error: any) {
    console.error("Error in ask-mitra:", error);
    // Provide safe fallback for toddlers if API key is not yet set
    res.json({
      answer: "Bal Ganesha says: You are so smart! Keep exploring, singing, and enjoying learning every day!",
      fallback: true,
    });
  }
});

// API: Generate Mini Toddler Story
app.post("/api/gemini/create-story", async (req, res) => {
  try {
    const { character = "Little Peacock", theme = "Sharing sweets", moral = "Kindness" } = req.body;
    const ai = getGeminiClient();

    const systemPrompt = `You are a warm Indian grandmother (Dadi Maa) and storyteller for children aged 2 to 6 years.
Create a delightful, gentle mini story in 3 short paragraphs (about 100-120 words total).
Include:
- Title: A cute, catchy title
- Story: 3 very simple scenes with sound effects (e.g., 'Chirp chirp!', 'Tip-tap tip-tap!', 'Mmm delicious!')
- Moral: 1 short sentence moral lesson (e.g., 'Sharing brings joy to everyone!')
Return JSON format: { "title": "...", "story": "...", "moral": "...", "hindiTitle": "..." }`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `Tell a story featuring: "${character}", Theme: "${theme}", Moral: "${moral}".`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        temperature: 0.8,
      },
    });

    let storyData;
    try {
      storyData = JSON.parse(response.text || "{}");
    } catch {
      storyData = {
        title: "The Friendly Peacock & Little Squirrel",
        hindiTitle: "मित्र मयूर और छोटी गिलहरी",
        story: "Once upon a time in a lush green Vrindavan garden, a little peacock named Mayur loved to dance. One sunny morning, he found a sweet mango. A tiny squirrel looked hungry, so Mayur shared the sweet fruit with a joyful chirp! Together, they danced under the rainbow.",
        moral: "Sharing with friends makes the heart sing like a peacock!"
      };
    }

    res.json(storyData);
  } catch (error: any) {
    console.error("Error in create-story:", error);
    res.json({
      title: "Bal Ganesha's Sweet Modak",
      hindiTitle: "बाल गणेश और मीठा मोदक",
      story: "Little Bal Ganesha had five delicious golden modaks. His little mouse friend Mooshak came over with a tiny tummy. Ganesha smiled warmly and gave Mooshak two round modaks. Both friends laughed happily as sweet bells chimed in Mount Kailash!",
      moral: "True friendship means caring and sharing happily.",
      fallback: true
    });
  }
});

// Setup Vite middleware for dev or static files for prod
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Bal Vidya server running on http://localhost:${PORT}`);
  });
}

startServer();
