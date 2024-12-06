import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '');

export const colorSchema = {
  type: SchemaType.OBJECT,
  properties: {
    colors: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          hex: {
            type: SchemaType.STRING,
            description: "Hex color code",
          },
          name: {
            type: SchemaType.STRING,
            description: "Color name", 
          },
          psychology: {
            type: SchemaType.OBJECT,
            properties: {
              emotions: {
                type: SchemaType.ARRAY,
                items: {
                  type: SchemaType.STRING,
                },
                description: "Emotions associated with this color"
              },
              meanings: {
                type: SchemaType.ARRAY,
                items: {
                  type: SchemaType.STRING,
                },
                description: "Cultural/psychological meanings of this color"
              },
              industries: {
                type: SchemaType.ARRAY,
                items: {
                  type: SchemaType.STRING,
                },
                description: "Industries that commonly use this color"
              }
            },
            required: ["emotions", "meanings", "industries"]
          }
        },
        required: ["hex", "name", "psychology"],
      },
    },
  },
  required: ["colors"],
};

export async function generatePalette(prompt: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash", 
    generationConfig: {
      temperature: 0.9,
      responseMimeType: "application/json",
      responseSchema: colorSchema,
    },
  });

  const result = await model.generateContent(
    `Generate a color palette based on this prompt: ${prompt}. Return 5 harmonious colors. For each color, include its psychology - associated emotions, cultural/psychological meanings, and industries that commonly use it.`
  );
  
  return JSON.parse(result.response.text());
}