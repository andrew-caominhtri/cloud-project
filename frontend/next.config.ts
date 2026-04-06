import type { NextConfig } from "next";

const backendHost =
  process.env.NEXT_PUBLIC_API_URL || "microservices-project-5n0y.onrender.com";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: backendHost,
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;