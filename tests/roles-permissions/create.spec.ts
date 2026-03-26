import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { RolesPermissionsPage } from '../../pages/roles-permissions/RolesPermissionsPage';
import { generateUniqueId } from '../../utils/test-data';

test.describe('Roles & Permissions - Create', () => {
    let loginPage: LoginPage;
    let rolesPage: RolesPermissionsPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        rolesPage = new RolesPermissionsPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
        await rolesPage.navigateTo();
    });

    test('admin can create a new role with name and description', async ({ page }) => {
        // Arrange — unique name prevents duplicate-role failures on re-run
        const roleName = `QA_Role_${generateUniqueId()}`;
        const description = 'QA test role';

        // Act
        await rolesPage.createRole(roleName, description);

        // Assert — success toast is visible
        await expect(rolesPage.successHeading).toBeVisible();

        // Assert — new role appears in the list
        await expect(rolesPage.getRoleCell(roleName)).toBeVisible();
    });
});
