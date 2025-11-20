import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env');
const apiKey = fs.readFileSync(envPath, 'utf-8')
  .split('\n')
  .find(l => l.trim().startsWith('CAL_COM_API_KEY='))
  ?.split('=')[1]
  ?.trim();

test('создание event type через REST v2 — с правильным location type', async ({ request }) => {
  if (!apiKey) throw new Error('Нет CAL_COM_API_KEY в .env');

  console.log('Ключ найден, длина:', apiKey.length);

  const response = await request.post('https://api.cal.com/v2/event-types', {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'cal-api-version': '2024-06-14',   
    },
    data: {
      title: `Playwright Test — ${Date.now()}`,
      slug: `pw-test-${Date.now()}`,
      lengthInMinutes: 30,
      locations: [                                     
        {
          type: 'address',                           
          address: 'Test Address, Test City, 123 Test St',  
          public: true,
        },
      ],
      description: 'Создано через Playwright REST v2 API (исправленный location)',
    },
  });

  console.log('Status:', response.status());

  if (!response.ok()) {
    console.log('Полный ответ сервера:', await response.text());
    throw new Error(`HTTP ${response.status()}`);
  }

  const json = await response.json();
  console.log('СОБЫТИЕ СОЗДАНО!');
  console.log('Ссылка:', `https://app.cal.com/${json.data.slug}`);

  expect(response.status()).toBe(201);
  expect(json.data.title).toContain('Playwright Test');
});