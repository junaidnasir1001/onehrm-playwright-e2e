import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { CompanyPage, CompanyData } from '../../../pages/organization/CompanyPage';
import { generateUniqueId } from '../../../utils/test-data';

test.describe('Company - Edit', () => {
    let loginPage: LoginPage;
    let companyPage: CompanyPage;
    let oldCompanyName: string;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();

        loginPage = new LoginPage(page);
        companyPage = new CompanyPage(page);

        const suffix = generateUniqueId();
        oldCompanyName = `Edit_Old_${suffix}`;

        const data: CompanyData = {
            typeSearch: 'limited Par',
            name: oldCompanyName,
            registrationNo: `REG${suffix}`,
            tradingName: `Trade_${suffix}`,
            contactNo: '4534543534',
            email: `edit${suffix}@gmail.com`,
            address: 'sadiq center',
            website: 'acube.com',
            taxNo: '35454354',
            timezoneSearch: 'asia/karachi',
            calendarSearch: 'Federal H',
            hrdfLimit: '1'
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

    test('admin can edit an existing company', async () => {
        // Arrange
        const newCompanyName = `Edit_New_${generateUniqueId()}`;
        await companyPage.navigateTo();

        // Act
        const updates: Partial<CompanyData> = {
            name: newCompanyName
        };
        await companyPage.editCompany(oldCompanyName, updates);

        // Assert — success message
        await expect(companyPage.updatedHeading).toBeVisible();

        // Assert — visible in list
        await expect(companyPage.getCompanyRow(newCompanyName)).toBeVisible();
    });
});
