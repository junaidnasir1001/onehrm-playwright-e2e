import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { EmployeeListPage } from '../../pages/employee/EmployeeListPage';
import { OvertimeTab } from '../../pages/employee/tabs/OvertimeTab';
import { SalarySetupTab } from '../../pages/employee/tabs/SalarySetupTab';
import { createEmployeeForTabSpecs } from './helpers';

test.describe('Employee - Overtime Tab', () => {
    let targetEmployeeName: string;

    test.beforeAll(async ({ browser }) => {
        const emp = await createEmployeeForTabSpecs(browser);
        targetEmployeeName = emp.fullName;
    });

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const listPage = new EmployeeListPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
        
        await listPage.navigateTo();
        await listPage.openEmployee(targetEmployeeName, targetEmployeeName);
    });

    test('admin can log overtime hours for an employee', async ({ page }) => {
        // Pre-requisite: Salary Setup is required before Overtime can be logged
        const salarySetup = new SalarySetupTab(page);
        await salarySetup.navigateToTab();
        await salarySetup.createSalaryBasic({
            salaryTypeSearch: 'Mon',
            basicSalary: '4000',
            paymentTypeSearch: 'cash'
        });

        // Act: Proceed with Overtime mapping
        const overtimeTab = new OvertimeTab(page);

        await overtimeTab.navigateToTab();
        
        await overtimeTab.createOvertime({
            payrollSearch: '2026',         // e.g. "2026 Jan"
            dayTypeSearch: 'Res',          // "Rest Day"
            requestedStart: '09:00',
            requestedEnd: '15:00',
            approvedStart: '10:00',
            approvedEnd: '12:00',
            hours: '2',
            description: 'Database Maintenance',
            remarks: 'Approved by PM',
            statusSearch: 'Pen'            // "Pending"
        });

        await expect(overtimeTab.createdHeading).toBeVisible();
    });
});
