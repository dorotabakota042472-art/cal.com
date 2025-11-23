import { test as setup, expect } from '@playwright/test';
import { Application } from '../pages/aplication';

const EMAIL = process.env.TEST_USER_EMAIL ?? (() => { throw new Error('Missing TEST_USER_EMAIL'); })();
const PASSWORD = process.env.TEST_USER_PASSWORD ?? (() => { throw new Error('Missing TEST_USER_PASSWORD'); })();
const URL = process.env.CALCOM_BASE_URL ?? (() => { throw new Error('Missing URL'); })();

const authFile = 'state/auth.json';        // ← сюда сохранится  localStorage

setup('аутентификация пользователя', async ({ page }) => {
  
  const application = new Application(page);

  // Переходим на страницу логина
  await page.goto(`${URL}/auth/login`); //http://localhost:3000/auth/login

  // Логинемся 
  // Ждём редиректа на event-types 
   await application.loginPage.login(EMAIL, PASSWORD);//'enterprise-member-11@example.com' ,'Vanda'   'janvandam933@gmail.com' ,'Aa80502558314'
   await expect(page).toHaveURL(`${URL}/event-types`, { timeout: 10000 }); //http://localhost:3000/event-types

  // Сохраняем состояние (cookies + localStorage)
  await page.context().storageState({ path: authFile });

  console.log('Сессия сохранена в', authFile);
});




