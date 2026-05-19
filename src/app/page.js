import HomeClient from "./HomeClient";

import { BRAND } from "./config";

// Force dynamic server rendering (SSR) so database edits show up immediately on refresh
export const dynamic = "force-dynamic";

import { supabase } from '../utils/supabase';

async function getDbData() {
  try {
    // Attempt to fetch from Supabase first
    const { data: servicesData, error: servicesError } = await supabase
      .from('services')
      .select('*');
      
    const { data: galleryData, error: galleryError } = await supabase
      .from('gallery')
      .select('*');

    // If there's an error or no data (e.g. keys not set or tables empty), fallback to defaults
    if (servicesError || galleryError || !servicesData?.length) {
      console.warn("Supabase fetch failed or empty, using fallback config:", servicesError || galleryError);
      return {
        services: BRAND.services,
        gallery: BRAND.gallery
      };
    }

    return {
      services: servicesData || BRAND.services,
      gallery: galleryData || BRAND.gallery
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
