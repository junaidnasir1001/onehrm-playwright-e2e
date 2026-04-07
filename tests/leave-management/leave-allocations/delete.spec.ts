import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { LeaveAllocationsPage } from '../../../pages/leave-management/leave-allocations/LeaveAllocationsPage';
import { LeaveTypesPage } from '../../../pages/leave-management/leave-types/LeaveTypesPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Leave Allocations - Delete', () => {
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

    test('admin can purposefully revoke configured leave allocations practically seamlessly unlinking UI representations', async () => {
        // Arrange - Fully decoupled synthetic footprint completely avoiding multi-allocation system drops
        const uid = generateUniqueId();
        const uniqueLeaveType = `Delete Alloc ${uid}`;
        const targetRemarks = `Delete Target Allocation ${uid}`;
        
        await typesPage.navigateTo();
        await typesPage.createType({ 
            name: uniqueLeaveType, 
            description: 'Decoupling delete trace boundaries permanently' 
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

        await allocationsPage.createAllocation(allocationPayload);
        await expect(allocationsPage.createdHeading).toBeVisible();

        await allocationsPage.navigateTo();
        await allocationsPage.searchAllocation('QA Hassan');

        // Act - Explicit UI teardown targeting the unique Leave Type string match row explicitly
        await allocationsPage.deleteAllocation(uniqueLeaveType);

        // Assert
        await expect(allocationsPage.deletedHeading).toBeVisible();
        
        // Assert - UI Grid effectively uncoupled relying on universal column mapping exclusively
        await allocationsPage.searchAllocation('QA Hassan');
        await expect(allocationsPage.getAllocationRowCell(uniqueLeaveType)).toBeHidden();
    });
});
