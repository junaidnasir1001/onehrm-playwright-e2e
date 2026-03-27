import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { DepartmentPage, DepartmentData } from '../../../pages/organization/DepartmentPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Department - Create', () => {
    let loginPage: LoginPage;
    let departmentPage: DepartmentPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        departmentPage = new DepartmentPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
        await departmentPage.navigateTo();
    });

    test('admin can create a new department', async () => {
        // Arrange
        const departmentName = `Dev QA_${generateUniqueId()}`;
        const data: DepartmentData = {
            name: departmentName,
            companySearch: 'acube' // Relies on 'acube' pre-existing
        };

        // Act
        await departmentPage.createDepartment(data);

        // Assert — success message
        await expect(departmentPage.createdHeading).toBeVisible();

        // Assert — new row visibility
        await expect(departmentPage.getDepartmentRow(departmentName)).toBeVisible();
    });
});
