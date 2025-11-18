// Description

This repository contains automated tests for the Cal.com project. 

// What You Need to Run

1 Node.js (version 18+)
2 Git
3 Docker (for Cal.com database)
4 Playwright 

// How to Install

1 Clone the repo: 
2 Install packages:
   npm install
3 Set up Cal.com locally 
4 Set up Playwright:
   

// How to Run Tests

1 All tests: npx playwright test
2 Report: npx playwright show-report
3 Specific file: npx playwright test ./tests/specs/example.spec.ts
4 In Chrome: npx playwright test --project=chromium
5 With visible browser: npx playwright test --project=chromium --headed
6 In debug: npx playwright test --debug

// Structure

├── README.md
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── tests/
│   ├── pages/  # Page classes
│   ├── fixtures/  # For auth 
│   ├── utils/  # Helpers
│   ├── specs/  # The tests 
│   └── api/  # API tests 
└── traces/video  # Traces / video for fails (to open trace use command  - npx playwright show-trace tracec/specs-login-has-title-chromium/trace.zip)

// Test Strategy

1 Testing UI E2E with API.
2 Tools: Playwright, TypeScript.
3 Coverage: Only critical path.
4 Bugs: In Trello.

