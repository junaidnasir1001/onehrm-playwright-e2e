import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { CompanyPage, CompanyData } from '../../../pages/organization/CompanyPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Company - View', () => {
    let loginPage: LoginPage;
    let companyPage: CompanyPage;
    let companyName: string;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();

        loginPage = new LoginPage(page);
        companyPage = new CompanyPage(page);

        const suffix = generateUniqueId();
        companyName = `View_${suffix}`;

        const data: CompanyData = {
            typeSearch: 'limited Par',
            name: companyName,
            registrationNo: `REG${suffix}`,
            tradingName: `Trade_${suffix}`,
            contactNo: '4534543534',
            email: `view${suffix}@gmail.com`,
            address: 'sadiq center',
            website: 'acube.com',
            taxNo: '35454354',
            timezoneSearch: 'asia/karachi',
            calendarSearch: 'Federal H',
            hrdfLimit: '1',
            toggleFirstControl: true,
            toggle17thChild: true,
            toggle18thChild: true
        };

        await loginPage.goto();
        await loginPage.loginAsAdmin();
        await companyPage.navigateTo();
        await companyPage.createCompany(data);
        await expect(companyPage.createdHeading).toBeVisible();
        await context.close();
    });

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        companyPage = new CompanyPage(page);

        await loginPage.goto();
        await loginPage.loginAsAdmin();
    });

    test('admin can view an existing company details', async () => {
        // Arrange
        await companyPage.navigateTo();

        // Act
        await companyPage.viewCompany(companyName);

        // Assert — wait for the modal wrapper to be visible or something inside it
        // The recording just opened it and closed it. We look for cross button indicating modal is up.
        await companyPage.closeCompanyModal();
    });
});
