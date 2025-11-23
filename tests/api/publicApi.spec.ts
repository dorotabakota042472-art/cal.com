import { test, expect } from '@playwright/test';
import { users } from '../fixtures/users';

const apiKey = process.env.CAL_COM_API_KEY;
console.log(apiKey)
const URL = process.env.CALCOM_BASE_URL

test('create event type', async ({ request }) => {
  const response = await request.post(`http://localhost:3000/v2/event-types`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,  
      'cal-api-version': '2024-06-14',   
      'Content-Type': 'application/json',
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