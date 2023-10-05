import i18n from "astro-i18n"
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [i18n()],
});
