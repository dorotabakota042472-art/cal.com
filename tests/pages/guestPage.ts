import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';


const now = new Date();

export class GuestPage extends BasePage {

   readonly date: Locator;
   readonly name: Locator;
   readonly email: Locator;
   readonly submit: Locator;
   readonly titleScheduled: Locator;
  readonly firstAvailableTime: Locator;

  constructor(guestPage: Page) {
    super(guestPage);
    this.date = guestPage.getByRole('button', { name: `25` })//${now.getDate()}
    this.name = guestPage.getByRole('textbox', { name: 'Your name*' }) 
    this.email = guestPage.getByRole('textbox', { name: 'Email address *' })
    this.submit = guestPage.getByTestId('confirm-book-button')
    this.titleScheduled = guestPage.locator('text=This meeting is scheduled')
    this.firstAvailableTime = this.page.getByTestId('time').filter({ hasNot: this.page.locator('[data-disabled="true"]') }).first();

  }

   async bookAsGuest(name: string, email: string) {
    await this.name.fill(name);
    await this.email.fill(email);
    await this.submit.click();
  
  }

  
  
}

