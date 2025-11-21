import { test as setup, expect } from '@playwright/test';
import { Application } from '../pages/aplication';

const authFile = 'state/auth.json';        // ← сюда сохранится  localStorage

setup('аутентификация пользователя', async ({ page }) => {
  
  const application = new Application(page);

  // Переходим на страницу логина
  await page.goto('https://app.cal.com/auth/login'); //http://localhost:3000/auth/login

  // Логинемся 
  // Ждём редиректа на event-types 
   await application.loginPage.login('janvandam933@gmail.com' ,'Aa80502558314');//'enterprise-member-11@example.com' ,'Vanda'
   await expect(page).toHaveURL('https://app.cal.com/event-types', { timeout: 10000 }); //http://localhost:3000/event-types

  // Сохраняем состояние (cookies + localStorage)
  await page.context().storageState({ path: authFile });

  console.log('Сессия сохранена в', authFile);
});




