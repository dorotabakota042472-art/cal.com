import { test, expect } from '@playwright/test';
import { generateFakeEventTypes } from '../fixtures/fake-event-types';
import { Application } from '../pages/aplication';

let application: Application;

test('мокаем tRPC и создаём много сущностей', async ({ page }) => {
application = new Application(page);
  await page.route('**/api/trpc/eventTypes/getEventTypesFromGroup**', async route => {
    
    
    const fakeEvents = generateFakeEventTypes(400);// генерируем N фейковых ивентов

    const json = [
      {
        result: {
          data: {
            json: {
              eventTypes: fakeEvents,
              nextCursor: null
            },
            meta: {
              values: {}
            }
          }
        }
      }
    ];

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(json)
    });
  });

 
  await application.evenTypePage.navigate();
  // Проверяем что много сущностей реально появились
  await expect(page.getByText('Fake Event 0')).toBeVisible();
  await expect(page.getByText('Fake Event 199')).toBeVisible();
});
