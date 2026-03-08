import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MAIL_SERVICE: 'service_avw2dkv',
    MAIL_TEMPLATE: 'template_8lppxwf',
    MAIL_API: 'aaZZnIe5SaFRf95zZ'
  },
  images: {
    remotePatterns: [new URL('https://upload.wikimedia.org/**'), new URL('https://rqbcrttxfhxmcaxiropg.supabase.co/storage/v1/object/public/storage/images/**')]
  }
};

export default nextConfig;
