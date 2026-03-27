import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { DepartmentPage, DepartmentData } from '../../../pages/organization/DepartmentPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Department - Edit', () => {
    let loginPage: LoginPage;
    let departmentPage: DepartmentPage;
    let oldDepartmentName: string;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        
        loginPage = new LoginPage(page);
        departmentPage = new DepartmentPage(page);

        oldDepartmentName = `Edit Old_${generateUniqueId()}`;
        const data: DepartmentData = {
            name: oldDepartmentName,
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

    test('admin can edit an existing department', async () => {
        // Arrange
        const newDepartmentName = `Edit New_${generateUniqueId()}`;
        await departmentPage.navigateTo();

        // Act
        const updates: Partial<DepartmentData> = {
            name: newDepartmentName
        };
        await departmentPage.editDepartment(oldDepartmentName, updates);

        // Assert
        await expect(departmentPage.updatedHeading).toBeVisible();
        await expect(departmentPage.getDepartmentRow(newDepartmentName)).toBeVisible();
    });
});
