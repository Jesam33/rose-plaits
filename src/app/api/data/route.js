import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { BRAND } from "../../config";

// Path to the server-side JSON database (for local development fallback)
const DB_PATH = path.join(process.cwd(), "src", "data", "db.json");

// Supabase credentials (configured via Vercel environment variables)
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// Helper to read data from Supabase Cloud Postgres or Local JSON file
async function readDatabase() {
  // 1. Cloud Database (Production on Vercel)
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/studio_data?id=eq.default`, {
        headers: { 
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
        },
        cache: "no-store" // Ensure real-time queries
      });
      if (res.ok) {
        const list = await res.json();
        if (list && list.length > 0) {
          return {
            services: list[0].services || [],
            gallery: list[0].gallery || []
          };
        } else {
          // If table exists but row is missing, insert initial flyer defaults!
          const defaults = { services: BRAND.services, gallery: BRAND.gallery };
          await writeDatabase(defaults);
          return defaults;
        }
      } else {
        console.warn("Supabase returned non-ok response, falling back to local file.");
      }
    } catch (error) {
      console.error("Error reading from Supabase, falling back to local file:", error);
    }
  }

  // 2. Local Database Fallback (Local Development)
  try {
    const fileContent = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading local database file, fallback to config:", error);
    return { services: BRAND.services, gallery: BRAND.gallery };
  }
}

// Helper to write data to Supabase Cloud Postgres or Local JSON file
async function writeDatabase(data) {
  // 1. Cloud Database (Production on Vercel)
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    try {
      const payload = {
        id: "default",
        services: data.services,
        gallery: data.gallery
      };

      const res = await fetch(`${SUPABASE_URL}/rest/v1/studio_data`, {
        method: "POST",
        headers: { 
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "resolution=merge-duplicates" // Instructs Supabase to perform an Upsert
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        return true;
      }
      console.error("Supabase write failed status:", res.status);
    } catch (error) {
      console.error("Error writing to Supabase, falling back to local file:", error);
    }
  }

  // 2. Local Database Fallback (Local Development)
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  return true;
}

export async function GET() {
  try {
    const data = await readDatabase();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read data from database" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { services, gallery } = body;

    if (!services || !gallery) {
      return NextResponse.json(
        { error: "Invalid request payload. Must include services and gallery." },
        { status: 400 }
      );
    }

    const updatedData = { services, gallery };
    await writeDatabase(updatedData);

    return NextResponse.json({ success: true, data: updatedData });
  } catch (error) {
    console.error("Error updating database:", error);
    return NextResponse.json(
      { error: "Failed to update database" },
      { status: 500 }
    );
  }
}
