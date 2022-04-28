/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGO_URI: "mongodb+srv://admin:sm4UdwUHOkpKOUuu@cluster0.s2xjy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    CLOUD_URI: "https://api.cloudinary.com/v1_1/dirhby9ag/image/upload",
    JWT_KEY: "andugundupundu",
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
//UqGSXLqAy8leOVSA