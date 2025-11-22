import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';


export class EvenTypePage extends BasePage {
  readonly TitleEventTypes: Locator;
  readonly eventTitle: Locator;
  readonly deleteButtons: Locator;
  readonly confirmDeleteButton: Locator;
  readonly newEventTypeButton: Locator;
  readonly quickChatInput: Locator;
  readonly continueButton: Locator;
  readonly goBackButton: Locator;
  readonly copyLink: Locator;

  constructor(page: Page) {
    super(page, 'https://app.cal.com/event-types'); 

    this.TitleEventTypes = page.getByRole('heading', { name: 'Event Types' });
    this.eventTitle = page.locator('text=NewChet'); 
    // Кнопки удаления всех event-types
    this.deleteButtons = page.locator('button.group[data-testid^="event-type-options-"]:visible');
    this.confirmDeleteButton = page.getByTestId('dialog-confirmation');

    // Создание нового event-type
    this.newEventTypeButton = page.getByTestId('new-event-type');
    this.quickChatInput = page.getByTestId('event-type-quick-chat');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.goBackButton = page.getByTestId('go-back-button');

    this.copyLink = page.getByRole('button').filter({ hasText: /^$/ }).nth(1);//копируепм линку 
  }


  async navigate() {
    await this.page.goto(this.url);
    await expect(this.page).toHaveURL(this.url);
  }

  async deleteAllEventTypes() {// удаляем все ивенты (чистим) 
    const count = await this.deleteButtons.count();//собираем количество ивентов 

    for (let i = 0; i < count; i++) {
      await this.deleteButtons.nth(0).click(); // берём всегда первый
      await this.page.getByRole('button', { name: 'Delete' }).last().click(); 
      await this.confirmDeleteButton.click();
    }
  }

  async createEventType(name: string) { // создание ивента 
    await this.newEventTypeButton.click();
    await this.quickChatInput.fill(name);
    await this.continueButton.click();
    await this.goBackButton.click({ timeout: 10000 });
  }

  async expectEventTypeExists(name: string) { // првоеряем что ивент есть 
    const event = this.page.locator(`text=${name}`).first();
    await expect(event).toBeVisible({ timeout: 10000 });
  }

   async checkeventPageUrl() {
    await expect(this.page).toHaveURL('https://app.cal.com/event-types');
  }
}
