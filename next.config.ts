import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://upload.wikimedia.org/**'), new URL('https://rqbcrttxfhxmcaxiropg.supabase.co/storage/v1/object/public/storage/images/**')]
  }
};

export default nextConfig;
