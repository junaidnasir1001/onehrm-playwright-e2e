import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { BranchPage, BranchData } from '../../../pages/organization/BranchPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Branch - Delete', () => {
    let loginPage: LoginPage;
    let branchPage: BranchPage;
    let branchToDelete: string;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        
        loginPage = new LoginPage(page);
        branchPage = new BranchPage(page);

        branchToDelete = `Delete Branch_${generateUniqueId()}`;
        const data: BranchData = {
            name: branchToDelete,
            address: 'sadiq center',
            companySearch: 'acube'
        };

        await loginPage.goto();
        await loginPage.loginAsAdmin();
        await branchPage.navigateTo();
        await branchPage.createBranch(data);
        await expect(branchPage.createdHeading).toBeVisible();
        await context.close();
    });

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        branchPage = new BranchPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
    });

    test('admin can delete an existing branch', async () => {
        // Arrange
        await branchPage.navigateTo();

        // Act
        await branchPage.deleteBranch(branchToDelete);

        // Assert
        await expect(branchPage.deletedHeading).toBeVisible();
        await expect(branchPage.getBranchRow(branchToDelete)).not.toBeVisible();
    });
});
