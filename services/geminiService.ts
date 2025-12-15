import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedRoutine, UserProfile } from "../types";

export const generateRoutine = async (profile: UserProfile): Promise<GeneratedRoutine> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please set the API_KEY environment variable.");
  }

  const ai = new GoogleGenAI({ apiKey });

  // Construct a detailed prompt using the RBFR framework
  const prompt = `
    ROLE: You are "The Mic Master", a legendary stand-up comedy coach and head writer who has shaped the careers of the biggest names in comedy. You understand rhythm, timing, misdirection, rule of three, and the importance of a strong persona.

    BACKGROUND: The user is a new comic looking for material. They have provided details about their life. Your job is to mine their life for comedy gold.

    USER CONTEXT:
    Name: ${profile.name}
    Age: ${profile.age}
    Occupation: ${profile.occupation}
    Hometown: ${profile.hometown}
    Comedic Style: ${profile.style}
    Topics/Themes: ${profile.topics}
    Life Context/Bio: ${profile.context}
    INSPIRATIONAL INFLUENCES: ${profile.influences && profile.influences.length > 0 ? profile.influences.join(', ') : 'None specified'}

    TASK: Write a cohesive "tight 10" (10 specific bits) stand-up comedy routine customized to this user's persona and inputs.

    REQUIREMENTS:
    1.  **Voice:** The jokes must match the requested style (${profile.style}). If influences are listed, channel their delivery cadence and perspective (e.g., if Bill Burr is selected, allow for some ranting/cynicism; if Mitch Hedberg, use one-liners and surrealism).
    2.  **Structure:** Generate exactly 10 distinct bits.
    3.  **Cohesion:** The bits should flow logically, using call-backs where appropriate.
    4.  **Coaching:** For each bit, provide a "Coaching Tip" explaining *why* it works or how to deliver it (e.g., "Pause here," "Do an accent," "Speed up").
    5.  **Opener/Closer:** Provide a quick one-liner opener to establish the room and a strong closer to leave them laughing.

    FORMAT: Return raw JSON matching the schema provided.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash", // Using flash as it is efficient for text and capable of following schemas
    contents: prompt,
    config: {
      temperature: 0.9, // Higher temperature for creativity
      thinkingConfig: { thinkingBudget: 1024 }, // Allow some "thinking" time for creative connection
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          opener: { type: Type.STRING, description: "A strong opening line to warm up the crowd." },
          bits: {
            type: Type.ARRAY,
            description: "An array of exactly 10 comedy bits.",
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.INTEGER },
                title: { type: Type.STRING, description: "A short snappy title for the bit" },
                setup: { type: Type.STRING, description: "The premise or set up of the joke." },
                punchline: { type: Type.STRING, description: "The payoff or funny conclusion." },
                actOut: { type: Type.STRING, description: "Instructions for physical comedy, voice changes, or stage movement." },
                coachingTip: { type: Type.STRING, description: "Expert advice on delivery, timing, or why this joke works for their persona." },
              },
              required: ["id", "title", "setup", "punchline", "actOut", "coachingTip"],
            },
          },
          closer: { type: Type.STRING, description: "A final strong joke or call-back to end the set." },
        },
        required: ["opener", "bits", "closer"],
      },
    },
  });

  if (response.text) {
    return JSON.parse(response.text) as GeneratedRoutine;
  } else {
    throw new Error("Failed to generate routine: No text returned.");
  }
};
