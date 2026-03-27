import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { BranchPage, BranchData } from '../../../pages/organization/BranchPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Branch - Edit', () => {
    let loginPage: LoginPage;
    let branchPage: BranchPage;
    let oldBranchName: string;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        
        loginPage = new LoginPage(page);
        branchPage = new BranchPage(page);

        oldBranchName = `Edit Old_${generateUniqueId()}`;
        const data: BranchData = {
            name: oldBranchName,
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

    test('admin can edit an existing branch', async () => {
        // Arrange
        const newBranchName = `Edit New_${generateUniqueId()}`;
        await branchPage.navigateTo();

        // Act
        const updates: Partial<BranchData> = {
            name: newBranchName
        };
        await branchPage.editBranch(oldBranchName, updates);

        // Assert
        await expect(branchPage.updatedHeading).toBeVisible();
        await expect(branchPage.getBranchRow(newBranchName)).toBeVisible();
    });
});
