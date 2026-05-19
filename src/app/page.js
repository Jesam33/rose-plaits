import HomeClient from "./HomeClient";
import fs from "fs/promises";
import path from "path";
import { BRAND } from "./config";

// Force dynamic server rendering (SSR) so database edits show up immediately on refresh
export const dynamic = "force-dynamic";

async function getDbData() {
  try {
    const dbPath = path.join(process.cwd(), "src", "data", "db.json");
    const fileContent = await fs.readFile(dbPath, "utf-8");
    const data = JSON.parse(fileContent);
    return {
      services: data.services || BRAND.services,
      gallery: data.gallery || BRAND.gallery
    };
  } catch (error) {
    console.error("Error reading database server-side, using config defaults:", error);
    return {
      services: BRAND.services,
      gallery: BRAND.gallery
    };
  }
}

export default async function Page() {
  const data = await getDbData();
  
  return (
    <HomeClient 
      initialServices={data.services} 
      initialGallery={data.gallery} 
    />
  );
}
