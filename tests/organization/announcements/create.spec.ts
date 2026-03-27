import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { AnnouncementsPage, AnnouncementData } from '../../../pages/organization/AnnouncementsPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Announcements - Create', () => {
    let loginPage: LoginPage;
    let announcementsPage: AnnouncementsPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        announcementsPage = new AnnouncementsPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
        await announcementsPage.navigateTo();
    });

    test('admin can create a new announcement', async () => {
        // Arrange
        const title = `Announce QA_${generateUniqueId()}`;
        const data: AnnouncementData = {
            title: title,
            companySearch: 'Pukat Technologies',
            departmentSearch: 'IT',
            startDate: '2025-01-01',
            endDate: '2025-01-05',
            description: 'new leave announcement testing',
            announcementSearch: 'pub'
        };

        // Act
        // Directly maps explicit framework selections avoiding foreign key overlaps
        await announcementsPage.createAnnouncement(data);

        // Assert — success message
        await expect(announcementsPage.createdHeading).toBeVisible();

        // Assert — new row visibility
        await expect(announcementsPage.getAnnouncementRow(title)).toBeVisible();
    });
});
