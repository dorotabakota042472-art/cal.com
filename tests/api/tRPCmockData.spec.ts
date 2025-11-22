import { test, expect } from '@playwright/test';
import { generateFakeEventTypes, fakeLongDescriptionEvent } from '../fixtures/fake-event-types';
import { Application } from '../pages/aplication';
import path from 'path';
import { users } from '../fixtures/users';
import fs from 'fs'; // Подключаем  работы с файловой системой чтение/запись файлов


let application: Application;

 
    const envPath = path.resolve(process.cwd(), '.env'); // Создаём путь к файлу .env 
    const apiKey = fs.readFileSync(envPath, 'utf-8')      // Считываем содержимое файла .env как текст
      .split('\n')                                        // Разбиваем текст на строки
      .find(l => l.trim().startsWith('CAL_COM_API_KEY=')) // Находим строку с ключом CAL_COM_API_KEY
      ?.split('=')[1]                                     // Берём значение после знака "="
      ?.trim();                                           // Убираем пробелы по краям

test.beforeEach(async ({ request }) => { // запускаем перед каждым тестом (создаем ивент)
     
      const response = await request.post('https://api.cal.com/v2/event-types', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,  
          'cal-api-version': '2024-06-14',   
        },
        data: {
          title: users.user1.username,
          slug: users.user1.username,
          lengthInMinutes: 60, 
        },
      });
    
    
   
  });

test.only('tRPC mock: verify long event description is fully displayed', async ({ page }) => {
  const description: string = "Ванда ".repeat(20); // создаём очень длинную строку

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

  await page.goto('https://app.cal.com/event-types'); //переходим на страницу ивентов 
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
  await expect(page.getByText('Fake Event 0')).toBeVisible();
  await expect(page.getByText('Fake Event 199')).toBeVisible();
});