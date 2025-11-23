import { test, expect } from '@playwright/test';
import { generateFakeEventTypes, fakeLongDescriptionEvent } from '../fixtures/fake-event-types';
import { Application } from '../pages/aplication';
import { users } from '../fixtures/users';


let application: Application;
const apiKey = process.env.TEST_USER_EMAI;
const URL = process.env.CALCOM_BASE_URL


test('tRPC mock: verify long event description is fully displayed', async ({ page }) => {

  await page.route('**/api/trpc/eventTypes/getEventTypesFromGroup**', async route => {// Перехватываем  запросы к endpoint getEventTypesFromGroup

    const json = [
      {
        result: {
          data: {
            json: {
              eventTypes: [fakeLongDescriptionEvent],
              nextCursor: null
            },
            meta: {
              values: {}
            }
          }
        }
      }
    ];

    await route.fulfill({// заполняем 
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(json)
    });
  });

  await page.goto(`${URL}/event-types`); //переходим на страницу ивентов 
  const longDescription: string = fakeLongDescriptionEvent["description"];// берем значение из фикстур 
  await expect(page.getByText(longDescription).first()).toContainText(longDescription, { timeout: 10000 });// проверяем что текст не обрезается 
});

test('should mock tRPC and create many event types', async ({ page }) => {
application = new Application(page); // Создаём экземпляр класса Application

await page.route('**/api/trpc/eventTypes/getEventTypesFromGroup**', async route => {// Перехватываем  запросы к endpoint "getEventTypesFromGroup" и подменяем ответ
      
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

    await route.fulfill({ //Перехватываем сетевой запрос и наполняем 
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(json)
    });
  });

 
  await application.evenTypePage.navigate();//переходим на страницу ивентов 
  // Проверяем что много сущностей реально появились
  await expect(page.getByText('Fake Event 0')).toBeVisible({ timeout: 10000 });
  await expect(page.getByText('Fake Event 199')).toBeVisible({ timeout: 10000 });
});