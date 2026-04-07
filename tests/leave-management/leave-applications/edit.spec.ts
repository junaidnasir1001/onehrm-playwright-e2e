import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { LeaveApplicationsPage } from '../../../pages/leave-management/leave-applications/LeaveApplicationsPage';
import { LeaveAllocationsPage } from '../../../pages/leave-management/leave-allocations/LeaveAllocationsPage';
import { LeaveTypesPage } from '../../../pages/leave-management/leave-types/LeaveTypesPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Leave Applications - Edit', () => {
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

    test('admin can gracefully modify leave application state asynchronously over legacy modal bindings natively', async () => {
        const uid = generateUniqueId();
        const targetType = `Edit Type ${uid}`;
        const baseReason = `Base App Reason ${uid}`;
        const targetReason = `Diff App Reason ${uid}`;
        
        const rDate = '28-05-2026';

        await typesPage.navigateTo();
        await typesPage.createType({ name: targetType, description: 'App Seed' });

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
            leaveReason: baseReason,
            statusSearch: 'Pending'
        });

        await appsPage.navigateTo();
        await appsPage.searchApplication('QA Hassan');
        
        // Act - Edit visible status bound to the physical grid output uniquely while injecting native dynamic variables
        await appsPage.editApplication(targetType, 'Approved', rDate);

        // Assert - Verify state is applied dynamically
        await appsPage.searchApplication('QA Hassan');
        const modifiedRow = appsPage.page.locator(`tr:has-text("${targetType}")`).first();
        await expect(modifiedRow).toContainText('Approved');

        // Teardown - Manually obliterate instance returning pristine boundaries for subsequent isolated sequences
        await appsPage.deleteApplication(targetType);
    });
});
