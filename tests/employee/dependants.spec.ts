import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { EmployeeListPage } from '../../pages/employee/EmployeeListPage';
import { DependantsTab } from '../../pages/employee/tabs/DependantsTab';
import { createEmployeeForTabSpecs } from './helpers';

test.describe('Employee - Dependants Tab', () => {
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

    test('admin can assign a dependant profile to an employee', async ({ page }) => {
        const depTab = new DependantsTab(page);

        await depTab.navigateToTab();
        
        await depTab.createDependant({
            name: 'Ali H',
            dateOfBirth: '01-01-1998',
            genderSearch: 'Male',
            maritalStatusSearch: 'Sin', // Single
            bloodGroupSearch: 'A',
            relationSearch: 'Chi', // Child
            contactNo: '42354325432',
            nationalitySearch: 'Mal', // Malaysia
            city: 'Lahore',
            icNumber: '343423423-11',
        });

        await expect(depTab.createdHeading).toBeVisible();
    });
});
