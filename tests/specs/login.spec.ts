import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test('login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate(); 
  
  await expect(page).toHaveTitle("Login | Cal.com1");

  await loginPage.enterUserName('enterprise-member-11@example.com');
  await loginPage.enterPassword('Vanda');
  await loginPage.clickLoginButton();

  await page.pause();
});
