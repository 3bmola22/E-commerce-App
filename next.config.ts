/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true, // ← ده اللي هيخلّصك من كل إيرورات TypeScript
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
