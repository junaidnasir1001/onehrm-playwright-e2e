import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { LeavePoliciesPage } from '../../../pages/leave-management/leave-policies/LeavePoliciesPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Leave Policies - Create', () => {
    let loginPage: LoginPage;
    let policiesPage: LeavePoliciesPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        policiesPage = new LeavePoliciesPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
    });

    test('admin can orchestrate a comprehensive leave policy for employees explicitly bounding calendar limits natively', async () => {
        // Arrange
        await policiesPage.navigateTo();
        
        const uid = generateUniqueId();
        const targetRemarks = `Create Setup Target ${uid}`;
        
        // Translating the raw generic nth-child toggles from codegen trace into numeric index array representations
        const policyPayload = {
            companySearch: 'Pukat',
            employeeSearch: 'QA Hassan',
            startDate: '06-04-2026',
            endDate: '30-04-2026',
            leavePairing: '5',
            remarks: targetRemarks
        };

        // Act
        await policiesPage.createPolicy(policyPayload);

        // Assert — System strictly commits policy globally
        await expect(policiesPage.createdHeading).toBeVisible();
        
        // Assert — Verifying structural UI bindings map effectively natively
        await policiesPage.searchPolicy(targetRemarks);
        await expect(policiesPage.getPolicyRowCell(targetRemarks)).toBeVisible();
    });
});
