import { test, expect } from '@playwright/test';
import { Application } from '../pages/aplication';

test.skip('Успешный вход через email / пароль ', async ({ page }) => {
  const application = new Application(page);
  await application.loginPage.navigate()
  await expect(page).toHaveTitle("Login | Cal.com");
  await application.loginPage.login('dorotabakota042472@gmail.com' ,'Vanda')
  await expect(page).toHaveURL('https://app.cal.com/auth/login')
  await page.pause();
});

test.skip('пароль виден/ пароль скрыт ', async ({ page }) => {
 await page.getByTestId('input-field').click();
  await page.getByTestId('input-field').fill('vanda');
  await page.getByRole('button', { name: 'Show password' }).click();
  await page.getByRole('button', { name: 'Show password' }).click();
});
test.skip('Немає облікового запису? ', async ({ page }) => {

});
test.skip('Немає облікового запису1? ', async ({ page }) => {

});
test.skip('Немає облікового запису2? ', async ({ page }) => {

});
test.skip('пустое поле логин и пароль', async ({ page }) => {
  const application = new Application(page);
  await application.loginPage.navigate()
  await expect(page).toHaveURL('https://app.cal.com/auth/login')
  await application.loginPage.login('' ,'')
  await expect(page).toHaveURL('https://app.cal.com/auth/login')
  await expect.soft(application.loginPage.emailValidationError).toHaveText('This field is required.');
  await expect.soft(application.loginPage.passwordValidationError).toHaveText('This field is required.');
});

test.skip('рвоерка забыл пароль', async ({ page }) => {
  const application = new Application(page);
  await application.loginPage.navigate()
  await expect(page).toHaveURL('https://app.cal.com/auth/login')

  await page.getByRole('link', { name: 'Forgot?' }).click();
  await expect(page).toHaveURL('https://app.cal.com/auth/forgot-password')
  await expect(application.forgotPassword.titleForgotPassword).toHaveText('Forgot Password?');
  await application.forgotPassword.textboxEmail.fill('dorotabakota0424722@gmail.com');
  await application.forgotPassword.sendReset.click();
  await expect(application.forgotPassword.resetlinkSent).toHaveText('Reset link sent');
});

test.skip('неверный имеил', async ({ page }) => {
  const application = new Application(page);
  await application.loginPage.navigate()
  await expect(page).toHaveURL('https://app.cal.com/auth/login')
  await application.loginPage.login('dorotabakota0424722@gmail.com' ,'Aa80502558314')
  await expect(page).toHaveURL('https://app.cal.com/auth/login')

});
test.skip('неверный пароль', async ({ page }) => {
  const application = new Application(page);
  await application.loginPage.navigate()
  await expect(page).toHaveURL('https://app.cal.com/auth/login')
  await application.loginPage.login('dorotabakota042472@gmail.com' ,'Vanda')
  await expect(page).toHaveURL('https://app.cal.com/auth/login')
});
test.skip('неверный емаил и пароль', async ({ page }) => {
  const application = new Application(page);
  await application.loginPage.navigate()
  await expect(page).toHaveURL('https://app.cal.com/auth/login')
  await application.loginPage.login('dorotabakota0424721@gmail.com' ,'Vanda')
  await expect(page).toHaveURL('https://app.cal.com/auth/login')
  await expect(application.loginPage.incorrectEmailPassword).toHaveText('Email or password is incorrect.');
});
test.skip('SQL-инъекция', async ({ page }) => {
//SQL-инъекция (например, "' OR '1'='1")
});
test('Отображение элементов на странице', async ({ page }) => {
  const application = new Application(page);
  await application.loginPage.navigate()
  await expect(page).toHaveURL('https://app.cal.com/auth/login')
  await expect(application.loginPage.titleWelcomeBack).toBeVisible()
  await expect(application.loginPage.titleEmile).toBeVisible()
  await expect(application.loginPage.titlePassword).toBeVisible()
  await expect(application.loginPage.titleHaveAccount).toBeVisible()
  await expect(application.loginPage.titleSignIn).toBeVisible()

});
test.skip('проверить - Плейсхолдеры и метки полей', async ({ page }) => {
  const application = new Application(page);
  await application.loginPage.navigate()
  await expect(page).toHaveURL('https://app.cal.com/auth/login')
  await expect(application.loginPage.username).toHaveAttribute('placeholder', 'john.doe@example.com');
  await expect(application.loginPage.password).toHaveAttribute('placeholder', '•••••••••••••');
});




