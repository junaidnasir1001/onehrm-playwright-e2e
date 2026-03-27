import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { CompanyPolicyPage, CompanyPolicyData } from '../../../pages/organization/CompanyPolicyPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Company Policy - Delete', () => {
    let loginPage: LoginPage;
    let policyPage: CompanyPolicyPage;
    let titleToDelete: string;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();

        loginPage = new LoginPage(page);
        policyPage = new CompanyPolicyPage(page);

        titleToDelete = `Delete Policy_${generateUniqueId()}`;
        const data: CompanyPolicyData = {
            title: titleToDelete,
            description: 'policy creation execution tests abc',
            companySearch: 'puk',
            policyTypeSearch: 'Pu',
            attachmentPath: 'utils/dummy.png'
        };

        await loginPage.goto();
        await loginPage.loginAsAdmin();
        await policyPage.navigateTo();
        await policyPage.createCompanyPolicy(data);
        await expect(policyPage.createdHeading).toBeVisible();
        await context.close();
    });

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        policyPage = new CompanyPolicyPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
    });

    test('admin can delete an existing company policy', async () => {
        // Arrange
        await policyPage.navigateTo();

        // Act
        await policyPage.deleteCompanyPolicy(titleToDelete);

        // Assert
        await expect(policyPage.deletedHeading).toBeVisible();
        await expect(policyPage.getPolicyRow(titleToDelete)).not.toBeVisible();
    });
});
