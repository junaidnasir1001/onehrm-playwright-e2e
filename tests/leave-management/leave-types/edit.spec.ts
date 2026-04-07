import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { LeaveTypesPage } from '../../../pages/leave-management/leave-types/LeaveTypesPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Leave Types - Edit', () => {
    let loginPage: LoginPage;
    let typesPage: LeaveTypesPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        typesPage = new LeaveTypesPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
    });

    test('admin can modify implicit configuration boundaries dynamically over active employee leave types natively', async () => {
        // Arrange - Seeding completely isolated prereq instances
        await typesPage.navigateTo();
        
        const uid = generateUniqueId();
        const baseName = `Base Edit Type ${uid}`;
        const updatedName = `Updated Edit Type ${uid}`;
        
        const typePayload = {
            leaveParentSearch: 'Annual',
            name: baseName,
            description: 'Seeding Edit dependency layer autonomously'
        };

        await typesPage.createType(typePayload);
        await expect(typesPage.createdHeading).toBeVisible();

        await typesPage.navigateTo();
        await typesPage.searchType(baseName);
        
        // Act - Binding specific UID mutation to explicit Grid Node
        await typesPage.editType(baseName, updatedName);

        // Assert
        await expect(typesPage.updatedHeading).toBeVisible();
        
        await typesPage.searchType(updatedName);
        await expect(typesPage.getTypeRowCell(updatedName)).toBeVisible();
    });
});
