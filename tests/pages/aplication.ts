
import { Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ForgotPassword } from '../pages/forgotPassword';
import { Signup } from '../pages/signup';

export class Application {
  readonly loginPage: LoginPage;
  readonly forgotPassword: ForgotPassword;
  readonly signup: Signup;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.forgotPassword = new ForgotPassword(page);
    this.signup = new Signup(page);
  }
}
