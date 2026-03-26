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

        // Assert — table should still be visible and contain known roles
        await expect(rolesPage.getRoleCell('HR Admin')).toBeVisible();
    });

    test('admin can view HR Admin role in the roles list', async ({ page }) => {
        // Arrange
        await rolesPage.navigateTo();

        // Assert
        await expect(rolesPage.getRoleCell('HR Admin')).toBeVisible();
    });
});
