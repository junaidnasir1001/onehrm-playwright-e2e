import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { LeaveTypesPage } from '../../../pages/leave-management/leave-types/LeaveTypesPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Leave Types - Delete', () => {
    let loginPage: LoginPage;
    let typesPage: LeaveTypesPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        typesPage = new LeaveTypesPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
    });

    test('admin can purposefully revoke configured leave types seamlessly unlinking UI representations', async () => {
        // Arrange - Generate native prerequisite
        await typesPage.navigateTo();
        
        const uid = generateUniqueId();
        const targetName = `Delete Target Type ${uid}`;
        
        const typePayload = {
            leaveParentSearch: 'Annual',
            name: targetName,
            description: 'Synthesizing native deletion target cleanly'
        };

        await typesPage.createType(typePayload);
        await expect(typesPage.createdHeading).toBeVisible();

        await typesPage.navigateTo();
        await typesPage.searchType(targetName);

        // Act - Permanently revoke explicitly
        await typesPage.deleteType(targetName);

        // Assert
        await expect(typesPage.deletedHeading).toBeVisible();
        
        // UI Cleanup verification
        await typesPage.searchType(targetName);
        await expect(typesPage.getTypeRowCell(targetName)).toBeHidden();
    });
});
