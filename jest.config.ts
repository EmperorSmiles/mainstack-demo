// jest.config.ts
import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    // Keep your path alias mapping
    "^@/(.*)$": "<rootDir>/src/$1",

    // --- Add mapping for static assets ---
    // Mock file imports (including svg, png, jpg, etc.)
    "\\.(jpg|jpeg|png|gif|webp|avif|svg)$": "<rootDir>/__mocks__/fileMock.js",

    // OPTIONAL: If you also import CSS files, you might want to mock them too.
    // For CSS Modules (*.module.css):
    // "\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    // For regular CSS/SCSS/SASS/LESS files:
    // "\\.(css|sass|scss|less)$": "<rootDir>/__mocks__/styleMock.js", // Requires creating __mocks__/styleMock.js
  },
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.jest.json",
      },
    ],
    // No transformer needed for SVG/images since we are mocking them via moduleNameMapper
  },
  // No changes needed for globals or preset
};

export default config;
