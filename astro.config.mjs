import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  output: "server",
  adapter: vercel({
    // 可以視需要開啟或關閉一些功能
    webAnalytics: { enabled: false },
  }),
});
