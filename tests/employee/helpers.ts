import { Browser } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { EmployeeListPage } from '../../pages/employee/EmployeeListPage';
import { EmployeeFormPage, EmployeeData } from '../../pages/employee/EmployeeFormPage';
import { generateUniqueId } from '../../utils/test-data';

/**
 * Creates a unique employee for Phase 2/3 tab specifications.
 * Uses a new isolated browser context to avoid cross-contamination.
 */
export async function createEmployeeForTabSpecs(browser: Browser): Promise<{ fullName: string; uid: string }> {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const loginPage = new LoginPage(page);
    const listPage = new EmployeeListPage(page);
    const formPage = new EmployeeFormPage(page);

    await loginPage.goto();
    await loginPage.loginAsAdmin();
    await listPage.navigateTo();

    const uid = generateUniqueId();
    const fullName = `QA Tab Tester ${uid}`;
    
    const data: EmployeeData = {
        prefix: 'Mr',
        fullName: fullName,
        username: `qatest_${uid.toLowerCase()}`,
        email: `qatest_${uid.toLowerCase()}@example.com`,
        contactNo: '0310000000',
        dateOfBirth: '05-05-1995',
        gender: 'Male',
        maritalStatus: 'Sin',
        company: 'Pukat',
        department: 'IT',
        designation: 'Ass',
        officeShift: 'Defa',
        holidayCalendar: 'Fed',
        workingStatus: 'Acti',
        password: 'Password123!',
        confirmPassword: 'Password123!',
    };

    await listPage.addEmployeeButton.click();
    await formPage.createEmployee(data);
    
    // Ensure the employee is successfully created before returning
    await formPage.createdHeading.waitFor({ state: 'visible', timeout: 15000 });

    await context.close();

    return { fullName, uid };
}
