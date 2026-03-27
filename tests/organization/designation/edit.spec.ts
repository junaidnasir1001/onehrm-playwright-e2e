import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { DesignationPage, DesignationData } from '../../../pages/organization/DesignationPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Designation - Edit', () => {
    let loginPage: LoginPage;
    let designationPage: DesignationPage;
    let oldDesignationName: string;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        
        loginPage = new LoginPage(page);
        designationPage = new DesignationPage(page);

        oldDesignationName = `Edit Old_${generateUniqueId()}`;
        const data: DesignationData = {
            name: oldDesignationName,
            companySearch: 'Pukat Technologies',
            departmentSearch: 'Qua',
            shortCode: Math.floor(1000 + Math.random() * 9000).toString()
        };

        await loginPage.goto();
        await loginPage.loginAsAdmin();
        await designationPage.navigateTo();
        await designationPage.createDesignation(data);
        await expect(designationPage.createdHeading).toBeVisible();
        await context.close();
    });

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        designationPage = new DesignationPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
    });

    test('admin can edit an existing designation', async () => {
        // Arrange
        const newDesignationName = `Edit New_${generateUniqueId()}`;
        await designationPage.navigateTo();

        // Act
        const updates: Partial<DesignationData> = {
            name: newDesignationName,
            shortCode: Math.floor(1000 + Math.random() * 9000).toString()
        };
        await designationPage.editDesignation(oldDesignationName, updates);

        // Assert
        await expect(designationPage.updatedHeading).toBeVisible();
        await expect(designationPage.getDesignationRow(newDesignationName)).toBeVisible();
    });
});
