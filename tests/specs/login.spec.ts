import { test, expect } from '@playwright/test';
import { Application } from '../pages/aplication';

let application: Application;

test.describe('Login page tests', () => {

  test.beforeEach(async ({ page }) => {
    application = new Application(page);
    await application.loginPage.navigate();
    await expect(page).toHaveURL('http://localhost:3000/auth/login');
  });

  test('Successful login with email/password', async ({ page }) => {
    await expect(page).toHaveTitle("Login | Cal.com");
    await application.loginPage.login('enterprise-member-11@example.com' ,'Vanda');
    await expect(page).toHaveURL('http://localhost:3000/event-types', { timeout: 10000 }); 
  });

  test.skip('Show/Hide password toggle', async ({ page }) => {
    await application.loginPage.password.fill('vanda');
    await application.loginPage.ShowPassword.click();
    await expect(application.loginPage.hideeye).toHaveAttribute('href', '#eye-off');
    await application.loginPage.Hidepassword.click();
    await expect(application.loginPage.showeye).toHaveAttribute('href', '#eye');
  });

  test.skip('Sign up flow - No account yet', async ({ page }) => {
    await application.loginPage.titleHaveAccount.click();
    await application.signup.continueWithEmailButton.click();
    await application.signup.signup("user121435" , 'Aa80502558314' ,'temai3213211l@gmail.com' );
    await application.signup.submitButton.click();
    await expect(application.signup.checkYourEmail).toHaveText('Check your email');
    await expect(page).toHaveURL('http://localhost:3000/auth/verify-email?from=signup');
  });

  test.skip('Empty login and password fields', async ({ page }) => {
    await application.loginPage.login('','');
    await expect(page).toHaveURL('http://localhost:3000/auth/login');
    await expect(application.loginPage.emailValidationError).toHaveText('This field is required.');
    await expect(application.loginPage.passwordValidationError).toHaveText('This field is required.');
  });

  test.skip('Forgot password flow', async ({ page }) => {
    await application.loginPage.forgot.click();
    await expect(page).toHaveURL('http://localhost:3000/auth/forgot-password');
    await expect(application.forgotPassword.titleForgotPassword).toHaveText('Forgot Password?');
    await application.forgotPassword.textboxEmail.fill('dorotabakota0424722@gmail.com');
    await application.forgotPassword.sendReset.click();
    await expect(application.forgotPassword.resetlinkSent).toHaveText('Reset link sent');
  });

  test.skip('Invalid email', async ({ page }) => {
    await application.loginPage.login('dorotabakota0424722@gmail.com','Aa80502558314');
    await expect(page).toHaveURL('http://localhost:3000/auth/login');
  });

  test.skip('Invalid password', async ({ page }) => {
    await application.loginPage.login('dorotabakota042472@gmail.com','Vanda');
    await expect(page).toHaveURL('http://localhost:3000/auth/login');
  });

  test.skip('Invalid email and password', async ({ page }) => {
    await application.loginPage.login('dorotabakota0424721@gmail.com','Vanda');
    await expect(page).toHaveURL('http://localhost:3000/auth/login');
    await expect(application.loginPage.incorrectEmailPassword).toHaveText('Email or password is incorrect.');
  });

  test.skip('SQL injection attempt', async ({ page }) => {
    await application.loginPage.login("' OR '1'='1","' OR '1'='1");
    await expect(application.loginPage.enterAValidEmail).toHaveText('Please enter a valid email');
    await expect(page).toHaveURL('http://localhost:3000/auth/login');
  });

  test.skip('Check visibility of login page elements', async ({ page }) => {
    await expect(application.loginPage.titleWelcomeBack).toBeVisible();
    await expect(application.loginPage.titleEmile).toBeVisible();
    await expect(application.loginPage.titlePassword).toBeVisible();
    await expect(application.loginPage.titleHaveAccount).toBeVisible();
    await expect(application.loginPage.titleSignIn).toBeVisible();
  });

  test.skip('Placeholders and labels verification', async ({ page }) => {
    await expect(application.loginPage.username).toHaveAttribute('placeholder', 'john.doe@example.com');
    await expect(application.loginPage.password).toHaveAttribute('placeholder', '•••••••••••••');
  });

});
