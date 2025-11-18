import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/loginPage'

test('login', async ({ page }) => {

  const Login = new LoginPage(page)

  await page.goto('https://app.cal.com/auth/login');
  await expect(page).toHaveTitle("Login | Cal.com")

  await Login.enterUserName('')
  await Login.enterPassword('')
  await Login.clickLoginButton

 
});


