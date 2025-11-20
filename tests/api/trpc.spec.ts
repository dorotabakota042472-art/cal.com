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
  const response = await request.post('https://api.cal.com/v2/event-types', {
    headers: {
      'Authorization': `Bearer ${apiKey}`,  
      'cal-api-version': '2024-06-14',   
    },
    data: {
      title: `P"Learn the secrets of masterc1hief!111"`,
      slug: `"P"Learn the secrets of masterc1hief!111"`,
      lengthInMinutes: 60, 
    },
  });

  console.log('Status:', response.status());
  const json = await response.json();
  console.log(json);


  expect(response.status()).toBe(201);
});