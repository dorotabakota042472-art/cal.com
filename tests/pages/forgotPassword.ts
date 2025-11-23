import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';
const URL = process.env.CALCOM_BASE_URL

export class ForgotPassword extends BasePage {
    readonly titleForgotPassword: Locator;
    readonly textboxEmail: Locator;
    readonly sendReset: Locator;
    readonly resetlinkSent: Locator;
    
  constructor(page: Page) {
    super(page, `${URL}/auth/login`); 
    this.titleForgotPassword = page.locator('text=Forgot Password?').nth(0)
    this.textboxEmail = page.getByRole('textbox', { name: 'john.doe@example.com' })
    this.sendReset = page.getByRole('button', { name: 'Send reset email' })
    this.resetlinkSent = page.locator('text=Reset link sent')
  }


}
