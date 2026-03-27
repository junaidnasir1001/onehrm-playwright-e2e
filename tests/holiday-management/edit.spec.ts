import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HolidayCalendarPage, HolidayCalendarData } from '../../pages/holiday-management/HolidayCalendarPage';
import { generateUniqueId } from '../../utils/test-data';

test.describe('Holiday Management - Edit Calendar', () => {
    let loginPage: LoginPage;
    let calendarPage: HolidayCalendarPage;
    let oldCalendarName: string;

    test.beforeAll(async ({ browser }) => {
        // Create prerequisite data using a fresh context
        const context = await browser.newContext();
        const page = await context.newPage();
        
        loginPage = new LoginPage(page);
        calendarPage = new HolidayCalendarPage(page);

        oldCalendarName = `QA_Edit_Old_${generateUniqueId()}`;
        const data: HolidayCalendarData = {
            name: oldCalendarName,
            country: 'pak',
            state: 'Punjab',
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

    test('admin can edit an existing holiday calendar', async ({ page }) => {
        // Arrange
        const newCalendarName = `QA_Edit_New_${generateUniqueId()}`;
        await calendarPage.navigateTo();

        // Act
        await calendarPage.editCalendar(oldCalendarName, newCalendarName);

        // Assert — success message
        await expect(calendarPage.updatedHeading).toBeVisible();

        // Assert — new name appears in list
        await expect(calendarPage.getCalendarCell(newCalendarName)).toBeVisible();
    });
});
