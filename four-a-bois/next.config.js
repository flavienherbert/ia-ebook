/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Site entièrement statique (aucune route API, aucun rendu serveur) :
  // l'export statique fonctionne sur Vercel comme sur n'importe quel hébergeur.
  output: "export",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
