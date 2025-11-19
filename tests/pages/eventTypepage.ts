import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class EvenTypePage extends BasePage {
  readonly TitleEventTypes: Locator;
 

  constructor(page: Page) {
    super(page, 'http://localhost:3000/event-types'); 
    this.TitleEventTypes = page.getByRole('heading', { name: 'Event Types' })
  }


}