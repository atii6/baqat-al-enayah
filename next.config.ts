import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "m.media-amazon.com" },
      { hostname: "bakatalenayah.blob.core.windows.net" },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": __dirname,
      "@models": __dirname + "/models",
      "@controllers": __dirname + "/server/controllers",
      "@handlers": __dirname + "/server/handlers",
      "@config": __dirname + "/config",
    };
    return config;
  },
};

export default nextConfig;
