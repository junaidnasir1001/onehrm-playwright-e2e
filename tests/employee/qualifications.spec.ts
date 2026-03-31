import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { EmployeeListPage } from '../../pages/employee/EmployeeListPage';
import { QualificationsTab } from '../../pages/employee/tabs/QualificationsTab';
import { createEmployeeForTabSpecs } from './helpers';

test.describe('Employee - Qualifications Tab', () => {
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

    test('admin can link an educational qualification to the employee', async ({ page }) => {
        const tab = new QualificationsTab(page);

        await tab.navigateToTab();
        
        await tab.createQualification({
            institute: 'RFG University',
            educationLevelSearch: 'Pri', // Primary / Principle
            fromTo: '2019 - 2023',
            majorSubject: 'Computer Science',
            professionalSkill: 'Fullstack Dev',
            description: 'Bachelors in Software Systems'
        });

        await expect(tab.createdHeading).toBeVisible();
    });
});
