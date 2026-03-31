import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { EmployeeListPage } from '../../pages/employee/EmployeeListPage';
import { EmergencyContactsTab } from '../../pages/employee/tabs/EmergencyContactsTab';
import { createEmployeeForTabSpecs } from './helpers';

test.describe('Employee - Emergency Contacts Tab', () => {
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

    test('admin can create an emergency contact for an employee', async ({ page }) => {
        const defaultTab = new EmergencyContactsTab(page);

        await defaultTab.navigateToTab();
        
        await defaultTab.createEmergencyContact({
            relationSearch: 'Pare', // Parent
            name: 'Shahid',
            phone: '4234324234',
            email: 'shahid@example.com',
            address: 'Lahore, PK',
            isPrimary: true
        });

        await expect(defaultTab.createdHeading).toBeVisible();
    });
});
