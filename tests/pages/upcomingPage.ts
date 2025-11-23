import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

const URL = process.env.CALCOM_BASE_URL

export class Upcoming extends BasePage {
  readonly bookings: Locator;
  readonly upcoming: Locator;
  readonly dropDownOpentio: Locator;
  readonly selector: Locator;

  constructor(page: Page) {
    super(page, `${URL}/bookings/upcoming`); 

    this.bookings = page.locator('[data-test-id="bookings"]')
    this.upcoming = page.locator('[data-test-id="upcoming"]')   
    this.dropDownOpentio = page.getByTestId('select-option-100')
    this.selector = page.locator('[data-testid="select-control"]');
  }

  async selectPaginationSizeSelector() {
  // Прокрутить к дропадауну "10"
  await this.selector.scrollIntoViewIfNeeded({ timeout: 10000 });

  // Кликнуть по слоту с текстом "10"
  await this.page.locator('div').filter({ hasText: /^10$/ }).nth(1).click();

  // Выбрать опцию в селекте
  await this.dropDownOpentio.click();
}

}
