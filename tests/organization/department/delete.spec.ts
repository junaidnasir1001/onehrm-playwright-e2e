import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { DepartmentPage, DepartmentData } from '../../../pages/organization/DepartmentPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Department - Delete', () => {
    let loginPage: LoginPage;
    let departmentPage: DepartmentPage;
    let departmentToDelete: string;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        
        loginPage = new LoginPage(page);
        departmentPage = new DepartmentPage(page);

        departmentToDelete = `Delete Dept_${generateUniqueId()}`;
        const data: DepartmentData = {
            name: departmentToDelete,
            companySearch: 'acube'
        };

        await loginPage.goto();
        await loginPage.loginAsAdmin();
        await departmentPage.navigateTo();
        await departmentPage.createDepartment(data);
        await expect(departmentPage.createdHeading).toBeVisible();
        await context.close();
    });

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        departmentPage = new DepartmentPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
    });

    test('admin can delete an existing department', async () => {
        // Arrange
        await departmentPage.navigateTo();

        // Act
        await departmentPage.deleteDepartment(departmentToDelete);

        // Assert
        await expect(departmentPage.deletedHeading).toBeVisible();
        await expect(departmentPage.getDepartmentRow(departmentToDelete)).not.toBeVisible();
    });
});
