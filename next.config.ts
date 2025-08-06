import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: [
            "lh3.googleusercontent.com",
            "avatars.githubusercontent.com",
            process.env.NEXT_PUBLIC_R2_PUBLIC_URL
                ? new URL(process.env.NEXT_PUBLIC_R2_PUBLIC_URL).hostname
                : ""
        ].filter(Boolean),
    },
};

export default nextConfig;
