import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { OfficeShiftsPage, OfficeShiftData } from '../../pages/OfficeShiftsPage';
import { generateUniqueId } from '../../utils/test-data';

test.describe('Office Shifts - Create', () => {
    let loginPage: LoginPage;
    let shiftsPage: OfficeShiftsPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        shiftsPage = new OfficeShiftsPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
        await shiftsPage.navigateTo();
    });

    test('admin can create a new office shift', async () => {
        // Arrange
        const shiftName = `Shift QA_${generateUniqueId()}`;
        const defaultTimes = { in: '09:00', out: '18:00', break: '30' };
        
        const data: OfficeShiftData = {
            name: shiftName,
            companySearch: 'Pukat',
            typeSearch: 'full Day',
            timezoneSearch: 'asia/kara',
            relaxationTime: '20',
            days: {
                monday: defaultTimes,
                tuesday: defaultTimes,
                wednesday: defaultTimes,
                thursday: defaultTimes,
                friday: defaultTimes
            }
        };

        // Act
        // Maps dynamic pre-configured variables testing implicit dependency hooks avoiding beforeAll clutter
        await shiftsPage.createShift(data);

        // Assert — success message
        await expect(shiftsPage.createdHeading).toBeVisible();

        // Assert — new row visibility
        await expect(shiftsPage.getShiftRow(shiftName)).toBeVisible();
    });
});
