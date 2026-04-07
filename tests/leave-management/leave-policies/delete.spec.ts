import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { LeavePoliciesPage } from '../../../pages/leave-management/leave-policies/LeavePoliciesPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Leave Policies - Delete', () => {
    let loginPage: LoginPage;
    let policiesPage: LeavePoliciesPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        policiesPage = new LeavePoliciesPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
    });

    test('admin can gracefully revoke comprehensive leave policies permanently destroying layout mappings structurally', async () => {
        // Arrange - Autonomous record synthesis
        await policiesPage.navigateTo();
        
        const uid = generateUniqueId();
        const targetRemarks = `Delete Target Policy ${uid}`;
        
        const policyPayload = {
            companySearch: 'Pukat',
            employeeSearch: 'QA Hassan',
            startDate: '06-04-2026',
            endDate: '30-04-2026',
            leavePairing: '5',
            remarks: targetRemarks
        };

        await policiesPage.createPolicy(policyPayload);
        await expect(policiesPage.createdHeading).toBeVisible();

        await policiesPage.navigateTo();
        await policiesPage.searchPolicy(targetRemarks);

        // Act
        await policiesPage.deletePolicy(targetRemarks);

        // Assert — System verification
        await expect(policiesPage.deletedHeading).toBeVisible();
        
        // Assert — UI Grid detached
        await policiesPage.searchPolicy(targetRemarks);
        await expect(policiesPage.getPolicyRowCell(targetRemarks)).toBeHidden();
    });
});
