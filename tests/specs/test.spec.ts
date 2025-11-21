// tests/event-types.spec.ts
import { test, expect } from '@playwright/test';
import { Application } from '../pages/aplication';



let application: Application;




test('создание event-types через UI с API_KEY', async ({ page }) => {
     application = new Application(page);
     await page.goto('https://app.cal.com/event-types')
     await expect(page).toHaveURL('https://app.cal.com/event-types');
 //await application.evenTypePage.navigate();
});
