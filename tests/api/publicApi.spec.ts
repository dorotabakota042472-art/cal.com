import { test, expect } from '@playwright/test';
import { users } from '../fixtures/users';

const apiKey = process.env.TEST_USER_EMAI;

test('create event type', async ({ request }) => {
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

  console.log('Status:', response.status());
  const json = await response.json();// Преобразуем ответ API из формата JSON в объект
   console.log(json)
  expect(response.status()).toBe(201);// првоеряем статус код
  expect(json.data.title).toBe(users.user1.username) // првоеряем тайтл
  expect(json.data.slug).toBe(users.user1.username)// проверяем URL
  expect(json.data.lengthInMinutes).toBe(60)// проверяем lengthInMinutes
});