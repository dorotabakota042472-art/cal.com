import { test, expect, request } from '@playwright/test';


test('tRPC: getEventTypesFromGroup', async () => {
  // контекст с авторизацией
  const api = await request.newContext({
    storageState: 'state/auth.json', // важно!
  });

  const input = {
    "0": {
      json: {
        group: {
          teamId: null,
          parentId: null
        },
        searchQuery: "",
        limit: 10
      }
    }
  };

  const response = await api.get(
    'http://localhost:3000/api/trpc/eventTypes/getEventTypesFromGroup',
    {
      params: {
        batch: 1,
        input: JSON.stringify(input),
      },
      headers: {
        "content-type": "application/json",
        "Accept": "*/*",
      },
    }
  );

  console.log("STATUS:", response.status());
  const json = await response.json();
  console.log("RESPONSE:", JSON.stringify(json, null, 2));

  expect(response.ok()).toBeTruthy();
});


test('tRPC: create event type', async ({}) => {
  // Создаем контекст с авторизацией
  const api = await request.newContext({
    storageState: 'state/auth.json', // путь к вашему auth.json
  });

  // tRPC payload
  const input = {
    "0": {
      json: {
        title: "Автотест Ивент",
        slug: "auto-event-" + Date.now(),
        description: "",
        length: 15,
        metadata: null
      }
    }
  };

  // POST запрос на tRPC endpoint создания ивента
  const response = await api.post(
    'http://localhost:3000/api/trpc/eventTypesHeavy/create?batch=1',
    {
      data: input,
      headers: {
        "content-type": "application/json",
      },
    }
  );

  expect(response.ok()).toBeTruthy();

  const json = await response.json();
  console.log('TRPC Response:', JSON.stringify(json, null, 2));

  // Проверка, что вернулся slug который мы отправляли
  const event = json[0]?.result?.data?.json;
 
});
