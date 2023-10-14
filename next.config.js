const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  scope: "/app",
  sw: "sw.js",
  //disable: process.env.NODE_ENV === "development",
})

module.exports = withPWA({
  reactStrictMode: true,
})
