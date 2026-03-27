import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { CompanyPolicyPage, CompanyPolicyData } from '../../../pages/organization/CompanyPolicyPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Company Policy - Create', () => {
    let loginPage: LoginPage;
    let policyPage: CompanyPolicyPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        policyPage = new CompanyPolicyPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
        await policyPage.navigateTo();
    });

    test('admin can create a new company policy', async () => {
        // Arrange
        const title = `Policy QA_${generateUniqueId()}`;
        const data: CompanyPolicyData = {
            title: title,
            description: 'policy creation execution tests abc',
            companySearch: 'puk',
            policyTypeSearch: 'Pu',
            attachmentPath: 'utils/dummy.png'
        };

        // Act
        // Maps dynamic pre-configured variables utilizing direct upload attachments
        await policyPage.createCompanyPolicy(data);

        // Assert — success message
        await expect(policyPage.createdHeading).toBeVisible();

        // Assert — new row visibility
        await expect(policyPage.getPolicyRow(title)).toBeVisible();
    });
});
