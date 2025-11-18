import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/loginPage'

test('login', async ({ page }) => {

  const Login = new LoginPage(page)

  await page.goto('http://localhost:3000/auth/login'); //  http://localhost:3000/auth/login    http://host.docker.internal:3000/auth/login
 
  await expect(page).toHaveTitle("Login | Cal.com1")

  await Login.enterUserName('enterprise-member-11@example.com')
  await Login.enterPassword('Vanda')
  await Login.clickLoginButton()

  await page.pause()

 
});


