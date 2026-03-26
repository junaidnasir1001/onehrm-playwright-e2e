import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * LoginPage - Handles authentication for OneHRM application
 * URL: /login
 */
export class LoginPage extends BasePage {
    // Locators
    private readonly usernameInput = this.page.getByRole('textbox', { name: 'Username' });
    private readonly passwordInput = this.page.getByRole('textbox', { name: 'Password' });
    private readonly loginButton = this.page.getByRole('button', { name: 'Login' });

    constructor(page: Page) {
        super(page);
    }

    /**
     * Navigate to the login page
     */
    async goto(): Promise<void> {
        await super.goto('/login');
        await this.waitForPageLoad();
    }

    /**
     * Perform login with provided credentials
     */
    async login(username: string, password: string): Promise<void> {
        await this.fill(this.usernameInput, username);
        await this.fill(this.passwordInput, password);
        await this.click(this.loginButton);
        await this.waitForPageLoad();
    }

    /**
     * Login using credentials from environment variables
     */
    async loginAsAdmin(): Promise<void> {
        const username = process.env.TEST_ADMIN_EMAIL;
        const password = process.env.TEST_ADMIN_PASSWORD;

        if (!username || !password) {
            throw new Error('TEST_ADMIN_EMAIL and TEST_ADMIN_PASSWORD must be set in .env');
        }

        await this.login(username, password);
    }

    /**
     * Verify login was successful by checking the welcome heading
     */
    async verifyLoginSuccess(): Promise<void> {
        await this.expectVisible(this.page.getByRole('heading', { name: /Welcome/i }));
    }
}
