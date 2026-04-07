import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { LeaveAllocationsPage } from '../../../pages/leave-management/leave-allocations/LeaveAllocationsPage';
import { LeaveTypesPage } from '../../../pages/leave-management/leave-types/LeaveTypesPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Leave Allocations - Create', () => {
    let loginPage: LoginPage;
    let allocationsPage: LeaveAllocationsPage;
    let typesPage: LeaveTypesPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        allocationsPage = new LeaveAllocationsPage(page);
        typesPage = new LeaveTypesPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
    });

    test('admin can orchestrate comprehensive leave allocation boundaries securely bound to datagrid assertions', async () => {
        // Arrange - Generate a unique Leave Type first to completely bypass single-employee allocation constraints!
        const uid = generateUniqueId();
        const uniqueLeaveType = `Unique Alloc ${uid}`;
        const targetRemarks = `Create Allocation ${uid}`;
        
        await typesPage.navigateTo();
        await typesPage.createType({ 
            name: uniqueLeaveType, 
            description: 'Seeding prereq to prevent overlapping allocation logic rejections' 
        });

        await allocationsPage.navigateTo();
        
        const allocationPayload = {
            companySearch: 'Pukat',
            departmentSearch: 'IT',
            employeeSearch: 'QA Hassan',
            leaveTypeSearch: uniqueLeaveType,
            startDate: '01-04-2026',
            endDate: '30-04-2026',
            totalLeaves: '10',
            cfLeaves: '0',
            cfLeaveExpiry: '30-04-2026',
            remarks: targetRemarks
        };

        // Act
        await allocationsPage.createAllocation(allocationPayload);

        // Assert — System verification natively
        await expect(allocationsPage.createdHeading).toBeVisible();
        
        // Assert — Using Employee Name instead of Remarks (since Remarks aren't indexed), and asserting on the Unique Type
        await allocationsPage.searchAllocation('QA Hassan');
        await expect(allocationsPage.getAllocationRowCell(uniqueLeaveType)).toBeVisible();
    });
});
