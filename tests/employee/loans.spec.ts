import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { EmployeeListPage } from '../../pages/employee/EmployeeListPage';
import { LoansTab } from '../../pages/employee/tabs/LoansTab';
import { SalarySetupTab } from '../../pages/employee/tabs/SalarySetupTab';
import { createEmployeeForTabSpecs } from './helpers';

test.describe('Employee - Loans Tab', () => {
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

    test('admin can assign a loan schedule to an employee', async ({ page }) => {
        // Pre-requisite: Salary Setup is required before Loans can be mapped
        const salarySetup = new SalarySetupTab(page);
        await salarySetup.navigateToTab();
        await salarySetup.createSalaryBasic({
            salaryTypeSearch: 'Mon',
            basicSalary: '4000',
            paymentTypeSearch: 'cash'
        });

        // Act: Proceed with Loans
        const loansTab = new LoansTab(page);

        await loansTab.navigateToTab();
        
        await loansTab.createSalaryLoan({
            loanAmount: '1000',
            reason: 'Computer Purchase',
            comment: 'Approved by HR'
        });

        await expect(loansTab.createdHeading).toBeVisible();
    });
});
