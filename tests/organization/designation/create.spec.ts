import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { DesignationPage, DesignationData } from '../../../pages/organization/DesignationPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Designation - Create', () => {
    let loginPage: LoginPage;
    let designationPage: DesignationPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        designationPage = new DesignationPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
        await designationPage.navigateTo();
    });

    test('admin can create a new designation', async () => {
        // Arrange
        const designationName = `Desig QA_${generateUniqueId()}`;
        const data: DesignationData = {
            name: designationName,
            companySearch: 'Pukat Technologies',
            departmentSearch: 'Qua',
            shortCode: Math.floor(1000 + Math.random() * 9000).toString()
        };

        // Act
        // Because the Department dropdown populates conditionally upon selecting Company, 
        // Playwright will organically wait for the list items to appear when selectDepartmentButton is triggered.
        await designationPage.createDesignation(data);

        // Assert — success message
        await expect(designationPage.createdHeading).toBeVisible();

        // Assert — new row visibility
        await expect(designationPage.getDesignationRow(designationName)).toBeVisible();
    });
});
