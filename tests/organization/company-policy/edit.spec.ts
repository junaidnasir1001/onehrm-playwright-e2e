import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { CompanyPolicyPage, CompanyPolicyData } from '../../../pages/organization/CompanyPolicyPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Company Policy - Edit', () => {
    let loginPage: LoginPage;
    let policyPage: CompanyPolicyPage;
    let oldTitle: string;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();

        loginPage = new LoginPage(page);
        policyPage = new CompanyPolicyPage(page);

        oldTitle = `Edit Policy Old_${generateUniqueId()}`;
        const data: CompanyPolicyData = {
            title: oldTitle,
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

    test('admin can edit an existing company policy', async () => {
        // Arrange
        const newTitle = `Edit Policy New_${generateUniqueId()}`;
        await policyPage.navigateTo();

        // Act
        const updates: Partial<CompanyPolicyData> = {
            title: newTitle,
            description: 'policy change dynamically verified'
        };
        await policyPage.editCompanyPolicy(oldTitle, updates);

        // Assert
        await expect(policyPage.updatedHeading).toBeVisible();
        await expect(policyPage.getPolicyRow(newTitle)).toBeVisible();
    });
});
