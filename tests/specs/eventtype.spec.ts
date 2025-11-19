import { test, expect } from '@playwright/test';
import { Application } from '../pages/aplication';

let application: Application;

test.beforeEach(async ({ page }) => {
    application = new Application(page);
    await application.evenTypePage.navigate();
    await expect(page).toHaveURL('http://localhost:3000/event-types');
  });

test('создание event-types', async ({ page }) => {



  const buttons = await page.locator('button.group[data-testid^="event-type-options-"]:visible');
 // await buttons.first().waitFor({ state: 'visible', timeout: 10000 });

  const count = await buttons.count();

  await console.log(count +"cautn")

  if(count >0 ){
  for (let i = 0; i < count; i++) {
    await console.log(i +"i")
    await page.locator('button.group[data-testid^="event-type-options-"]:visible').click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.getByTestId('dialog-confirmation').click();
    }
  }
  
   await page.getByTestId('new-event-type').click();
  // await page.getByTestId('dialog-title').click();
  // await page.getByTestId('event-type-quick-chat').click();
  // await page.getByTestId('event-type-quick-chat').fill('NewChet');
  // await page.getByRole('spinbutton', { name: 'Duration' }).click();
  // await page.getByRole('spinbutton', { name: 'Duration' }).fill('20');
  // await page.getByRole('button', { name: 'Continue' }).click();
  // await page.locator('.css-tj5bde-Svg').click();
  // await page.getByTestId('location-select-item-attendeeInPerson').locator('div').filter({ hasText: /^In Person \(Attendee Address\)$/ }).click();
  // await page.getByTestId('update-eventtype').click();
  // await page.goto('http://localhost:3000/event-types/1160?tabName=setup');
  // await page.getByTestId('go-back-button').click();
  // await page.locator('div').filter({ hasText: /^NewChet\/Artem1\/newchet20m$/ }).nth(1).click();
  // await page.getByRole('heading', { name: 'NewChet' }).click();
});
