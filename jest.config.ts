/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  testEnvironment: "jsdom",  // Changed from "node" to "jsdom"
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {
      tsconfig: {
        jsx: "react-jsx"  // Add JSX configuration
      }
    }]
  },
  setupFilesAfterEnv: ['./src/setupTests.ts'],
};