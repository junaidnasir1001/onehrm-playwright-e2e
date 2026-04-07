import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { LeaveApplicationsPage } from '../../../pages/leave-management/leave-applications/LeaveApplicationsPage';
import { LeaveAllocationsPage } from '../../../pages/leave-management/leave-allocations/LeaveAllocationsPage';
import { LeaveTypesPage } from '../../../pages/leave-management/leave-types/LeaveTypesPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Leave Applications - Delete', () => {
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

    test('admin can purposely withdraw leave applications securely detaching specific grid targets completely natively', async () => {
        const uid = generateUniqueId();
        const targetType = `Del Type ${uid}`;
        const targetReason = `Delete App Trace ${uid}`;
        
        const rDate = '22-05-2026';

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
            leaveReason: targetReason,
            statusSearch: 'Approved'
        });
        await expect(appsPage.createdHeading).toBeVisible();

        await appsPage.navigateTo();
        await appsPage.searchApplication('QA Hassan');

        // Act - Sever entirely natively isolating specifically seeded teardowns absolutely
        await appsPage.deleteApplication(targetType);

        // Assert - Establish hidden status definitively inside structural boundaries
        await appsPage.searchApplication('QA Hassan');
        await expect(appsPage.getApplicationRowCell(targetType)).toBeHidden();
    });
});
