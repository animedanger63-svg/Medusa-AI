
import { ToolOption, ArtStyle, WebsiteCategory } from './types';

export const TOOLS = [
  { id: ToolOption.Image, label: 'Image Prompt' },
  { id: ToolOption.Video, label: 'Video Prompt' },
  { id: ToolOption.Website, label: 'Website Prompt' },
];

export const ART_STYLES: { id: ArtStyle; label: string }[] = [
  { id: 'none', label: 'Default' },
  { id: 'anime', label: 'Anime' },
  { id: 'realistic', label: 'Realistic' },
  { id: 'hyperrealistic', label: 'Hyper-realistic' },
  { id: 'cartoon', label: 'Cartoon' },
  { id: '3d', label: '3D' },
  { id: '2d', label: '2D' },
  { id: 'art', label: 'Art' },
];

export const WEBSITE_CATEGORIES: { id: WebsiteCategory; label: string }[] = [
  { id: 'none', label: 'None' },
  { id: 'ai', label: 'AI' },
  { id: 'product', label: 'Product' },
  { id: 'tools', label: 'Tools' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'ecommerce', label: 'E-commerce' },
];

export const PROMPT_SYSTEM_INSTRUCTIONS: Record<ToolOption, string> = {
  [ToolOption.Image]: `You are a world-class prompt engineer for AI image generation models like Midjourney or DALL-E 3. Your task is to take a user's simple idea and transform it into a rich, detailed, and evocative prompt. If a specific style is provided by the user, you must incorporate it. The prompt should be a single, coherent paragraph. Focus on dynamic composition, ethereal and glow-in-the-dark lighting, intricate textures, and a high-energy, abstract feel. Render the scene with ultra-fine precision and a deep depth of field. The overall impression should be one of beautiful, controlled disarray and cybernetic abstraction. Always conclude the prompt with relevant technical parameters, such as "--ar 16:9 --v 6.0".`,
  [ToolOption.Video]: `You are a creative director and scriptwriter, an expert in crafting prompts for AI video generation models like Veo or Sora. Your goal is to expand a user's simple idea into a cinematic prompt. If a specific style is provided, it should heavily influence the visual direction. The prompt should be a single, coherent paragraph. Describe the scene's atmosphere, specific camera shots and movements (e.g., 'dolly zoom,' 'extreme close-up,' 'sweeping aerial shot'), lighting styles ('cinematic lighting,' 'golden hour,' 'neon noir'), character actions, and overall mood. The output should read like a director's vision for a specific, impactful shot.`,
  [ToolOption.Website]: `You are an expert UI/UX designer and web developer, crafting a prompt for an AI website builder. Based on the user's idea, generate a comprehensive and structured brief. If a website category is provided, the design and content should be tailored specifically for that category's audience and goals. Specify the website's primary goal, its target audience, a modern and clean color palette (provide hex codes), typography suggestions (mention specific fonts for headings and body), key sections (e.g., Hero, About Us, Services, Portfolio, Contact), and the overall aesthetic (e.g., 'minimalist,' 'corporate,' 'brutalist,' 'playful'). The output should be well-structured with clear headings for each part of the brief to guide the AI website builder effectively.`
};

export const PROMPT_EXAMPLES: Record<ToolOption, string> = {
  [ToolOption.Image]: 'e.g., a futuristic city with glowing mushrooms and a river running through it',
  [ToolOption.Video]: 'e.g., A cinematic close-up of a raindrop hitting a leaf in a lush, foggy forest, slow motion.',
  [ToolOption.Website]: 'e.g., A portfolio website for a freelance photographer, minimalist style, with a dark theme.',
};

export const LEGAL_CONTENT = {
  about: {
    title: 'About Medusa AI',
    content: `Medusa AI was born from a passion for empowering creativity in the digital age. We believe that generative AI is a revolutionary tool, but its potential is often locked behind the complexity of writing effective prompts. Our mission is to bridge the gap between your ideas and stunning digital creations.\n\nThe AI Prompt Forge is our flagship tool, designed to act as your expert co-creator. It takes a simple concept and transforms it into detailed, structured, and powerful prompts optimized for the world's leading AI image, video, and website generators. Whether you're a digital artist, a content creator, a marketer, or a developer, Medusa AI is here to streamline your workflow and amplify your creative output.\n\nWe are continuously exploring new frontiers in AI and are committed to building intuitive, powerful tools that make cutting-edge technology accessible to everyone. Thank you for being part of our journey.`
  },
  privacy: {
    title: 'Privacy Policy',
    content: `Your privacy is important to us. It is Medusa AI's policy to respect your privacy regarding any information we may collect from you across our website.\n\n1. Information We Collect: We only collect information about you if we have a reason to do so – for example, to provide our Services, to communicate with you, or to make our Services better. We do not store your prompts or generated content on our servers. All "Prompt History" data is stored exclusively in your browser's local storage.\n\n2. API Keys: Your API key for the Gemini API is handled client-side and is used solely to make requests to the API on your behalf. It is not transmitted to, or stored on, Medusa AI's servers.\n\n3. Cookies: We use cookies for minimal and essential purposes only, such as maintaining application state. We do not use third-party tracking cookies.\n\n4. Data Security: We aim to protect your information through a system of organizational and technical security measures. However, please remember that no method of transmission over the internet, or method of electronic storage, is 100% secure.\n\n5. Changes to This Policy: We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.`
  },
  terms: {
    title: 'Terms of Use',
    content: `By accessing the Medusa AI website, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.\n\n1. Use License: Permission is granted to temporarily use the Medusa AI tool for personal or commercial use. This is the grant of a license, not a transfer of title, and under this license, you may not: attempt to decompile or reverse engineer any software contained on Medusa AI's website; remove any copyright or other proprietary notations from the materials; or transfer the materials to another person or "mirror" the materials on any other server.\n\n2. Disclaimer: The materials on Medusa AI's website are provided on an 'as is' basis. Medusa AI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.\n\n3. Limitations: In no event shall Medusa AI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Medusa AI's website, even if Medusa AI or a Medusa AI authorized representative has been notified orally or in writing of the possibility of such damage.\n\n4. Governing Law: These terms and conditions are governed by and construed in accordance with the laws of our jurisdiction and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.`
  }
};