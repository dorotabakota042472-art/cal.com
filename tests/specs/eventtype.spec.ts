import { test, expect } from '@playwright/test';

test('должен быть уже залогинен и попасть на страницу event-types', async ({ page }) => {
  // ЭТА СТРОЧКА ОБЯЗАТЕЛЬНА при использовании storageState
  await page.goto('http://localhost:3000/event-types');

  // Теперь проверяем — всё зелёное
  await expect(page).toHaveURL('http://localhost:3000/event-types');
});
test('111111', async ({ page }) => {
  // ЭТА СТРОЧКА ОБЯЗАТЕЛЬНА при использовании storageState
  await page.goto('http://localhost:3000/event-types');

  // Теперь проверяем — всё зелёное
  await expect(page).toHaveURL('http://localhost:3000/event-types');
});
test('22222', async ({ page }) => {
  // ЭТА СТРОЧКА ОБЯЗАТЕЛЬНА при использовании storageState
  await page.goto('http://localhost:3000/event-types');

  // Теперь проверяем — всё зелёное
  await expect(page).toHaveURL('http://localhost:3000/event-types');
});
test('4', async ({ page }) => {
  // ЭТА СТРОЧКА ОБЯЗАТЕЛЬНА при использовании storageState
  await page.goto('http://localhost:3000/event-types');

  // Теперь проверяем — всё зелёное
  await expect(page).toHaveURL('http://localhost:3000/event-types');
});