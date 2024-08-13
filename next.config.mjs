import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bvmowdvlgnmvvywedhub.supabase.co",
      },
    ],
  },
};

export default withPlaiceholder(nextConfig);
