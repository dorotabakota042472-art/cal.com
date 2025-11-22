import { test, expect } from '@playwright/test'; // экспортим модули 
import { Application } from '../pages/aplication';
import { users } from '../fixtures/users';

let application: Application; // Объявляем переменную для работы с нашим "Application" переменная application может хранить только объекты типа Application (т.е. экземпляры этого класса).

  test.beforeEach(async ({ page }) => { // запускаем перед каждым тестом 
    application = new Application(page); // создаём экземпляр класса Application
   await application.loginPage.navigate(); // переходим на страницу 
   await application.loginPage.checkLoginPageUrl  // проверяем редирект 
  });

  test('Successful login with email/password', async ({ page }) => {
    await expect(page).toHaveTitle("Login | Cal.com");
    await application.loginPage.login(users.admin.email ,users.admin.password);
   // await expect(page).toHaveURL('http://localhost:3000/event-types', { timeout: 10000 }); 
  });

  test('Show/Hide password toggle', async ({ page }) => {
    await application.loginPage.password.fill(users.admin.password);
    await application.loginPage.ShowPassword.click();
    await expect(application.loginPage.hideeye).toHaveAttribute('href', '#eye-off');
    await application.loginPage.Hidepassword.click();
    await expect(application.loginPage.showeye).toHaveAttribute('href', '#eye');
  });

  test.skip('Sign up partial flow – shows check your email', async ({ page }) => {
    await application.loginPage.titleHaveAccount.click();
    await application.signup.continueWithEmailButton.click();
    await application.signup.signup(users.admin.username , users.admin.password ,users.admin.email );
    await application.signup.submitButton.click();
    await expect(application.signup.checkYourEmail).toHaveText('Check your email');
   // await expect(page).toHaveURL('http://localhost:3000/auth/verify-email?from=signup');
  });

  test('Empty login and password fields', async ({ page }) => {
    await application.loginPage.login('','');
    await application.loginPage.checkLoginPageUrl 
    await expect(application.loginPage.emailValidationError).toHaveText('This field is required.');
    await expect(application.loginPage.passwordValidationError).toHaveText('This field is required.');
  });

  test('Forgot password happy path – shows reset link sent', async ({ page }) => {
    await application.loginPage.forgot.click();
    //await expect(page).toHaveURL('http://localhost:3000/auth/forgot-password');
    await expect(application.forgotPassword.titleForgotPassword).toHaveText('Forgot Password?');
    await application.forgotPassword.textboxEmail.fill('dorotabakota0424722@gmail.com');
    await application.forgotPassword.sendReset.click();
    await expect(application.forgotPassword.resetlinkSent).toHaveText('Reset link sent');
  });

  test('Invalid email', async ({ page }) => {
    await application.loginPage.login(users.user1.email,users.admin.password);
   await application.loginPage.checkLoginPageUrl
    await expect(application.loginPage.incorrectEmailPassword).toHaveText('Email or password is incorrect.', { timeout: 10000 });
  });

  test('Invalid password', async ({ page }) => {
    await application.loginPage.login(users.admin.email, users.user1.password);
    await application.loginPage.checkLoginPageUrl
    await expect(application.loginPage.incorrectEmailPassword).toHaveText('Email or password is incorrect.', { timeout: 10000 });
  });

  test('Invalid email and password', async ({ page }) => {
    await application.loginPage.login(users.user1.email, users.user1.password);
     await application.loginPage.checkLoginPageUrl
    await expect(application.loginPage.incorrectEmailPassword).toHaveText('Email or password is incorrect.', { timeout: 10000 });
  });

  test('SQL injection attempt', async ({ page }) => {
    await application.loginPage.login("' OR '1'='1","' OR '1'='1");
    await expect(application.loginPage.enterAValidEmail).toHaveText('Please enter a valid email');
    await application.loginPage.checkLoginPageUrl
  });

  test('Check visibility of login page elements', async ({ page }) => {
    await expect(application.loginPage.titleWelcomeBack).toBeVisible();
    await expect(application.loginPage.titleEmile).toBeVisible();
    await expect(application.loginPage.titlePassword).toBeVisible();
    await expect(application.loginPage.titleHaveAccount).toBeVisible();
    await expect(application.loginPage.titleSignIn).toBeVisible();
  });

  test('Placeholders and labels verification', async ({ page }) => {
    await expect(application.loginPage.username).toHaveAttribute('placeholder', 'john.doe@example.com');
    await expect(application.loginPage.password).toHaveAttribute('placeholder', '•••••••••••••');
  });


