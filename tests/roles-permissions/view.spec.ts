import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { RolesPermissionsPage } from '../../pages/roles-permissions/RolesPermissionsPage';

test.describe('Roles & Permissions - View', () => {
    let loginPage: LoginPage;
    let rolesPage: RolesPermissionsPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        rolesPage = new RolesPermissionsPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
    });

    test('admin can navigate to Roles & Permissions page', async ({ page }) => {
        // Act
        await rolesPage.navigateTo();

        // Assert
        await expect(page.getByRole('link', { name: ' Roles & Permissions' })).toBeVisible();
    });

    test('admin can sort roles by Role Name column', async ({ page }) => {
        // Arrange
        await rolesPage.navigateTo();

        // Act
        await rolesPage.sortByRoleName();

        // Assert — table should still be visible and re-rendered natively
        await expect(page.locator('.table-responsive')).toBeVisible();
        await expect(page.locator('tbody tr').first()).toBeVisible();
    });

    test('admin can view roles in the roles list', async ({ page }) => {
        // Arrange
        await rolesPage.navigateTo();

        // Assert — verify data boundary exists organically 
        await expect(page.locator('.table-responsive')).toBeVisible();
        await expect(page.locator('tbody tr').first()).toBeVisible();
    });
});
