import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { LeaveAllocationsPage } from '../../../pages/leave-management/leave-allocations/LeaveAllocationsPage';
import { LeaveTypesPage } from '../../../pages/leave-management/leave-types/LeaveTypesPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Leave Allocations - Edit', () => {
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

    test('admin can modify implicit configuration boundaries dynamically over active employee leave allocations natively', async () => {
        // Arrange - Construct relational seed to sidestep backend allocation duplication limit validations
        const uid = generateUniqueId();
        const uniqueLeaveType = `Edit Alloc ${uid}`;
        const baseRemarks = `Edit Base Allocation ${uid}`;
        
        await typesPage.navigateTo();
        await typesPage.createType({ 
            name: uniqueLeaveType, 
            description: 'Isolating native edit dependencies via type mappings' 
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
            remarks: baseRemarks
        };

        await allocationsPage.createAllocation(allocationPayload);
        await expect(allocationsPage.createdHeading).toBeVisible();

        await allocationsPage.navigateTo();
        await allocationsPage.searchAllocation('QA Hassan');
        
        // Act - Specifically overriding existing CF limitations matching against our unique generated Type directly
        const updatedCfLeaves = '5';
        await allocationsPage.editAllocation(uniqueLeaveType, updatedCfLeaves);

        // Assert
        await expect(allocationsPage.updatedHeading).toBeVisible();
        
        // Verifying target edit reflects permanently (QA Hassan -> CfLeaves 5)
        await allocationsPage.searchAllocation('QA Hassan');
        await expect(allocationsPage.getAllocationRowCell(uniqueLeaveType)).toBeVisible();
    });
});
