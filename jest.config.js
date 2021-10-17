module.exports = {
  moduleDirectories: ["node_modules", "./src"],
  moduleNameMapper: {
    "#/(.*)": "<rootDir>/src/modules/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|ts|tsx)$": "<rootDir>/node_modules/ts-jest",
    ".+\\.(css)$": "<rootDir>/node_modules/jest-css-modules-transform",
  },
  globalSetup: "<rootDir>/globalSetup.js",
};
