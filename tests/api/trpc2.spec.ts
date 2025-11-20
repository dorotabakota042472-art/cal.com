// tests/event-types.spec.ts
import { test, expect } from '@playwright/test';

test('tRPC мок: принудительно ставим description = "пока" у всех ивентов', async ({ page }) => {
  await page.route('**/api/trpc/eventTypes/getEventTypesFromGroup**', async route => {
    // Берём настоящий ответ от сервера
    const response = await route.fetch();
    let json = await response.json();

    // Принудительно меняем description и safeDescription у ВСЕХ ивентов
    if (Array.isArray(json) && json[0]?.result?.data?.json?.eventTypes) {
      json[0].result.data.json.eventTypes.forEach((event: any) => {
        event.description = "пока";                    
        event.safeDescription = "<p>пока</p>\n";       
        event.title = event.title + " [мок]";
      });
    }
// Возвращаем изменённый ответ
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(json)
    });
  });

  await page.goto('https://app.cal.com/event-types');

  // Проверяем, что в UI везде теперь "пока"
  await expect(page.getByText('пока')).toBeVisible({ timeout: 10000 });


});