
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getFloralAdvice = async (userPrompt: string) => {
  if (!API_KEY) return "AI Assistant is unavailable without an API Key.";

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: "You are 'Rusty', a specialist in 'Florelle' and industrial-themed floral design. You help customers choose between metal-crafted flowers (copper, steel) and natural bouquets. You are rugged, professional, and have a deep appreciation for craftsmanship. Keep responses concise and stylish.",
      }
    });
    return response.text || "I'm a bit stumped. Try asking about copper roses!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The refinery is down (API Error). Try again later!";
  }
};
