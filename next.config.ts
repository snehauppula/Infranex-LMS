import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16+ requires explicit allowlisting for local `next/image` sources that include
    // query strings (e.g. cache-busting `?v=` on files in `/public`).
    localPatterns: [{ pathname: "/brand/**" }, { pathname: "/domains/**" }],
  },
};

export default nextConfig;
