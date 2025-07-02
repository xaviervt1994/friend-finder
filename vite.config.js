// vite.config.js
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        auth: resolve(__dirname, "auth.html"),
        chat: resolve(__dirname, "chat.html"),
        match: resolve(__dirname, "match.html"),
        onboarding: resolve(__dirname, "onboarding.html"),
        profile: resolve(__dirname, "profile.html"),
      },
    },
  },
});
