import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { HolidaysPage, HolidayData } from '../../../pages/holiday-management/HolidaysPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Holidays - View', () => {
    let loginPage: LoginPage;
    let holidaysPage: HolidaysPage;
    let holidayName: string;

    test.beforeAll(async ({ browser }) => {
        // Create prerequisite data using a fresh context
        const context = await browser.newContext();
        const page = await context.newPage();
        
        loginPage = new LoginPage(page);
        holidaysPage = new HolidaysPage(page);

        holidayName = `QA_View_${generateUniqueId()}`;
        const data: HolidayData = {
            calendarSearch: 'Federal',
            name: holidayName,
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

    test('admin can view an existing holiday in the list', async ({ page }) => {
        // Arrange
        await holidaysPage.navigateTo();

        // Act & Assert — Holiday appears in the list
        await expect(holidaysPage.getHolidayCell(holidayName)).toBeVisible();
    });
});
