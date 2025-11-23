import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

const URL = process.env.CALCOM_BASE_URL

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

  readonly advancedTab: Locator;
  readonly privateLinksCheck: Locator;
  readonly copyPriveteLink: Locator;
  readonly updateЕventtype: Locator;
  readonly addToCalendar: Locator;


  constructor(page: Page) {
    super(page, `${URL}/event-types`); 

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

    //проблемная линка 
    this.advancedTab = page.getByTestId('vertical-tab-event_advanced_tab_title')
    this.privateLinksCheck = page.getByTestId('multiplePrivateLinksCheck')
    this.copyPriveteLink = page.locator('.group.whitespace-nowrap.inline-flex.items-center.font-medium.relative.rounded-\\[10px\\].disabled\\:cursor-not-allowed.gap-1.text-subtle.border.border-transparent.enabled\\:hover\\:bg-subtle.enabled\\:hover\\:text-emphasis.enabled\\:hover\\:border-subtle.hover\\:border.disabled\\:opacity-30.focus-visible\\:bg-subtle.focus-visible\\:outline-none.focus-visible\\:ring-0.focus-visible\\:border-subtle.focus-visible\\:shadow-button-outline-gray-focused.enabled\\:active\\:shadow-outline-gray-active.transition-shadow.duration-200.h-7.px-2')
    this.updateЕventtype = page.getByTestId('update-eventtype')
    this.addToCalendar = page.getByText('Add to calendar');
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
    
    await this.advancedTab.click({ timeout: 10000 });
    await this.advancedTab.click({ timeout: 10000 });
    await new Promise(res => setTimeout(res, 5000));
    await this.privateLinksCheck.waitFor({ state: 'visible', timeout: 10000 });
    await this.privateLinksCheck.click({ timeout: 10000 });
    await this.copyPriveteLink.scrollIntoViewIfNeeded();
    await this.copyPriveteLink.click({ timeout: 10000 }); //копируем линку 
    await this.updateЕventtype.click(); // сохраняем
    await this.goBackButton.click({ timeout: 10000 });
  }

  async expectEventTypeExists(name: string) { // првоеряем что ивент есть 
    const event = this.page.locator(`text=${name}`).first();
    await expect(event).toBeVisible({ timeout: 10000 });
  }

   async checkeventPageUrl() {
    await expect(this.page).toHaveURL(`${URL}/event-types`);
  }
}
