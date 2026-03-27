import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { BranchPage, BranchData } from '../../../pages/organization/BranchPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Branch - Create', () => {
    let loginPage: LoginPage;
    let branchPage: BranchPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        branchPage = new BranchPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
        await branchPage.navigateTo();
    });

    test('admin can create a new branch', async () => {
        // Arrange
        const branchName = `Branch QA_${generateUniqueId()}`;
        const data: BranchData = {
            name: branchName,
            address: 'sadiq center',
            companySearch: 'acube' // Relies on 'acube' pre-existing
        };

        // Act
        await branchPage.createBranch(data);

        // Assert — success message
        await expect(branchPage.createdHeading).toBeVisible();

        // Assert — new row visibility
        await expect(branchPage.getBranchRow(branchName)).toBeVisible();
    });
});
