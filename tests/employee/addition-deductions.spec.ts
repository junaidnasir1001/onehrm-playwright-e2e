import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { EmployeeListPage } from '../../pages/employee/EmployeeListPage';
import { AdditionDeductionsTab } from '../../pages/employee/tabs/AdditionDeductionsTab';
import { SalarySetupTab } from '../../pages/employee/tabs/SalarySetupTab';
import { createEmployeeForTabSpecs } from './helpers';

test.describe('Employee - Addition Deductions Tab', () => {
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

    test('admin can add a salary addition/deduction to an employee', async ({ page }) => {
        // Pre-requisite: Salary Setup is required
        const salarySetup = new SalarySetupTab(page);
        await salarySetup.navigateToTab();
        await salarySetup.createSalaryBasic({
            salaryTypeSearch: 'Mon',
            basicSalary: '4000',
            paymentTypeSearch: 'cash'
        });

        // Act: Proceed with Addition/Deduction
        const adTab = new AdditionDeductionsTab(page);

        await adTab.navigateToTab();
        
        await adTab.createAdditionDeduction({
            payrollSearch: '2026',           // e.g. "2026 Jan" (Matches part of the string safely)
            transactionTypeSearch: 'add',   // Addition
            reasonTypeSearch: 'othe',       // Other
            amount: '100',
            reason: 'Performance Bonus'
        });

        await expect(adTab.createdHeading).toBeVisible();
    });
});
