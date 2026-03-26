import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('admin can login with valid credentials', async ({ page }) => {
        // Arrange
        const username = process.env.TEST_ADMIN_EMAIL!;
        const password = process.env.TEST_ADMIN_PASSWORD!;

        // Act
        await loginPage.login(username, password);

        // Assert
        await loginPage.verifyLoginSuccess();
    });
});
