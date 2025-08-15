/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "media-files.tryordersystem.com",
            port: "", 
            pathname: "/**",
         },
      ],
   },
};

export default nextConfig;
