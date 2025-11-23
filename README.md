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
- To Tun API tests in UI mode - npx playwright test ./tests/specs/example.spec.ts --ui
- To Tu Run tRPC mok tests -  npx playwright test ./tests/api/tRPC3.spec.ts --debug

// Structure

├── README.md  -           A short project description is a brief summary that explains what the project does
├── state -                cookies
├── playwright.config.ts. - the central file that controls the behavior of all Playwright tests.
├── package.json.    -  is the main file that defines your project’s metadata and manages dependencies
├── package-lock.json - the file that locks the exact versions of all installed npm dependencies
├── Dockerfile -        is needed to create a container with a ready-to-use environment for running Playwright tests
├── tests/
├── state/           #  storageState
│   ├── pages/        # Page classes
│   ├── fixtures/      set up data
│   ├── setup         # For auth
│   ├── specs/       # The tests 
│   └── api/         # API tests 
└── traces/video     # Traces / video for fails (to open trace use command  - npx playwright show-trace tracec/specs-login-has-title-chromium/trace.zip)

// Test Strategy

- Testing UI E2E with API.
- Tools: Playwright, TypeScript.
- Coverage: Only critical path.
- Bugs: In Trello.

//Running Playwright tests within a Docker
- Create a Dockerfile
- Build the Docker Image - docker build -t playwright-tests .
- Run the Docker Container and Execute Tests -  docker run --rm playwright-tests npx playwright test tests/specs/login.spec.ts
- To look at the report - npx playwright show-report --port=9323


//This project requires a .env file in the root directory to store sensitive keys.

CAL_COM_API_KEY=YOUR_API_KEY_HERE

//Instal dotenv
- npm install -D @types/node
- npm install -D dotenv   

//After cloning the repository and installing dependencies, **be sure** to run
```bash
- npx playwright test --project=setup



 //Установи зависимости: npm i @trpc/client superjson 

