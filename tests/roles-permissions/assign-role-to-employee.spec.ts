import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { RolesPermissionsPage } from '../../pages/roles-permissions/RolesPermissionsPage';
import { createEmployeeForTabSpecs } from '../employee/helpers';
import { generateUniqueId } from '../../utils/test-data';

test.describe('Roles & Permissions - Assign Role to Employee', () => {
    let loginPage: LoginPage;
    let rolesPage: RolesPermissionsPage;
    let targetEmployeeName: string;

    test.beforeAll(async ({ browser }) => {
        // Autonomously spawn an employee out-of-band to guarantee existence in dropdowns
        const emp = await createEmployeeForTabSpecs(browser);
        targetEmployeeName = emp.fullName;
    });

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        rolesPage = new RolesPermissionsPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
        await rolesPage.navigateTo();
    });

    test('admin can assign a role to an employee', async ({ page }) => {
        // Arrange
        const uid = generateUniqueId();
        const targetRole = `QA Role ${uid}`;
        
        // Dynamically spawn the target Role so it forcefully populates at the top of Page 1
        await rolesPage.createRole(targetRole, 'Dynamically created role for assignment test');
        await expect(rolesPage.successHeading).toBeVisible();
        
        // Refresh mapping state
        await rolesPage.navigateTo();

        // Act
        await rolesPage.openAssignRoleModal(targetRole);
        await rolesPage.selectEmployee(targetEmployeeName, targetEmployeeName);

        await rolesPage.submitAssignRole();

        // Assert — success message is shown
        await expect(rolesPage.roleUpdatedHeading).toBeVisible();

        // Assert — employee now appears assigned to the role in the list rendering matrix
        await expect(rolesPage.getAssignedEmployee(targetEmployeeName)).toBeVisible();
    });
});
