import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { EmployeeListPage } from '../../pages/employee/EmployeeListPage';
import { SalarySetupTab } from '../../pages/employee/tabs/SalarySetupTab';
import { createEmployeeForTabSpecs } from './helpers';

test.describe('Employee - Salary Setup Tab', () => {
    let targetEmployeeName: string;

    // Seed the employee once for the entire file
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

    test('admin can attach basic salary and allowance to employee', async ({ page }) => {
        const salaryTab = new SalarySetupTab(page);

        await salaryTab.navigateToTab();
        
        await salaryTab.createSalaryBasic({
            salaryTypeSearch: 'Mon',       // Monthly
            basicSalary: '4000',
            paymentTypeSearch: 'cash',
            allowanceAmount: '100'
        });

        await expect(salaryTab.createdHeading).toBeVisible();
    });
});
