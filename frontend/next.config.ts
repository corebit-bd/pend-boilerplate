import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable Standalone Output for Docker
  output: "standalone",

  // API Rewrites for Backend
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        // destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
        destination: `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"
        }/:path*`, // Default
      },
      {
        source: "/graphql",
        // destination: `${process.env.NEXT_PUBLIC_GRAPHQL_URL}`,
        destination:
          process.env.NEXT_PUBLIC_GRAPHQL_URL ||
          "http://localhost:8000/graphql", // Default
      },
    ];
  },

  // Image Optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Strict Mode
  reactStrictMode: true,

  // TypeScript Strict Mode
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
