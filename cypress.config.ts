import { defineConfig } from "cypress";

export default defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/results",
    reportFilename: "[name]",
    quiet: true,
    overwrite: false,
    html: true,
    embeddedScreenshots: true,
    saveAllAttempts: true,
    saveJson: true,
    saveHtml: false,
    charts: true,
  },
  e2e: {
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },
    video: false,
    testIsolation: false,
    viewportHeight: 900,
    viewportWidth: 1440,
  },
  scrollBehavior: "center",
});
