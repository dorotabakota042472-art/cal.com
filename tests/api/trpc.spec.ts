import { test, expect, request } from '@playwright/test';
const URL = process.env.CALCOM_BASE_URL

test('tRPC: get event types', async () => {
  const api = await request.newContext({ storageState: 'state/auth.json',}); // Создаём новый контекст API-запросов с сохранённой сессией 
  
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

  const response = await api.get(`${URL}/api/trpc/eventTypes/getEventTypesFromGroup`, //делаем запрос на получение ивентов 
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

  console.log("STATUS:", response.status());// смотрим status code 
  const json = await response.json();
  console.log("RESPONSE:", JSON.stringify(json));//превращает объект в строку
  
  const eventTypes = json[0].result.data.json.eventTypes;
  console.log("Count:", eventTypes.length);
  expect(response.ok()).toBeTruthy();// проверяем что запрос успешен
});


test('tRPC: create event type', async ({}) => {

  const api = await request.newContext({
    storageState: 'state/auth.json', // путь auth.json
  });

 
  const input = {
    "0": {
      json: {
        title: "Автотест Ивент"+ Date.now(),
        slug: "auto-event-" + Date.now(),
        description: "description" + Date.now(),
        length: 15,
        metadata: null
      }
    }
  };

  
  const response = await api.post( `${URL}/api/trpc/eventTypesHeavy/create?batch=1`, // POST запрос на tRPC endpoint создания ивента
    {
      data: input,
      headers: {
        "content-type": "application/json",
      },
    }
  );

  expect(response.ok()).toBeTruthy();

  const json = await response.json();
  console.log('TRPC Response:', JSON.stringify(json));

  const event = json[0]?.result?.data?.json;

  expect(event.eventType.title).toContain("Автотест");
  expect(event.eventType.slug).toContain("event");
  expect(event.eventType.description).toContain("description");
 
});
