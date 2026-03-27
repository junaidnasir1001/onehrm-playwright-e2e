import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { HolidaysPage, HolidayData } from '../../../pages/holiday-management/HolidaysPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Holidays - Create', () => {
    let loginPage: LoginPage;
    let holidaysPage: HolidaysPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        holidaysPage = new HolidaysPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
        await holidaysPage.navigateTo();
    });

    test('admin can create a new holiday', async ({ page }) => {
        // Arrange
        const holidayName = `Eid QA_${generateUniqueId()}`;
        const data: HolidayData = {
            calendarSearch: 'Federal',
            name: holidayName,
            typeSearch: 'Pub',
            startDateDay: '18',
            endDateDay: '18',
            description: 'Automated test holiday',
            toggleStatus: true // Toggle the status switch
        };

        // Act
        await holidaysPage.createHoliday(data);

        // Assert — success message
        await expect(holidaysPage.createdHeading).toBeVisible();

        // Assert — appears in list
        await expect(holidaysPage.getHolidayCell(holidayName)).toBeVisible();
    });
});
