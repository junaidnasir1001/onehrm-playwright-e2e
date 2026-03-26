import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { RolesPermissionsPage } from '../../pages/roles-permissions/RolesPermissionsPage';
import { generateUniqueId } from '../../utils/test-data';

test.describe('Roles & Permissions - Edit', () => {
    let loginPage: LoginPage;
    let rolesPage: RolesPermissionsPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        rolesPage = new RolesPermissionsPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
        await rolesPage.navigateTo();
    });

    test('admin can edit an existing role name', async ({ page }) => {
        // Arrange
        const targetRole = 'Supervisor';
        const newRoleName = `QA_Edited_${generateUniqueId()}`;

        // Act
        await rolesPage.openEditRoleModal(targetRole);
        await rolesPage.editRole(newRoleName);

        // Assert — success message is shown
        await expect(rolesPage.roleUpdatedHeading).toBeVisible();

        // Assert — updated role name appears in the list
        await expect(rolesPage.getRoleCell(newRoleName)).toBeVisible();
    });
});
