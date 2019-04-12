module.exports = {
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testRegex: "test\/.*\.spec\.(js|ts)$",
    testPathIgnorePatterns: ["/node_modules/"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!**/node_modules/**", "!**/dist/**"],
}
