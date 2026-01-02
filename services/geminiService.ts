
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const cache = new Map<string, string>();
let cooldownUntil = 0;

const FALLBACK_PITCHES = [
  "Secure this elite flagship today at a fraction of its original MSRP—direct warehouse clearance.",
  "Experience state-of-the-art smartphone innovation with an unprecedented 75% price drop.",
  "The pinnacle of mobile engineering is now within reach for serious tech enthusiasts.",
  "Don't compromise on quality: get the world's most premium device at our lowest price ever.",
  "Masterful design meets powerful performance in this strictly limited warehouse flash sale.",
  "Upgrade to the flagship standard today and save hundreds on this authentic clearance item.",
  "A masterpiece of technology and elegance, now redefined by a record-breaking clearance offer.",
  "Unlock pro-grade features and high-end aesthetics with this exclusive discount event.",
  "The ultimate smartphone choice for those who demand the absolute best in mobile technology.",
  "Limited quantity available: own this high-performance branded flagship for 70%+ off."
];

/**
 * Fetches a sales pitch with caching and robust error handling for quota-sensitive environments.
 */
export const getSalesPitch = async (phoneBrand: string, phoneModel: string): Promise<string> => {
  const cacheKey = `${phoneBrand}-${phoneModel}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  const now = Date.now();
  if (now < cooldownUntil) {
    // Return a stable fallback during quota cooldown to prevent UI flicker
    return getStableFallback(phoneModel);
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a 1-sentence hyper-persuasive premium sales pitch for the ${phoneBrand} ${phoneModel} mentioning it's part of a massive 75% off luxury clearance. No hashtags, no emojis.`,
    });
    
    const pitch = response.text?.trim();
    if (pitch) {
      cache.set(cacheKey, pitch);
      return pitch;
    }
    throw new Error("Empty AI response");
  } catch (error: any) {
    // Silently handle 429/Resource Exhausted errors by entering a 2-minute cooldown
    if (error?.status === 429 || error?.message?.includes('429') || error?.message?.includes('RESOURCE_EXHAUSTED')) {
      cooldownUntil = Date.now() + 120000; 
    }
    
    const fallback = getStableFallback(phoneModel);
    cache.set(cacheKey, fallback);
    return fallback;
  }
};

/**
 * Ensures the same model always gets the same high-quality fallback pitch if the AI is unavailable.
 */
function getStableFallback(model: string): string {
  let hash = 0;
  for (let i = 0; i < model.length; i++) {
    hash = ((hash << 5) - hash) + model.charCodeAt(i);
    hash |= 0;
  }
  return FALLBACK_PITCHES[Math.abs(hash) % FALLBACK_PITCHES.length];
}
