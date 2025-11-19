
import { Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ForgotPassword } from '../pages/forgotPassword';
import { Signup } from '../pages/signup';
import { EvenTypePage } from '../pages/eventTypepage';

export class Application {
  readonly loginPage: LoginPage;
  readonly forgotPassword: ForgotPassword;
  readonly signup: Signup;
  readonly evenTypePage: EvenTypePage;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.forgotPassword = new ForgotPassword(page);
    this.signup = new Signup(page);
    this.evenTypePage = new EvenTypePage(page);
  }
}
