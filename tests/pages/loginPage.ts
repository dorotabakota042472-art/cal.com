import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page, 'http://host.docker.internal:3000/auth/login'); 
    this.username = page.getByRole('textbox', { name: 'john.doe@example.com' });
    this.password = page.getByTestId('input-field');
    this.loginButton = page.getByRole('button', { name: 'Sign in' });
  }

  async enterUserName(username: string) {
    await this.username.fill(username);
  }

  async enterPassword(password: string) {
    await this.password.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }
}
