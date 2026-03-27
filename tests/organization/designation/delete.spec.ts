import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { DesignationPage, DesignationData } from '../../../pages/organization/DesignationPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Designation - Delete', () => {
    let loginPage: LoginPage;
    let designationPage: DesignationPage;
    let designationToDelete: string;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        
        loginPage = new LoginPage(page);
        designationPage = new DesignationPage(page);

        designationToDelete = `Delete Desig_${generateUniqueId()}`;
        const data: DesignationData = {
            name: designationToDelete,
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

    test('admin can delete an existing designation', async () => {
        // Arrange
        await designationPage.navigateTo();

        // Act
        await designationPage.deleteDesignation(designationToDelete);

        // Assert
        await expect(designationPage.deletedHeading).toBeVisible();
        await expect(designationPage.getDesignationRow(designationToDelete)).not.toBeVisible();
    });
});
