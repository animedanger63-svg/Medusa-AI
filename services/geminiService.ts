
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ToolOption, ArtStyle, WebsiteCategory } from '../types';
import { PROMPT_SYSTEM_INSTRUCTIONS } from '../constants';


const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

interface EnhanceOptions {
  style?: ArtStyle;
  category?: WebsiteCategory;
}

export const enhancePrompt = async (
  idea: string,
  tool: ToolOption,
  options: EnhanceOptions = {}
): Promise<string> => {
  const systemInstruction = PROMPT_SYSTEM_INSTRUCTIONS[tool];
  if (!idea.trim()) {
    throw new Error("Prompt idea cannot be empty.");
  }

  // Construct a more detailed input for the model
  let modelInput = `User idea: "${idea}"`;
  if (tool === ToolOption.Image || tool === ToolOption.Video) {
    if (options.style && options.style !== 'none') {
      modelInput += `\nStyle to apply: "${options.style}"`;
    }
  } else if (tool === ToolOption.Website) {
    if (options.category && options.category !== 'none') {
      modelInput += `\nWebsite Category: "${options.category}"`;
    }
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: modelInput,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
        topP: 0.9,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Received an empty response from the AI.");
    }
    return text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate prompt. Please check your API key and try again.");
  }
};
