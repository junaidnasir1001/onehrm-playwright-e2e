import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { RolesPermissionsPage } from '../../pages/roles-permissions/RolesPermissionsPage';
import { generateUniqueId } from '../../utils/test-data';

test.describe('Roles & Permissions - Assign Permissions to a Role', () => {
    let loginPage: LoginPage;
    let rolesPage: RolesPermissionsPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        rolesPage = new RolesPermissionsPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
        await rolesPage.navigateTo();
    });

    test('admin can assign permissions to a role', async ({ page }) => {
        // Arrange
        const uid = generateUniqueId();
        const targetRole = `QA Permission Role ${uid}`;
        const permissions = [
            'Organization',
            'Attendances',
            'Employee List',
            'Awards',
            'Travels',
            'Transfers',
        ];

        // Dynamically spawn the target Role so it forcefully populates at the top of Page 1
        await rolesPage.createRole(targetRole, 'Dynamically created role for permission assignment test');
        await expect(rolesPage.successHeading).toBeVisible();
        await rolesPage.navigateTo(); // Refresh mapping state

        // Act — open permissions panel and toggle each permission
        await rolesPage.openPermissionsPanel(targetRole);
        await rolesPage.togglePermissions(permissions);
        await rolesPage.savePermissions();

        // Assert — permissions saved successfully
        await expect(rolesPage.permissionsUpdatedHeading).toBeVisible();
    });
});
