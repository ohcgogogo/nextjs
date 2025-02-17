const { i18n } = require("./next-i18next.config");
const PROXY_API_URL = process.env.PROXY_API_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // swcMinifty이란 Terser와 비슷한 역할을 한다고 생각하면 된다. Terser의 역할은 필요없는 공백이나, 주석을 삭제하여 용량을 줄이고, 해당 스크립트를 해석할 수 없도록 암호화 하는 역할
  swcMinify: true,
  compiler: {
    styledComponents: true,
    removeConsole: process.env.NODE_ENV === "production", // Remove console.log from Production Mode 
  },
  webpack: (config, {isServer}) => {
    if(!isServer) {
      config.resolve.fallback = {
        fs: false
      }
    }
    return config;
  },
  i18n,
  async rewrites() {
    return [
      {
        source: '/:locale/:path*',
        destination: `${PROXY_API_URL}/:path*`,
        locale: false,
      },
      {
        source: '/:path*',
        destination: `${PROXY_API_URL}/:path*`,
        locale: false,
      }
    ]
  }
}
module.exports = nextConfig
