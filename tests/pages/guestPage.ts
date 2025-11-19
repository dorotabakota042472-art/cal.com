import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class GuestPage extends BasePage {

   readonly date: Locator;
   readonly time: Locator;
   readonly name: Locator;
   readonly email: Locator;
   readonly submit: Locator;
   readonly title: Locator;
   readonly titleScheduled: Locator;

  constructor(guestPage: Page) {
    super(guestPage);
    this.date = guestPage.getByRole('button', { name: '21' })
    this.time = guestPage.getByRole('button', { name: '10:00am' })
    this.name = guestPage.getByRole('textbox', { name: 'Your name*' })
    this.email = guestPage.getByRole('textbox', { name: 'Email address *' })
    this.submit = guestPage.getByTestId('confirm-book-button')
    this.titleScheduled = guestPage.locator('text=This meeting is scheduled')

    
  }
  async login(username: string, password: string ) {
    //await this.username.fill(username);
   // await this.password.fill(password);
   // await this.loginButton.click();
  }
}

