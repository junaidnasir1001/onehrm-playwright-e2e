import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { AnnouncementsPage, AnnouncementData } from '../../../pages/organization/AnnouncementsPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Announcements - Delete', () => {
    let loginPage: LoginPage;
    let announcementsPage: AnnouncementsPage;
    let titleToDelete: string;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        
        loginPage = new LoginPage(page);
        announcementsPage = new AnnouncementsPage(page);

        titleToDelete = `Delete Announce_${generateUniqueId()}`;
        const data: AnnouncementData = {
            title: titleToDelete,
            companySearch: 'Pukat Technologies',
            departmentSearch: 'IT',
            startDate: '2025-01-01',
            endDate: '2025-01-05',
            description: 'new leave announcement testing',
            announcementSearch: 'pub'
        };

        await loginPage.goto();
        await loginPage.loginAsAdmin();
        await announcementsPage.navigateTo();
        await announcementsPage.createAnnouncement(data);
        await expect(announcementsPage.createdHeading).toBeVisible();
        await context.close();
    });

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        announcementsPage = new AnnouncementsPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
    });

    test('admin can delete an existing announcement', async () => {
        // Arrange
        await announcementsPage.navigateTo();

        // Act
        await announcementsPage.deleteAnnouncement(titleToDelete);

        // Assert
        await expect(announcementsPage.deletedHeading).toBeVisible();
        await expect(announcementsPage.getAnnouncementRow(titleToDelete)).not.toBeVisible();
    });
});
