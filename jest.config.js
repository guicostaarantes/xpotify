module.exports = {
  moduleDirectories: ["node_modules", "./src"],
  moduleNameMapper: {
    "#/(.*)": "<rootDir>/modules/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx)$": "<rootDir>/node_modules/babel-jest",
    ".+\\.(css)$": "<rootDir>/node_modules/jest-css-modules-transform",
  },
  globalSetup: "<rootDir>/globalSetup.js",
};
