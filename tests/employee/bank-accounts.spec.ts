import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { EmployeeListPage } from '../../pages/employee/EmployeeListPage';
import { BankAccountsTab } from '../../pages/employee/tabs/BankAccountsTab';
import { createEmployeeForTabSpecs } from './helpers';

test.describe('Employee - Bank Accounts Tab', () => {
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

    test('admin can link a primary bank account to the employee', async ({ page }) => {
        const tab = new BankAccountsTab(page);

        await tab.navigateToTab();
        
        await tab.createBankAccount({
            accountTitle: 'Meezan Bank Ltd',
            accountNumber: '42343432001',
            bankSearch: 'CIM', // CIMB/etc
            bankCode: '432432',
            bankBranch: 'Lahore Model Town',
            swiftCode: '34545345XX',
            isPrimary: true
        });

        await expect(tab.createdHeading).toBeVisible();
    });
});
