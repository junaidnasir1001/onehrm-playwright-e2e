import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DailyActivitiesPage } from '../../pages/daily-activities/DailyActivitiesPage';
import { generateUniqueId } from '../../utils/test-data';

test.describe('Daily Activities - Create', () => {
    let loginPage: LoginPage;
    let activitiesPage: DailyActivitiesPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        activitiesPage = new DailyActivitiesPage(page);

        // Pre-flight setup: Standard authentication phase
        await loginPage.goto();
        await loginPage.loginAsAdmin();
    });

    test('admin can create a fully mapped daily activity record', async () => {
        // Arrange
        await activitiesPage.navigateTo();
        
        const uid = generateUniqueId();
        const targetDescription = `Create Target ${uid}`;
        
        const activityPayload = {
            companySearch: 'Pukat',
            departmentSearch: 'IT',
            employeeSearch: 'QA Hassan',
            date: '06-04-2026',
            startTime: '09:00',
            endTime: '18:00',
            description: targetDescription
        };

        // Act
        await activitiesPage.createActivity(activityPayload);

        // Assert — Toast/Modal renders appropriately locking success status
        await expect(activitiesPage.createdHeading).toBeVisible();
        
        // Assert — New activity reflects autonomously on Grid Layouts, isolated by UID
        await activitiesPage.searchActivity(targetDescription);
        await expect(activitiesPage.getActivityCell(targetDescription)).toBeVisible();
    });
});
