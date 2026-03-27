import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { CompanyPage, CompanyData } from '../../../pages/organization/CompanyPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Company - Create', () => {
    let loginPage: LoginPage;
    let companyPage: CompanyPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        companyPage = new CompanyPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
        await companyPage.navigateTo();
    });

    test('admin can create a new company', async ({ page }) => {
        // Arrange
        const uniqueSuffix = generateUniqueId();
        const companyName = `Acube QA_${uniqueSuffix}`;
        const companyEmail = `acube${uniqueSuffix}@gmail.com`;

        const data: CompanyData = {
            typeSearch: 'limited Par',
            name: companyName,
            registrationNo: `REG${uniqueSuffix}`,
            tradingName: `Trade_${uniqueSuffix}`,
            contactNo: '4534543534',
            email: companyEmail,
            address: 'sadiq center',
            website: 'acube.com',
            taxNo: '35454354',
            timezoneSearch: 'asia/karachi',
            calendarSearch: 'Federal H',
            hrdfLimit: '1',
            // Toggles requested in original recording:
            toggleFirstControl: true,
            toggle17thChild: true,
            toggle18thChild: true
        };

        // Act
        await companyPage.createCompany(data);

        // Assert — success message
        await expect(companyPage.createdHeading).toBeVisible();

        // Assert — visibly added to list
        // Note: The recorded spec targeted row by combined name + email "Acube acube@gmail.com"
        await expect(companyPage.getCompanyRow(companyName)).toBeVisible();
    });
});
