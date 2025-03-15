/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Generate static files on build
  distDir: '../backend/voting/static', // Output folder for Django
};
module.exports = nextConfig;
