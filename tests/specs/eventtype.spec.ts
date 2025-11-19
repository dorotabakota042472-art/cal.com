import { test, expect } from '@playwright/test';
import { Application } from '../pages/aplication';

let application: Application;



test.beforeEach(async ({ page }) => {

  application = new Application(page);
  await application.evenTypePage.navigate();
  await expect(page).toHaveURL('https://app.cal.com/event-types');
});

test.skip('создание event-types', async ({ page }) => {
  // Ждём появления иментов, если они есть, но не падаем
  const buttons = page.locator('button.group[data-testid^="event-type-options-"]:visible');
  try {
    await buttons.first().waitFor({ state: 'visible', timeout: 3000 });
  } catch {
    console.log('Элементы не появились, продолжаем выполнение теста');
  }

  // Удаляем все существующие event-types
  await application.evenTypePage.deleteAllEventTypes();

  // Создаём новый event-type
  const newEventName = 'NewChet';
  await application.evenTypePage.createEventType(newEventName);

  // Проверяем, что он появился
  await application.evenTypePage.expectEventTypeExists(newEventName);
});



test('Публичное бронирование', async ({ page }) => {

  
  // Ждём появления иментов, если они есть, но не падаем
  const buttons = page.locator('button.group[data-testid^="event-type-options-"]:visible');
  try {
    await buttons.first().waitFor({ state: 'visible', timeout: 3000 });
  } catch {
    console.log('Элементы не появились, продолжаем выполнение теста');
  }

  // Удаляем все существующие event-types
  await application.evenTypePage.deleteAllEventTypes();

  // Создаём новый event-type
  const newEventName = 'NewChet';
  await application.evenTypePage.createEventType(newEventName);

  // Проверяем, что он появился
  await application.evenTypePage.expectEventTypeExists(newEventName);

  //копируем линку 
  //await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();
  await application.evenTypePage.copyLink.click();

  
  // Теперь читаем из буфера обмена
const publicUrl = await page.evaluate(() => navigator.clipboard.readText());
console.log('Скопированная публичная ссылка:', publicUrl);// 


// Теперь открываем как гость
const guestContext = await page.context().browser()!.newContext();
await guestContext.clearCookies(); // на всякий случай
const guestPage = await guestContext.newPage();

await guestPage.goto(publicUrl);



//await guestPage.getByRole('button', { name: '21' }).click({ timeout: 10000 });
await application.guestPage.date.click({ timeout: 10000 });
//await guestPage.getByRole('button', { name: '10:00am' }).click();
await application.guestPage.time.click()
//await guestPage.getByRole('textbox', { name: 'Your name*' }).fill('Фкеуь');
await application.guestPage.name.fill('Фкеуь');
//await guestPage.getByRole('textbox', { name: 'Email address *' }).fill('artem@gmail.com');
await application.guestPage.email.fill('artem@gmail.com');
//await guestPage.getByTestId('confirm-book-button').click();
await application.guestPage.submit.click();
//await guestPage.getByText('This meeting is scheduled').click({ timeout: 10000 });
await expect(application.guestPage.titleScheduled).toHaveText('This meeting is scheduled');


});