import { test, expect } from '@playwright/test';
import fs from 'fs'; // Подключаем  работы с файловой системой чтение/запись файлов
import path from 'path';
import { users } from '../fixtures/users';

const envPath = path.resolve(process.cwd(), '.env'); // Создаём путь к файлу .env 
const apiKey = fs.readFileSync(envPath, 'utf-8')      // Считываем содержимое файла .env как текст
  .split('\n')                                        // Разбиваем текст на строки
  .find(l => l.trim().startsWith('CAL_COM_API_KEY=')) // Находим строку с ключом CAL_COM_API_KEY
  ?.split('=')[1]                                     // Берём значение после знака "="
  ?.trim();                                           // Убираем пробелы по краям


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
  
  expect(response.status()).toBe(201);// првоеряем статус код
  expect(json.data.title).toBe(users.user1.username) // првоеряем тайтл
  expect(json.data.slug).toBe(users.user1.username)// проверяем URL
  expect(json.data.lengthInMinutes).toBe(60)// проверяем lengthInMinutes
});