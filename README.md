// Description

This repository contains automated tests for the Cal.com project. 

// What You Need to Run

- Node.js (version 18+)
- Git
- Docker (for Cal.com database)
- Playwright 

// How to Install

- Clone the repo: 
- Install packages:
   npm install
- Set up Cal.com locally 
- Set up Playwright:
   

// How to Run Tests

- All tests: npx playwright test
- Report: npx playwright show-report
- Specific file: npx playwright test ./tests/specs/example.spec.ts
- In Chrome: npx playwright test --project=chromium
- With visible browser: npx playwright test --project=chromium --headed
- In debug: npx playwright test --debug

// Structure

├── README.md
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── tests/
├── state/  #  storageState
│   ├── pages/  # Page classes
│   ├── fixtures/  # For auth 
│   ├── utils/  # Helpers
│   ├── specs/  # The tests 
│   └── api/  # API tests 
└── traces/video  # Traces / video for fails (to open trace use command  - npx playwright show-trace tracec/specs-login-has-title-chromium/trace.zip)

// Test Strategy

- Testing UI E2E with API.
- Tools: Playwright, TypeScript.
- Coverage: Only critical path.
- Bugs: In Trello.

//Running Playwright tests within a Docker
- Create a Dockerfile
- Build the Docker Image - docker build -t playwright-tests .
- Run the Docker Container and Execute Tests -  docker run --rm -v ${PWD}/tracec:/app/tracec playwright-tests
- To look at the report - npx playwright show-report --port=9323

//After cloning the repository and installing dependencies, **be sure** to run
```bash
- npx playwright test --project=setup


// To Tun API tests in UI mode
 - Use commanr - npx playwright test ./tests/api/trpc.spec.ts --ui