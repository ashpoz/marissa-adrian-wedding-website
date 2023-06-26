import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import image from "@astrojs/image";
import vercel from "@astrojs/vercel/serverless";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [tailwind(), mdx(), react(), image({
    serviceEntryPoint: "@astrojs/image/sharp"
  }), partytown({
    config: {
      forward: ["dataLayer.push"],
    },
  })],
  adapter: vercel()
});