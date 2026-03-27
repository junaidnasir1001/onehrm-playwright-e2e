import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { HolidaysPage, HolidayData } from '../../../pages/holiday-management/HolidaysPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Holidays - Delete', () => {
    let loginPage: LoginPage;
    let holidaysPage: HolidaysPage;
    let holidayToDelete: string;

    test.beforeAll(async ({ browser }) => {
        // Create prerequisite data using a fresh context
        const context = await browser.newContext();
        const page = await context.newPage();
        
        loginPage = new LoginPage(page);
        holidaysPage = new HolidaysPage(page);

        holidayToDelete = `QA_Delete_${generateUniqueId()}`;
        const data: HolidayData = {
            calendarSearch: 'Federal',
            name: holidayToDelete,
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

    test('admin can delete an existing holiday', async ({ page }) => {
        // Arrange
        await holidaysPage.navigateTo();

        // Act
        await holidaysPage.deleteHoliday(holidayToDelete);

        // Assert — success message
        await expect(holidaysPage.deletedHeading).toBeVisible();

        // Assert — no longer in the list
        await expect(holidaysPage.getHolidayCell(holidayToDelete)).not.toBeVisible();
    });
});
