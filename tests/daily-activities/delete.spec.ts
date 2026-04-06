import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DailyActivitiesPage } from '../../pages/daily-activities/DailyActivitiesPage';
import { generateUniqueId } from '../../utils/test-data';

test.describe('Daily Activities - Delete', () => {
    let loginPage: LoginPage;
    let activitiesPage: DailyActivitiesPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        activitiesPage = new DailyActivitiesPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
    });

    test('admin can successfully delete and unmap an explicit daily activity record', async () => {
        // Arrange - Synthesize pure isolated deletion target preventing race conditions 
        await activitiesPage.navigateTo();
        
        const uid = generateUniqueId();
        const targetDescription = `Delete Target ${uid}`;
        
        const activityPayload = {
            companySearch: 'Pukat',
            departmentSearch: 'IT',
            employeeSearch: 'QA Hassan',
            date: '06-04-2026',
            startTime: '09:00',
            endTime: '18:00',
            description: targetDescription
        };

        await activitiesPage.createActivity(activityPayload);
        await expect(activitiesPage.createdHeading).toBeVisible();

        await activitiesPage.navigateTo();
        await activitiesPage.searchActivity(targetDescription);

        // Act - Purge the exact UID
        await activitiesPage.deleteActivity(targetDescription);

        // Assert — System confirmation
        await expect(activitiesPage.deletedHeading).toBeVisible();
        
        // Assert — Verifying complete UI detachment
        await activitiesPage.searchActivity(targetDescription);
        await expect(activitiesPage.getActivityCell(targetDescription)).toBeHidden();
    });
});
