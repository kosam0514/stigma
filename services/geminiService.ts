import { GoogleGenAI, Chat } from "@google/genai";
import { Character } from "../types";
import { SYSTEM_PROMPT_TEMPLATE } from "../constants";

// Safely access process.env to prevent crashes in environments where process is undefined
const API_KEY = (typeof process !== 'undefined' && process.env && process.env.API_KEY) || '';

const getSystemInstruction = (character: Character): string => {
  return SYSTEM_PROMPT_TEMPLATE
    .replace('{char}', character.name)
    .replace('{char_name}', character.name)
    .replace('{char_age}', character.age)
    .replace('{char_gender}', character.gender)
    .replace('{char_appearance}', character.appearance)
    .replace('{char_personality}', character.personality)
    .replace('{char_dialogue}', character.dialogueStyle)
    .replace('{char_role}', character.role)
    .replace('{char_description}', character.description)
    .replace('{user}', 'User');
};

export class GeminiService {
  private ai: GoogleGenAI;
  private chatSession: Chat | null = null;

  constructor() {
    if (!API_KEY) {
      console.error("API Key not found. Please set REACT_APP_API_KEY or VITE_API_KEY.");
    }
    this.ai = new GoogleGenAI({ apiKey: API_KEY });
  }

  startChat(character: Character) {
    const systemInstruction = getSystemInstruction(character);
    
    // Using gemini-3-flash-preview for fast roleplay responses
    this.chatSession = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.9, // Higher creative output for roleplay
        maxOutputTokens: 2048,
      },
    });
  }

  async sendMessageStream(message: string): Promise<AsyncIterable<string>> {
    if (!this.chatSession) {
      throw new Error("Chat session not initialized.");
    }

    const responseStream = await this.chatSession.sendMessageStream({
      message: message,
    });

    // Create a generator to yield chunks of text
    async function* streamGenerator() {
      for await (const chunk of responseStream) {
        if (chunk.text) {
          yield chunk.text;
        }
      }
    }

    return streamGenerator();
  }
}

export const geminiService = new GeminiService();