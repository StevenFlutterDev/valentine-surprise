import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Pin the project root to this folder.
   *
   * Without it Next.js walks up the directory tree looking for a lockfile and
   * finds the stray package-lock.json in the home folder, then warns that it
   * is ignoring it. Pointing `root` here stops the search.
   */
  turbopack: {
    root: path.join(__dirname),
  },

  /**
   * Let phones and tablets on the same Wi-Fi open the dev server.
   *
   * `next dev` prints a Network URL like http://192.168.2.61:3000 — but by
   * default it refuses dev-only requests (hot reload, dev chunks) from any
   * host other than localhost. These entries cover the usual home-router
   * ranges, so testing on a real phone just works.
   *
   * Development only — this has no effect on `next build` / `next start`.
   */
  allowedDevOrigins: [
    "192.168.0.*",
    "192.168.1.*",
    "192.168.2.*",
    "192.168.3.*",
    "10.0.0.*",
    "10.0.1.*",
    "172.20.10.*", // iPhone personal hotspot
    "*.local",
  ],
};

export default nextConfig;
