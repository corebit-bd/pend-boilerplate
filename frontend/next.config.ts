import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  // Environment Variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // API Endpoints Rewrites for Backend Operation & GraphQL Communication
  async rewrites() {
    return [
      {
        source: "/api/backend/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
      {
        source: "/graphql",
        destination: `${process.env.NEXT_PUBLIC_GRAPHQL_URL}`,
      },
    ];
  },
};

export default nextConfig;
