const SRC_PATH = "<rootDir>/src";

const config = {
  roots: [SRC_PATH],
  bail: false,
  preset: "ts-jest",
  testEnvironment: "jsdom",
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.tsx"],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/public/"],
  moduleDirectories: ["node_modules", "src"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  coverageReporters: [
    "clover",
    "json",
    "lcov",
    ["text", { skipFull: true }],
    "html",
  ],
};

module.exports = config;
