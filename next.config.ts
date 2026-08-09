import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'covers.openlibrary.org' },
      { protocol: 'https', hostname: 'hdj0g1jef115ap1t.public.blob.vercel-storage.com' },
    ]
  }
};

export default nextConfig;
