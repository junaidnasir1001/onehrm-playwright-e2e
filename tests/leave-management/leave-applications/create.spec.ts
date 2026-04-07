import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { LeaveApplicationsPage } from '../../../pages/leave-management/leave-applications/LeaveApplicationsPage';
import { LeaveAllocationsPage } from '../../../pages/leave-management/leave-allocations/LeaveAllocationsPage';
import { LeaveTypesPage } from '../../../pages/leave-management/leave-types/LeaveTypesPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Leave Applications - Create', () => {
    let loginPage: LoginPage;
    let appsPage: LeaveApplicationsPage;
    let allocPage: LeaveAllocationsPage;
    let typesPage: LeaveTypesPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        appsPage = new LeaveApplicationsPage(page);
        allocPage = new LeaveAllocationsPage(page);
        typesPage = new LeaveTypesPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
    });

    test('admin can effectively record employee leave applications directly bridging dependencies securely', async () => {
        const uid = generateUniqueId();
        const targetType = `App Type ${uid}`;
        const targetReason = `Create App ${uid}`;

        // Target specific active office shift boundaries preventing 'No Working Days' constraints natively
        const rDate = '20-05-2026';

        // 1. Synthesize Unique Leave Type permanently decoupling backend rules
        await typesPage.navigateTo();
        await typesPage.createType({ name: targetType, description: 'App Seed' });

        // 2. Synthesize Unique Leave Allocation directly tied to the new type natively provisioning balance
        await allocPage.navigateTo();
        await allocPage.createAllocation({
            companySearch: 'Pukat',
            departmentSearch: 'IT',
            employeeSearch: 'QA Hassan',
            leaveTypeSearch: targetType,
            startDate: rDate,
            endDate: rDate,
            totalLeaves: '10',
            remarks: 'App Seed Alloc'
        });

        // 3. Create Leave Application consuming manufactured dependencies flawlessly
        await appsPage.navigateTo();
        await appsPage.createApplication({
            companySearch: 'Pukat',
            departmentSearch: 'IT',
            employeeSearch: 'QA Hassan',
            leaveTypeSearch: targetType,
            startDate: rDate,
            endDate: rDate,
            approvedFrom: rDate,
            approvedTo: rDate,
            leaveDurationSearch: 'First',
            leaveReason: targetReason,
            statusSearch: 'Approved'
        });

        // Assert - Validate Grid explicitly guaranteeing accurate test representation
        await appsPage.searchApplication('QA Hassan');
        await expect(appsPage.getApplicationRowCell(targetType)).toBeVisible();

        // Teardown - Manually purge application preventing Employee-level calendar collisions for subsequent executions natively
        await appsPage.deleteApplication(targetType);
    });
});
