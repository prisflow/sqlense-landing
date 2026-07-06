import type { NextConfig } from "next";

/**
 * SSG (static site generation) config for EdgeOne Makers deployment.
 * - `output: 'export'` generates pure static HTML/JS/CSS — no Node.js server needed
 * - `images.unoptimized` avoids Next.js image optimization (requires server)
 *
 * When deploying on EdgeOne Makers, point the build output to `out/` directory.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
