import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { LeaveTypesPage } from '../../../pages/leave-management/leave-types/LeaveTypesPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Leave Types - Create', () => {
    let loginPage: LoginPage;
    let typesPage: LeaveTypesPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        typesPage = new LeaveTypesPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
    });

    test('admin can dynamically establish a new Leave Type mapping bound to legacy parent models natively', async () => {
        // Arrange
        await typesPage.navigateTo();
        
        const uid = generateUniqueId();
        const targetName = `Create Target Type ${uid}`;
        
        const typePayload = {
            leaveParentSearch: 'Annual',
            name: targetName,
            description: 'Setup framework integration target for leave types natively'
        };

        // Act
        await typesPage.createType(typePayload);

        // Assert — System verification layer
        await expect(typesPage.createdHeading).toBeVisible();
        
        // Assert — Grid reflection natively
        await typesPage.searchType(targetName);
        await expect(typesPage.getTypeRowCell(targetName)).toBeVisible();
    });
});
