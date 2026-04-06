import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DailyActivitiesPage } from '../../pages/daily-activities/DailyActivitiesPage';
import { generateUniqueId } from '../../utils/test-data';

test.describe('Daily Activities - Edit', () => {
    let loginPage: LoginPage;
    let activitiesPage: DailyActivitiesPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        activitiesPage = new DailyActivitiesPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
    });

    test('admin can update description boundaries for existing daily activity entries', async () => {
        // Arrange - Setup completely isolated baseline state explicitly before editing
        await activitiesPage.navigateTo();
        
        const uid = generateUniqueId();
        const baseDescription = `Edit Base ${uid}`;
        const updatedDescription = `Edit Target ${uid}`;
        
        const activityPayload = {
            companySearch: 'Pukat',
            departmentSearch: 'IT',
            employeeSearch: 'QA Hassan',
            date: '06-04-2026',
            startTime: '09:00',
            endTime: '18:00',
            description: baseDescription
        };

        // Synthesize the prerequisite activity state natively
        await activitiesPage.createActivity(activityPayload);
        await expect(activitiesPage.createdHeading).toBeVisible();

        // Refresh baseline UI maps seamlessly targeting only our isolated UID
        await activitiesPage.navigateTo();
        await activitiesPage.searchActivity(baseDescription);
        
        // Act - Edit the exact UID variant created above
        await activitiesPage.editActivity(baseDescription, updatedDescription);

        // Assert
        await expect(activitiesPage.updatedHeading).toBeVisible();
        
        await activitiesPage.searchActivity(updatedDescription);
        await expect(activitiesPage.getActivityCell(updatedDescription)).toBeVisible();
    });
});
