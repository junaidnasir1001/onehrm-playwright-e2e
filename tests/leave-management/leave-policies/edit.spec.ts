import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { LeavePoliciesPage } from '../../../pages/leave-management/leave-policies/LeavePoliciesPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Leave Policies - Edit', () => {
    let loginPage: LoginPage;
    let policiesPage: LeavePoliciesPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        policiesPage = new LeavePoliciesPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
    });

    test('admin can modify implicit configuration boundaries dynamically over active employee leave policies natively', async () => {
        // Arrange - Generate completely isolated baseline to prevent Data Depletion
        await policiesPage.navigateTo();
        
        const uid = generateUniqueId();
        const baseRemarks = `Edit Base Policy ${uid}`;
        const updatedRemarks = `Edit Target Policy ${uid}`;
        
        const policyPayload = {
            companySearch: 'Pukat',
            employeeSearch: 'QA Hassan',
            startDate: '06-04-2026',
            endDate: '30-04-2026',
            leavePairing: '5',
            remarks: baseRemarks
        };

        // Pre-Flight Synthetic Seeding
        await policiesPage.createPolicy(policyPayload);
        await expect(policiesPage.createdHeading).toBeVisible();

        await policiesPage.navigateTo();
        await policiesPage.searchPolicy(baseRemarks);
        
        // Act - Explicit mutation leveraging specific toggles tracked via code-gen explicitly
        await policiesPage.editPolicy(baseRemarks, updatedRemarks, 10); // Index 10 correlates to UI config target logged earlier

        // Assert
        await expect(policiesPage.updatedHeading).toBeVisible();
        
        await policiesPage.searchPolicy(updatedRemarks);
        await expect(policiesPage.getPolicyRowCell(updatedRemarks)).toBeVisible();
    });
});
