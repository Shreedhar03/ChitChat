// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     experimental: {
//         serverActions: true,
//     },
// }
// const withPWA = require('next-pwa')

// module.exports = withPWA({
//     pwa: {
//         dest: "public",
//         register: true,
//         // disable: process.env.NODE_ENV === 'development',
//         skipWaiting: true,
//     },
// })


// module.exports = nextConfig

const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/],
});

const nextConfig = withPWA({
    // next config
    experimental: {
        serverActions: true,
    },
});
module.exports = nextConfig;