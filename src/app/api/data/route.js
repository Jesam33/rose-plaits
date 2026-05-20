import { NextResponse } from "next/server";
import { supabase } from "../../../utils/supabase";
import fs from "fs/promises";
import path from "path";
import { BRAND } from "../../../config";

const DB_PATH = path.join(process.cwd(), "src", "data", "db.json");

export async function GET() {
  try {
    const { data: servicesData, error: sErr } = await supabase.from('services').select('*');
    const { data: galleryData, error: gErr } = await supabase.from('gallery').select('*');

    if (sErr || gErr || !servicesData) {
      console.warn("Supabase fetch failed, falling back to local file.");
      try {
        const fileContent = await fs.readFile(DB_PATH, "utf-8");
        return NextResponse.json(JSON.parse(fileContent));
      } catch (error) {
        return NextResponse.json({ services: BRAND.services, gallery: BRAND.gallery });
      }
    }

    return NextResponse.json({
      services: servicesData || [],
      gallery: galleryData || []
    });
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

    // Update Services (upsert existing, delete removed)
    if (services.length > 0) {
      await supabase.from('services').upsert(services);
      const existingIds = services.map(s => s.id);
      await supabase.from('services').delete().not('id', 'in', `(${existingIds.join(',')})`);
    } else {
      // If empty array, delete all
      await supabase.from('services').delete().neq('id', 'nonexistent');
    }

    // Update Gallery (delete all and re-insert since frontend doesn't track IDs)
    if (gallery.length >= 0) {
      await supabase.from('gallery').delete().neq('title', 'nonexistent');
      if (gallery.length > 0) {
        // Exclude ID if it exists so Postgres can auto-increment it
        const insertData = gallery.map(g => ({ title: g.title, url: g.url }));
        await supabase.from('gallery').insert(insertData);
      }
    }

    // Also write to local fallback so local devs without env still see changes
    try {
      await fs.writeFile(DB_PATH, JSON.stringify({ services, gallery }, null, 2), "utf-8");
    } catch(e) {}

    return NextResponse.json({ success: true, data: { services, gallery } });
  } catch (error) {
    console.error("Error updating database:", error);
    return NextResponse.json(
      { error: "Failed to update database" },
      { status: 500 }
    );
  }
}
