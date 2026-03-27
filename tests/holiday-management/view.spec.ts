import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HolidayCalendarPage, HolidayCalendarData } from '../../pages/holiday-management/HolidayCalendarPage';
import { generateUniqueId } from '../../utils/test-data';

test.describe('Holiday Management - View Calendar', () => {
    let loginPage: LoginPage;
    let calendarPage: HolidayCalendarPage;
    let calendarName: string;

    test.beforeAll(async ({ browser }) => {
        // Create prerequisite data using a fresh context
        const context = await browser.newContext();
        const page = await context.newPage();

        loginPage = new LoginPage(page);
        calendarPage = new HolidayCalendarPage(page);

        calendarName = `QA_View_${generateUniqueId()}`;
        const data: HolidayCalendarData = {
            name: calendarName,
            country: 'pak',
            state: 'Sindh',
            timezone: 'asia/karachi',
            weekendDays: ['Sunday']
        };

        await loginPage.goto();
        await loginPage.loginAsAdmin();
        await calendarPage.navigateTo();
        await calendarPage.createCalendar(data);
        await expect(calendarPage.createdHeading).toBeVisible();
        await context.close();
    });

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        calendarPage = new HolidayCalendarPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
    });

    test('admin can view an existing holiday calendar in the list', async ({ page }) => {
        // Arrange
        await calendarPage.navigateTo();

        // Act & Assert — Calendar appears in the list
        await expect(calendarPage.getCalendarCell(calendarName)).toBeVisible();
    });
});
