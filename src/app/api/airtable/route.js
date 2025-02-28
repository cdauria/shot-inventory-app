import { NextResponse } from "next/server";
import Airtable from "airtable";

// Function to fetch images from Airtable
const fetchAirtableImages = async () => {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
    
    const records = await base("shots").select({ view: "Grid view" }).all();

    return records.map((record) => ({
        id: record.id,
        film: record.fields.film,  // Assuming "film" is a field in your Airtable base
        url: record.fields.image ? record.fields.image[0].url : null, // Handling missing images
    }));
};

// Next.js API route with GET request
export async function GET(request) {
    try {
        const images = await fetchAirtableImages();
        return NextResponse.json({ result: images });
    } catch (error) {
        console.error("Error fetching Airtable images:", error);
        return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
    }
}
