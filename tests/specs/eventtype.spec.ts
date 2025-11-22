import { test, expect } from '@playwright/test';
import { Application } from '../pages/aplication';
import { GuestPage } from '../pages/guestPage';
import { users } from '../fixtures/users';
import { Upcoming } from '../pages/upcomingPage';



let application: Application;
const timestamp : number = Date.now();

test.beforeEach(async ({ page }) => {
  application = new Application(page);
  await application.evenTypePage.navigate();
  await application.evenTypePage.checkeventPageUrl
});

test.skip('Create event-types', async ({ page }) => {
  // Ждём появления ивентов, если они есть, но не падаем
  try {
    await application.evenTypePage.deleteButtons.first().waitFor({ state: 'visible', timeout: 3000 });// проверяем есть ли ивенты , если нет тест не падает 
  } catch {
    console.log('Элементы не появились, продолжаем выполнение теста');
  }

  // Удаляем все существующие ивенты
  await application.evenTypePage.deleteAllEventTypes();

  // Создаём новый ивент
  const newEventName : string = `string_${timestamp}`;
  await application.evenTypePage.createEventType(newEventName);

  // Проверяем, что ивент появился
  await application.evenTypePage.expectEventTypeExists(newEventName);
});



test('Public booking flow', async ({ page }) => {
  
  // Ждём появления ивентов, если они есть, но не падаем
  try {
    await application.evenTypePage.deleteButtons.first().waitFor({ state: 'visible', timeout: 3000 });// проверяем есть ли ивенты , если нет тест не падает 
  } catch {
    console.log('Элементы не появились, продолжаем выполнение теста');
  }

  // Удаляем все существующие event-types
  await application.evenTypePage.deleteAllEventTypes();

  // Создаём новый ивент
  const newEventName : string = `string_${timestamp}`;
  await application.evenTypePage.createEventType(newEventName);

  // Проверяем, что ивент появился
  await application.evenTypePage.expectEventTypeExists(newEventName);

  //копируем линку 
  await application.evenTypePage.copyLink.click();

  // Теперь читаем из буфера обмена
  const publicUrl = await page.evaluate(() => navigator.clipboard.readText());
  //console.log('Скопированная публичная ссылка:', publicUrl);// 


// Теперь открываем как гость
const guestContext = await page.context().browser()!.newContext();
const guestPage = await guestContext.newPage();

await guestPage.goto(publicUrl);

// ← Новый GuestPage для гостевой страницы!
const guest = new GuestPage(guestPage);
  
await guest.date.click({ timeout: 10000 });// выбираем дату 
await guest.firstAvailableTime.click(); // выбираем время 

let username: string = users.admin.username

await guest.bookAsGuest(username , users.admin.email)
await expect(guest.titleScheduled).toHaveText('This meeting is scheduled', { timeout: 10000 });

await guestContext.close();// закрываем контекст
await application.evenTypePage.navigate();// переходим обратно 

await application.upcoming.bookings.click();
await application.upcoming.upcoming.click();

await application.upcoming.selectPaginationSizeSelector();

await expect(page.getByText(username).last()).toHaveText(username, { timeout: 10000 });// првоеряем что ивент забуканый есть 

});