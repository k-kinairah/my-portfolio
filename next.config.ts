import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    // Pin the workspace root to this project. Without this, Turbopack was
    // finding a stray package-lock.json in C:\Users\Kin and treating the
    // entire home directory as the project root, which made it try to
    // watch/build far more of the filesystem than intended and crash with
    // "Insufficient system resources" (Windows error 1450).
    root: path.join(__dirname),
  },
};

export default nextConfig;
