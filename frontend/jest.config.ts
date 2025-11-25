import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the Path to your NextJS Application to Load "next.config.js" & ".env" Files in your Test Environment
  dir: "./",
});

// Add Any Custom Configurations to be Passed ✅ to Jest 🚀
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.stories.{js,jsx,ts,tsx}",
    "!src/**/__tests__/**",
  ],
};

// "createJestConfig" is Exported this way to ensure that "next/jest" can load the Async NextJS Configuration
export default createJestConfig(config);
