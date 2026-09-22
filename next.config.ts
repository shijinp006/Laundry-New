import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the Next.js dev indicator overlay.
  devIndicators: false,
  // Pin the workspace root so Next.js ignores stray lockfiles in parent folders.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
