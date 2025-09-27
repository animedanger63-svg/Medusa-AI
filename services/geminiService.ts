// Import the CohereClient instead of GoogleGenerativeAI
import { CohereClient } from "cohere-ai";
import { ToolOption, ArtStyle, WebsiteCategory } from '../types';
import { PROMPT_SYSTEM_INSTRUCTIONS } from '../constants';

// Initialize the Cohere client with your Cohere API key
const cohere = new CohereClient({
  token: import.meta.env.VITE_COHERE_API_KEY,
});

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

  // Your original logic for building the prompt based on user input
  let userInput = `User idea: "${idea}"`;
  if (tool === ToolOption.Image || tool === ToolOption.Video) {
    if (options.style && options.style !== 'none') {
      userInput += `\nStyle to apply: "${options.style}"`;
    }
  } else if (tool === ToolOption.Website) {
    if (options.category && options.category !== 'none') {
      userInput += `\nWebsite Category: "${options.category}"`;
    }
  }

  // Combine the system instruction and user input for the final prompt
  const finalPrompt = `${systemInstruction}\n\n${userInput}`;

  try {
    // Call the Cohere API's generate endpoint
    const response = await cohere.generate({
      model: "command-r", // <-- This line was missing
      prompt: finalPrompt,
      max_tokens: 250,
      temperature: 0.7,
    });

    // Get the generated text from Cohere's response object
    const text = response.generations[0].text;

    if (!text) {
      throw new Error("Received an empty response from the AI.");
    }
    return text.trim();
    
  } catch (error) {
    // Updated error message for Cohere
    console.error("Error calling Cohere API:", error);
    throw new Error("Failed to generate prompt. Please check your API key and try again.");
  }
};
