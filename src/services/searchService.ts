import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getChitronInfo() {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Search for Chitron Bhattacharjee (চিত্রণ ভট্টাচার্য). Find his biography, achievements, social media links, and images. Summarize the findings into a JSON format with fields: name, bio, achievements (array), socialLinks (object), and imageSuggestions (array of descriptions).",
    config: {
      tools: [{ googleSearch: {} }],
    },
  });
  return response.text;
}
