import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { RolesPermissionsPage } from '../../pages/roles-permissions/RolesPermissionsPage';

test.describe('Roles & Permissions - Assign Role to Employee', () => {
    let loginPage: LoginPage;
    let rolesPage: RolesPermissionsPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        rolesPage = new RolesPermissionsPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
        await rolesPage.navigateTo();
    });

    test('admin can assign a role to an employee', async ({ page }) => {
        // Arrange
        const targetRole = 'Supervisor';
        const searchTerm = 'Test';
        const employeeName = 'Test Employee';

        // Act
        await rolesPage.openAssignRoleModal(targetRole);
        await rolesPage.selectEmployee(searchTerm, employeeName);

        await rolesPage.submitAssignRole();

        // Assert — success message is shown
        await expect(rolesPage.roleUpdatedHeading).toBeVisible();

        // Assert — employee now appears assigned to the role in the list
        await expect(rolesPage.getAssignedEmployee(employeeName)).toBeVisible();
    });
});
