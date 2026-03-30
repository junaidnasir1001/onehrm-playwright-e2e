import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { OfficeShiftsPage, OfficeShiftData } from '../../pages/OfficeShiftsPage';
import { generateUniqueId } from '../../utils/test-data';

test.describe('Office Shifts - Delete', () => {
    let loginPage: LoginPage;
    let shiftsPage: OfficeShiftsPage;
    let shiftToDelete: string;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        
        loginPage = new LoginPage(page);
        shiftsPage = new OfficeShiftsPage(page);

        shiftToDelete = `Shift Delete_${generateUniqueId()}`;
        const defaultTimes = { in: '09:00', out: '18:00', break: '30' };
        
        const data: OfficeShiftData = {
            name: shiftToDelete,
            companySearch: 'Pukat',
            typeSearch: 'full Day',
            timezoneSearch: 'asia/kara',
            relaxationTime: '20',
            days: {
                monday: defaultTimes,
                friday: defaultTimes
            }
        };

        await loginPage.goto();
        await loginPage.loginAsAdmin();
        await shiftsPage.navigateTo();
        await shiftsPage.createShift(data);
        await expect(shiftsPage.createdHeading).toBeVisible();
        await context.close();
    });

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        shiftsPage = new OfficeShiftsPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
    });

    test('admin can delete an existing office shift', async () => {
        // Arrange
        await shiftsPage.navigateTo();

        // Act
        await shiftsPage.deleteShift(shiftToDelete);

        // Assert
        await expect(shiftsPage.deletedHeading).toBeVisible();
        await expect(shiftsPage.getShiftRow(shiftToDelete)).not.toBeVisible();
    });
});
