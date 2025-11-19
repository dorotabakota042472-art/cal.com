
import { Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ForgotPassword } from '../pages/forgotPassword';

export class Application {
  readonly loginPage: LoginPage;
  readonly forgotPassword: ForgotPassword;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.forgotPassword = new ForgotPassword(page);
  }
}
