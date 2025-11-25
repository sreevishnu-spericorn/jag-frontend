import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3457",
        pathname: "/assets/client-logos/**",
      },
    ],
  },
};

export default nextConfig;
