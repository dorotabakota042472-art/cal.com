import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';
import { expect } from '@playwright/test';


export class LoginPage extends BasePage {
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly passwordValidationError: Locator;
  readonly emailValidationError: Locator;
  readonly incorrectEmailPassword: Locator;
  readonly titleWelcomeBack: Locator;
  readonly titleEmile: Locator;
  readonly titlePassword: Locator;
  readonly titleHaveAccount: Locator;
  readonly titleSignIn: Locator;
  readonly enterAValidEmail: Locator;
  readonly ShowPassword: Locator;
  readonly hideeye: Locator;
  readonly showeye: Locator;
  readonly Hidepassword: Locator;
   readonly forgot: Locator;

  constructor(page: Page) {
    super(page, 'https://app.cal.com/auth/login');  //http://localhost:3000/auth/login   http://host.docker.internal:3000/auth/login https://app.cal.com/auth/login
    this.username = page.getByRole('textbox', { name: 'john.doe@example.com' });
    this.password = page.getByTestId('input-field');
    this.loginButton = page.getByTestId('login-form').getByRole('button', { name: 'Sign in' });
    this.passwordValidationError = page.locator('text=This field is required').nth(1)
    this.emailValidationError = page.locator('text=This field is required').nth(0)
    this.incorrectEmailPassword = page.locator('text=Email or password is incorrect')

      this.titleWelcomeBack = page.locator('text=Welcome back')
      this.titleEmile = page.locator('text=Email address')
      this.titlePassword = page.locator('text=Password').nth(0)
      this.titleHaveAccount = page.locator('text=Don\'t have an account?')
      this.titleSignIn = page.locator('text=Sign in').nth(2)
      this.enterAValidEmail = page.locator('text=Please enter a valid email')
      this.ShowPassword = page.getByRole('button', { name: 'Show password' })
      this.Hidepassword = page.getByRole('button', { name: 'Hide password' })
      this.hideeye = page.getByRole('button', { name: 'Hide password' }).locator('use'); 
      this.showeye = page.getByRole('button', { name: 'Show password' }).locator('use'); 
      this.forgot = page.getByRole('link', { name: 'Forgot?' })
 
  }
  async login(username: string, password: string ) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async checkLoginPageUrl() {
    await expect(this.page).toHaveURL('https://app.cal.com/auth/login');
  }

}
