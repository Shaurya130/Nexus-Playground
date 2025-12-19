import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
  // Ensure build doesn't fail on missing env vars during static export
  experimental: {
    outputFileTracingRoot: undefined,
  },
};

export default nextConfig;
