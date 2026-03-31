import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { EmployeeListPage } from '../../pages/employee/EmployeeListPage';
import { WorkExperiencesTab } from '../../pages/employee/tabs/WorkExperiencesTab';
import { createEmployeeForTabSpecs } from './helpers';

test.describe('Employee - Work Experiences Tab', () => {
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

    test('admin can assign a previous work experience to an employee', async ({ page }) => {
        const tab = new WorkExperiencesTab(page);

        await tab.navigateToTab();
        
        await tab.createWorkExperience({
            companyName: 'Acube Tech',
            position: 'Developer',
            toYear: '01-03-2005',
            description: 'Core Systems architecture'
        });

        await expect(tab.createdHeading).toBeVisible();
    });
});
