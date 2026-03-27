import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { HolidaysPage, HolidayData } from '../../../pages/holiday-management/HolidaysPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Holidays - Edit', () => {
    let loginPage: LoginPage;
    let holidaysPage: HolidaysPage;
    let oldHolidayName: string;

    test.beforeAll(async ({ browser }) => {
        // Create prerequisite data using a fresh context
        const context = await browser.newContext();
        const page = await context.newPage();
        
        loginPage = new LoginPage(page);
        holidaysPage = new HolidaysPage(page);

        oldHolidayName = `QA_Edit_Old_${generateUniqueId()}`;
        const data: HolidayData = {
            calendarSearch: 'Federal',
            name: oldHolidayName,
            typeSearch: 'Pub',
            startDateDay: '18',
            endDateDay: '18'
        };

        await loginPage.goto();
        await loginPage.loginAsAdmin();
        await holidaysPage.navigateTo();
        await holidaysPage.createHoliday(data);
        await expect(holidaysPage.createdHeading).toBeVisible();
        await context.close();
    });

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        holidaysPage = new HolidaysPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
    });

    test('admin can edit an existing holiday', async ({ page }) => {
        // Arrange
        const newHolidayName = `QA_Edit_New_${generateUniqueId()}`;
        await holidaysPage.navigateTo();

        // Act
        await holidaysPage.editHoliday(oldHolidayName, { name: newHolidayName });

        // Assert — success message
        await expect(holidaysPage.updatedHeading).toBeVisible();

        // Assert — new name appears in list
        await expect(holidaysPage.getHolidayCell(newHolidayName)).toBeVisible();
    });
});
