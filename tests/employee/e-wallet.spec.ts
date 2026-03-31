import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { EmployeeListPage } from '../../pages/employee/EmployeeListPage';
import { EWalletTab } from '../../pages/employee/tabs/EWalletTab';
import { createEmployeeForTabSpecs } from './helpers';

test.describe('Employee - E-Wallet Tab', () => {
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

    test('admin can assign a digital e-wallet parameter mapping for salary offset', async ({ page }) => {
        const tab = new EWalletTab(page);

        await tab.navigateToTab();
        
        await tab.createEWallet({
            walletId: '5254543X',
            mobileNumber: '435452441',
            startDate: true,
            endDate: true,
            paymentTypeSearch: 'bank',
            percentage: '2',
            isActive: true
        });

        await expect(tab.createdHeading).toBeVisible();
    });
});
