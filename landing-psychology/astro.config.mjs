// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import sitemap, { ChangeFreqEnum } from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://danielarodriguezpsicologa.com',
  image: {
    domains: ['res.cloudinary.com', 'img.icons8.com'],
  },
  integrations: [
    react(), 
    sitemap({
      changefreq: ChangeFreqEnum.WEEKLY,
      priority: 0.7,
      lastmod: new Date(),
      customPages: [
        'https://danielarodriguezpsicologa.com/',
        'https://danielarodriguezpsicologa.com/contacto',
      ],
      serialize(item) {
        // Boost homepage priority
        if (item.url === 'https://danielarodriguezpsicologa.com/') {
          item.priority = 1.0;
          item.changefreq = ChangeFreqEnum.WEEKLY;
        }
        if (item.url.includes('/contacto')) {
          item.priority = 0.9;
          item.changefreq = ChangeFreqEnum.MONTHLY;
        }
        return item;
      },
    }),
  ],
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
});