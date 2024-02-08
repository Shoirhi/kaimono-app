/** @type {import('next').NextConfig} */

import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = withPWA({
  //next.js config
  reactStrictMode: true,
});

export default nextConfig;
