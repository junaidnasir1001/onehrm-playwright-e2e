import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { EmployeeListPage } from '../../pages/employee/EmployeeListPage';
import { EmployeeFormPage, EmployeeData } from '../../pages/employee/EmployeeFormPage';
import { generateUniqueId } from '../../utils/test-data';

test.describe('Employee - Create', () => {
    let loginPage: LoginPage;
    let listPage: EmployeeListPage;
    let formPage: EmployeeFormPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        listPage = new EmployeeListPage(page);
        formPage = new EmployeeFormPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
        await listPage.navigateTo();
    });

    test('admin can create a new employee with basic details', async () => {
        // Arrange
        const uid = generateUniqueId();
        const data: EmployeeData = {
            prefix: 'Mr',
            fullName: `QA Employee ${uid}`,
            username: `qa_emp_${uid.toLowerCase()}`,
            email: `qa_emp_${uid.toLowerCase()}@example.com`,
            contactNo: '0311234567',
            dateOfBirth: '01-01-1990',
            gender: 'Male',
            maritalStatus: 'Sin',
            company: 'Pukat',
            department: 'IT',
            designation: 'Ass',
            officeShift: 'Defa',
            holidayCalendar: 'Fed',
            workingStatus: 'Acti',
            password: '12345678',
            confirmPassword: '12345678',
        };

        // Act
        await listPage.addEmployeeButton.click();
        await formPage.createEmployee(data);

        // Assert — success heading
        await expect(formPage.createdHeading).toBeVisible();

        // Assert — employee appears in the list after searching
        await listPage.navigateToListFromProfile();
        await listPage.page.waitForLoadState('networkidle');
        await listPage.searchBox.fill(data.fullName);
        await expect(listPage['page'].getByRole('link', { name: data.fullName })).toBeVisible({ timeout: 15000 });
    });
});
