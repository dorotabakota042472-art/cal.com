import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly url: string;

  constructor(page: Page, url: string = '') {
    this.page = page;
    this.url = url;
  }

  // Навигация на страницу
  async navigate() {
    await this.page.goto(this.url);
  }

  // Получить текущий URL
  async getUrl(): Promise<string> {
    return this.page.url();
  }

}
