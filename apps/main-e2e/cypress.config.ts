import { defineConfig } from "cypress";
import { nxE2EPreset } from "@nrwl/cypress/plugins/cypress-preset";

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__dirname),
    experimentalStudio: true,
    projectId: "bdc59x",
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
