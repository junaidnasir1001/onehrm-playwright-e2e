import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export interface CompanyData {
    // Dropdowns
    typeSearch: string;
    typeExpectedName?: string;
    headSearch?: string;
    headExpectedName?: string;
    timezoneSearch?: string;
    timezoneExpectedName?: string;
    calendarSearch?: string;
    calendarExpectedName?: string;

    // Text inputs
    name: string;
    registrationNo?: string;
    tradingName?: string;
    contactNo?: string;
    email?: string;
    address?: string;
    website?: string;
    taxNo?: string;

    // Numbers
    hrdfLimit?: string;

    // File
    logoFilePath?: string;

    // Toggles (advanced usage, recording maps specific dom elements)
    toggleFirstControl?: boolean;
    toggle17thChild?: boolean;
    toggle18thChild?: boolean;
    allowCheckInImage?: boolean;
}

/**
 * CompanyPage - Handles the Organization -> Company module
 * URL: /companies
 */
export class CompanyPage extends BasePage {
    // ── Navigation ───────────────────────────────────────────────────────────
    private readonly organizationMenu = this.page.getByRole('link', { name: 'Organization' });
    // Use Regex to anchor and ignore icons/leading spaces (e.g. 'E Company')
    private readonly companySubMenu = this.page.getByRole('link', { name: /Company$/i, exact: false });

    // ── Forms / Actions ──────────────────────────────────────────────────────
    private readonly addCompanyButton = this.page.getByRole('button', { name: ' Add Company' });
    
    // Bootstrap Select dropdown triggers
    private readonly selectTypeButton = this.page.locator('button').filter({ hasText: 'Select Company Type' });
    private readonly selectHeadButton = this.page.locator('button').filter({ hasText: 'Select Company Head' });
    private readonly selectTimezoneButton = this.page.locator('button').filter({ hasText: 'Select Timezone' });
    private readonly selectCalendarButton = this.page.locator('button').filter({ hasText: 'Select Holiday Calendar' });

    // Text inputs
    private readonly nameInput = this.page.getByRole('textbox', { name: 'Name *' });
    private readonly registrationNoInput = this.page.getByRole('textbox', { name: 'Registration No *' });
    private readonly tradingNameInput = this.page.getByRole('textbox', { name: 'Trading Name' });
    private readonly contactNoInput = this.page.getByRole('textbox', { name: 'Contact No' });
    private readonly emailInput = this.page.getByRole('textbox', { name: 'Email' });
    private readonly addressInput = this.page.getByRole('textbox', { name: 'Address' });
    private readonly websiteInput = this.page.getByRole('textbox', { name: 'Website' });
    private readonly taxNoInput = this.page.getByRole('textbox', { name: 'Tax No' });
    private readonly hrdfLimitInput = this.page.getByRole('spinbutton', { name: 'HRDF Limit *' });

    // Logo Upload
    private readonly logoUploadInput = this.page.getByRole('button', { name: 'Company Logo' });

    // Toggles natively recorded (highly specific CSS paths)
    private readonly toggleFirstControl = this.page.locator('.custom-control').first();
    private readonly toggle17thChild = this.page.locator('div:nth-child(17) > .form-group > .custom-control');
    private readonly toggle18thChild = this.page.locator('div:nth-child(18) > .form-group > .custom-control');
    private readonly allowCheckInImageLabel = this.page.getByText(/Yes Allow Check In/i);

    // Submit
    private readonly submitButton = this.page.getByRole('button', { name: 'Submit' });

    // Modals
    private readonly closeModalButton = this.page.locator('#show-company-modal').getByText('×');

    // ── Success Messages ─────────────────────────────────────────────────────
    readonly createdHeading = this.page.getByRole('heading', { name: 'Company Created Successfully.' });
    readonly updatedHeading = this.page.getByRole('heading', { name: 'Company Updated Successfully.' });
    readonly deletedHeading = this.page.getByRole('heading', { name: 'Company Deleted Successfully.' });

    constructor(page: Page) {
        super(page);
    }

    // ── Methods ──────────────────────────────────────────────────────────────

    async navigateTo(): Promise<void> {
        await this.click(this.organizationMenu);
        await this.click(this.companySubMenu);
        await this.waitForPageLoad();
    }

    getCompanyRow(name: string) {
        return this.page.getByRole('row', { name: new RegExp(name) });
    }

    // ── CRUD Actions ─────────────────────────────────────────────────────────

    private async fillForm(data: Partial<CompanyData>): Promise<void> {
        // Dropdowns
        if (data.typeSearch) {
            await this.selectBootstrapOption(this.selectTypeButton, data.typeSearch, data.typeExpectedName);
        }
        if (data.headSearch) {
            await this.selectBootstrapOption(this.selectHeadButton, data.headSearch, data.headExpectedName);
        }
        
        // Inputs
        if (data.name) await this.clearAndFill(this.nameInput, data.name);
        if (data.registrationNo) await this.clearAndFill(this.registrationNoInput, data.registrationNo);
        if (data.tradingName) await this.clearAndFill(this.tradingNameInput, data.tradingName);
        if (data.contactNo) await this.clearAndFill(this.contactNoInput, data.contactNo);
        if (data.email) await this.clearAndFill(this.emailInput, data.email);
        if (data.address) await this.clearAndFill(this.addressInput, data.address);
        if (data.website) await this.clearAndFill(this.websiteInput, data.website);
        if (data.taxNo) await this.clearAndFill(this.taxNoInput, data.taxNo);
        if (data.hrdfLimit) await this.clearAndFill(this.hrdfLimitInput, data.hrdfLimit);

        // Logo File
        if (data.logoFilePath) {
            // Note: button type element maps to an underlying invisible <input type="file"> click usually,
            // we will evaluate if setInputFiles on the role button is directly supported depending on DOM.
            // Playwright's locator.setInputFiles expects an input[type="file"].
            await this.page.locator('input[type="file"]').first().setInputFiles(data.logoFilePath);
        }

        // Additional optional dropdowns
        if (data.timezoneSearch) {
            await this.selectBootstrapOption(this.selectTimezoneButton, data.timezoneSearch, data.timezoneExpectedName);
        }
        if (data.calendarSearch) {
            await this.selectBootstrapOption(this.selectCalendarButton, data.calendarSearch, data.calendarExpectedName);
        }

        // Toggles
        if (data.toggleFirstControl) await this.click(this.toggleFirstControl);
        if (data.toggle17thChild) await this.click(this.toggle17thChild);
        if (data.toggle18thChild) await this.click(this.toggle18thChild);
        if (data.allowCheckInImage) await this.click(this.allowCheckInImageLabel);
    }

    async createCompany(data: CompanyData): Promise<void> {
        await this.click(this.addCompanyButton);
        await this.fillForm(data);

        await this.scrollIntoView(this.submitButton);
        await this.click(this.submitButton);
    }

    async viewCompany(nameOrRowIdentifier: string): Promise<void> {
        const row = this.getCompanyRow(nameOrRowIdentifier);
        // Click show icon button
        await this.click(row.locator('button[name="show"]').first());
    }

    async closeCompanyModal(): Promise<void> {
        await this.click(this.closeModalButton);
    }

    async editCompany(oldNameOrRowIdentifier: string, updates: Partial<CompanyData>): Promise<void> {
        const row = this.getCompanyRow(oldNameOrRowIdentifier);
        // The edit icon button
        await this.click(row.locator('button[name="edit"]').first());

        await this.fillForm(updates);

        await this.scrollIntoView(this.submitButton);
        await this.click(this.submitButton);
    }

    async deleteCompany(nameOrRowIdentifier: string): Promise<void> {
        const row = this.getCompanyRow(nameOrRowIdentifier);
        // The delete icon button
        await this.click(row.locator('button[name="delete"]').first());

        // Confirm dialog
        await this.click(this.page.getByRole('button', { name: 'OK' }));
    }
}
