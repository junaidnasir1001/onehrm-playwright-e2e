import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { EmployeeListPage } from '../../pages/employee/EmployeeListPage';
import { DocumentsTab } from '../../pages/employee/tabs/DocumentsTab';
import { createEmployeeForTabSpecs } from './helpers';

test.describe('Employee - Documents Tab', () => {
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

    test('admin can upload a verification document to employee profile', async ({ page }) => {
        const docTab = new DocumentsTab(page);

        await docTab.navigateToTab();
        
        await docTab.createDocument({
            typeSearch: 'Vis', // Visa
            title: 'Visa Application',
            documentFilePath: 'utils/dummy.png',
            documentNo: 'V-5435324234',
            // Omit issue/expiry: naive day "1" + day "28" picks can yield expiry before issue → 422
            description: 'Approved Business Visa copy',
            statusSearch: 'Appr', // Approved
        });

        await expect(docTab.createdHeading).toBeVisible();
    });
});
