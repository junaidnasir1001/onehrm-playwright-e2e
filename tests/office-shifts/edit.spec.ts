import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { OfficeShiftsPage, OfficeShiftData } from '../../pages/OfficeShiftsPage';
import { generateUniqueId } from '../../utils/test-data';

test.describe('Office Shifts - Edit', () => {
    let loginPage: LoginPage;
    let shiftsPage: OfficeShiftsPage;
    let oldShiftName: string;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        
        loginPage = new LoginPage(page);
        shiftsPage = new OfficeShiftsPage(page);

        oldShiftName = `Shift Old_${generateUniqueId()}`;
        const defaultTimes = { in: '09:00', out: '18:00', break: '30' };
        
        const data: OfficeShiftData = {
            name: oldShiftName,
            companySearch: 'Pukat',
            typeSearch: 'full Day',
            timezoneSearch: 'asia/kara',
            relaxationTime: '20',
            days: {
                monday: defaultTimes,
                tuesday: defaultTimes,
                wednesday: defaultTimes
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

    test('admin can edit an existing office shift', async () => {
        // Arrange
        const newShiftName = `Shift New_${generateUniqueId()}`;
        await shiftsPage.navigateTo();

        // Act
        const updates: Partial<OfficeShiftData> = {
            name: newShiftName,
            relaxationTime: '30'
        };
        await shiftsPage.editShift(oldShiftName, updates);

        // Assert
        await expect(shiftsPage.updatedHeading).toBeVisible();
        await expect(shiftsPage.getShiftRow(newShiftName)).toBeVisible();
    });
});
