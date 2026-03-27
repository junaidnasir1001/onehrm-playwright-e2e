import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HolidayCalendarPage, HolidayCalendarData } from '../../pages/holiday-management/HolidayCalendarPage';
import { generateUniqueId } from '../../utils/test-data';

test.describe('Holiday Management - Create Calendar', () => {
    let loginPage: LoginPage;
    let calendarPage: HolidayCalendarPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        calendarPage = new HolidayCalendarPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
        await calendarPage.navigateTo();
    });

    test('admin can create a new holiday calendar', async ({ page }) => {
        // Arrange
        const calendarName = `QA_Calendar_${generateUniqueId()}`;
        const data: HolidayCalendarData = {
            name: calendarName,
            country: 'pak',
            state: 'Punjab',
            timezone: 'asia/karachi',
            description: 'Automated test calendar run',
            weekendDays: ['Saturday', 'Sunday']
        };

        // Act
        await calendarPage.createCalendar(data);

        // Assert — success message
        await expect(calendarPage.createdHeading).toBeVisible();

        // Assert — appears in list
        await expect(calendarPage.getCalendarCell(calendarName)).toBeVisible();
    });
});
