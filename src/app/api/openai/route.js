import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
    try {
        const { imageUrl } = await req.json();
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

        // Correct API call using chat model for Vision AI
        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo", // ✅ Correct model
            messages: [
                { role: "system", content: "You are an expert in film lighting and cinematography analysis." },
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Analyze this black-and-white film image for contrast, shadows, lighting direction, and exposure. Write three sentences about the key formal features in the image related to these categories. Do not use any styling like asterisks. Try to be as precise as possible and do not describe characters, simply refer to them as subjects." },
                        { type: "image_url", image_url: { url: imageUrl } }
                    ]
                }
            ],
            max_tokens: 300
        });

        const result = response.choices[0].message.content;
        return NextResponse.json({ result });

    } catch (error) {
        console.error("Error analyzing image:", error);
        return NextResponse.json({ error: "Failed to analyze image" }, { status: 500 });
    }
}
