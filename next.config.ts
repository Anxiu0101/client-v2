import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: '',
        pathname: "/Anxiu0101/PicgoImg/master/**",
        search: '',
      }
    ]
  }
};

export default nextConfig;
