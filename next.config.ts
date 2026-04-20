import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};
module.exports = {
  allowedDevOrigins: ["192.168.1.41"],
};
export default nextConfig;
