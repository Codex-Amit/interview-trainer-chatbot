/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Allow this host for Next.js dev HMR requests when developing from another machine
  allowedDevOrigins: ['10.206.25.148'],
}

export default nextConfig
