import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import fs from "fs";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.png", "robots.txt"],
      manifest: {
        name: "EchoVoice",
        short_name: "EchoVoice",
        description:
          "Aplicación creada para poder asistir a personas con discapacidades visuales.",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "favicon.png",
            sizes: "144x144",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa-192x192.jpg",
            sizes: "192x192",
            type: "image/jpg",
          },
          {
            src: "pwa-512x512.jpg",
            sizes: "512x512",
            type: "image/jpg",
          },
          {
            src: "pwa-144x144.jpg",
            sizes: "144x144",
            type: "image/jpg",
          },
        ],
        screenshots: [
          {
            src: "screenshot.jpg",
            sizes: "1280x720",
            type: "image/jpg",
            form_factor: "wide",
          },
          {
            src: "screenshot-768x1024.jpg",
            sizes: "768x1024",
            type: "image/jpg",
            form_factor: "narrow",
          },
        ],
      },
    }),
  ],
});
