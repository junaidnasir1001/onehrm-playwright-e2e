import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { AnnouncementsPage, AnnouncementData } from '../../../pages/organization/AnnouncementsPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Announcements - Edit', () => {
    let loginPage: LoginPage;
    let announcementsPage: AnnouncementsPage;
    let oldTitle: string;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        
        loginPage = new LoginPage(page);
        announcementsPage = new AnnouncementsPage(page);

        oldTitle = `Edit Announce Old_${generateUniqueId()}`;
        const data: AnnouncementData = {
            title: oldTitle,
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

    test('admin can edit an existing announcement', async () => {
        // Arrange
        const newTitle = `Edit Announce New_${generateUniqueId()}`;
        await announcementsPage.navigateTo();

        // Act
        const updates: Partial<AnnouncementData> = {
            title: newTitle,
            description: 'Updated details for announcement recording flow'
        };
        await announcementsPage.editAnnouncement(oldTitle, updates);

        // Assert
        await expect(announcementsPage.updatedHeading).toBeVisible();
        await expect(announcementsPage.getAnnouncementRow(newTitle)).toBeVisible();
    });
});
