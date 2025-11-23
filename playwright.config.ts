  import { defineConfig, devices } from '@playwright/test';


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
   expect: {
    timeout: 3000,
  },
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false, //true
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  //retries: process.env.CI ? 2 : 0,
  retries: 1, // количество повторных запусков теста в случае его падения.
  /* Opt out of parallel tests on CI. */
  //workers: process.env.CI ? 1 : undefined,
  workers: 1, //1 запускаем все тесты по одному
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  outputDir: 'tracec', // вот папка для сохранения видео/трейсов
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure', // сохранять трейс только при падении
    video: 'retain-on-failure', // сохранять видео только при падении
    actionTimeout: 2000,
    permissions: ['clipboard-read', 'clipboard-write'], //дали доступ на работу с буфером обмена
    
  },

  /* Configure projects for major browsers */
//   projects: [
//   {
//     name: 'setup',
//     testMatch: 'auth.setup.ts',
//   },
//   {
//     name: 'no-auth',
//     testMatch: 'login.spec.ts',
//     use: { ...devices['Desktop Chrome'] },
//   },
//   {
//     name: 'authenticated',
//     dependencies: ['setup'],                    
//     use: {
//       ...devices['Desktop Chrome'],
//       storageState: 'state/auth.json',           
//     },
//   },
// ],
projects: [
  // ---------------------------------------
  // 1) SETUP — только авторизация
  // ---------------------------------------
  {
    name: 'setup',
    testMatch: /auth\.setup\.ts/,
  },

  // ---------------------------------------
  // 2) ПРОЕКТ ДЛЯ login.spec.ts — БЕЗ аутентификации
  // ---------------------------------------
  {
    name: 'no-auth',
    testMatch: [/tests\/specs\/login\.spec\.ts/,  /tests\/api\/publicApi\.spec\.ts/],
    use: {
      ...devices['Desktop Chrome'],
    },
  },

  // ---------------------------------------
  // 3) ПРОЕКТ ДЛЯ eventtype.spec.ts — НУЖНА АВТОРИЗАЦИЯ
  // ---------------------------------------
  {
    name: 'eventtype-auth',
    testMatch: [/tests\/specs\/eventtype\.spec\.ts/, /tests\/api\/trpc\.spec\.ts/, 
      /tests\/api\/tRPCmockData\.spec\.ts/,
      /tests\/api\/trpc3\.spec\.ts/,
      /tests\/api\/trpc-client\.spec\.ts/,

     ],
    dependencies: ['setup'],        // запускаем setup перед тестами
    use: {
      ...devices['Desktop Chrome'],
      storageState: 'state/auth.json', // используем сохранённую сессию
    },
  },

  // ---------------------------------------
  // 4) ПРОЕКТ ДЛЯ остальных авторизованных тестов 
  // ---------------------------------------
  {
    name: 'authenticated',
    testMatch: [/tests\/specs\/authenticated\/.*\.spec\.ts/],
    dependencies: ['setup'],
    use: {
      ...devices['Desktop Chrome'],
      storageState: 'state/auth.json',
    },
  },
],


  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
