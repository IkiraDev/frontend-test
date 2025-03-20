import nextJest from "next/jest";

const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "./jest.environment.ts",
  moduleNameMapper: {
    // react: "next/dist/compiled/react/cjs/react.development.js",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@/core/(.*)$": "<rootDir>/src/core/$1",
    "^@/contexts/(.*)$": "<rootDir>/src/contexts/$1",
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/services/(.*)$": "<rootDir>/src/services/$1",
    "^@/app/(.*)$": "<rootDir>/src/app/$1",
    "^@/views/(.*)$": "<rootDir>/src/views/$1",
  },
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  preset: "ts-jest",
};

export default createJestConfig(customJestConfig);
