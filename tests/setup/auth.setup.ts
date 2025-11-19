import { test as setup, expect } from '@playwright/test';
import { Application } from '../pages/aplication';

const authFile = 'state/auth.json';        // ← сюда сохранится кука + localStorage

setup('аутентификация пользователя', async ({ page }) => {
  const application = new Application(page);

  // Переходим на страницу логина
  await page.goto('http://localhost:3000/auth/login');

  // Логинемся (подставь свои тестовые данные)
  // Ждём редиректа на event-types (это важно!)
   await application.loginPage.login('enterprise-member-11@example.com' ,'Vanda');
   await expect(page).toHaveURL('http://localhost:3000/event-types', { timeout: 10000 }); 

  // Сохраняем состояние (cookies + localStorage)
  await page.context().storageState({ path: authFile });

  console.log('Сессия сохранена в', authFile);
});


