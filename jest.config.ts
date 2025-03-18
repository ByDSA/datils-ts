const config = {
  moduleDirectories: [
    "node_modules",
    "src",
  ],
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^tests($|/.*)$": "<rootDir>/tests/$1",
  },
};

export default config;
