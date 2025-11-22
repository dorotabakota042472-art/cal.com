import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';


export class Signup extends BasePage {
  readonly signupUsernamefield: Locator;
  readonly signupEmailfield: Locator;
  readonly signupPasswordfield: Locator;
  readonly signupCookieContentCheckbox: Locator;
  readonly checkYourEmail: Locator;
  readonly submitButton: Locator;
  readonly continueWithEmailButton: Locator;

  constructor(page: Page) {
    super(page, 'https://app.cal.com/auth/login');  //http://localhost:3000/auth/login   http://host.docker.internal:3000/auth/login https://app.cal.com/auth/login
      this.signupUsernamefield = page.getByTestId('signup-usernamefield')
      this.signupEmailfield = page.getByTestId('signup-emailfield')
      this.signupPasswordfield = page.getByTestId('signup-passwordfield')
      this.signupCookieContentCheckbox = page.getByTestId('signup-cookie-content-checkbox')
      this.checkYourEmail = page.locator('text=Check your email')
      this.submitButton = page.getByTestId('signup-submit-button')
      this.continueWithEmailButton = page.getByTestId('continue-with-email-button')
  }
  
   async signup(username: string, password: string , email: string) {
    await this.signupUsernamefield.fill(username);
    await this.signupPasswordfield.fill(password);
    await this.signupEmailfield.fill(email);
    await this.signupCookieContentCheckbox.click();
  }
}
