/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    distDir: 'build',
}
const withPWA = require('next-pwa')

module.exports = withPWA({
    pwa: {
        dest: "public",
        register: true,
        disable: process.env.NODE_ENV === 'development',
        skipWaiting: true,
    },
})


module.exports = nextConfig
