import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HolidayCalendarPage, HolidayCalendarData } from '../../pages/holiday-management/HolidayCalendarPage';
import { generateUniqueId } from '../../utils/test-data';

test.describe('Holiday Management - Delete Calendar', () => {
    let loginPage: LoginPage;
    let calendarPage: HolidayCalendarPage;
    let calendarToDelete: string;

    test.beforeAll(async ({ browser }) => {
        // Create prerequisite data using a fresh context
        const context = await browser.newContext();
        const page = await context.newPage();
        
        loginPage = new LoginPage(page);
        calendarPage = new HolidayCalendarPage(page);

        calendarToDelete = `QA_Delete_${generateUniqueId()}`;
        const data: HolidayCalendarData = {
            name: calendarToDelete,
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

    test('admin can delete an existing holiday calendar', async ({ page }) => {
        // Arrange
        await calendarPage.navigateTo();

        // Act
        await calendarPage.deleteCalendar(calendarToDelete);

        // Assert — success message
        await expect(calendarPage.deletedHeading).toBeVisible();

        // Assert — no longer in the list (using not.toBeVisible())
        await expect(calendarPage.getCalendarCell(calendarToDelete)).not.toBeVisible();
    });
});
