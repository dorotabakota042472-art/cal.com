import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.getByRole('textbox', { name: 'john.doe@example.com' });
    this.password = page.getByTestId('input-field');
    this.loginButton = page.getByRole('button', { name: 'Sign in' });
  }

 async enterUserName(username: string){
    await this.username.fill(username)

  }
  async enterPassword(password: string){
    await this.password.fill(password)
  }
  async clickLoginButton(){
    await this.loginButton.click()
  }
}
