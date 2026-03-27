import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export interface DesignationData {
    name: string;
    shortCode?: string;
    companySearch?: string;
    companyExpectedName?: string;
    departmentSearch?: string;
    departmentExpectedName?: string;
}

/**
 * DesignationPage - Handles the Organization -> Designation module
 * URL: /designations (implied)
 */
export class DesignationPage extends BasePage {
    // ── Navigation ───────────────────────────────────────────────────────────
    private readonly organizationMenu = this.page.getByRole('link', { name: 'Organization' });
    private readonly designationSubMenu = this.page.getByRole('link', { name: /Designation$/i });

    // ── Forms / Actions ──────────────────────────────────────────────────────
    private readonly addDesignationButton = this.page.getByRole('button', { name: ' Add Designation' });
    
    // Text inputs
    private readonly nameInput = this.page.getByRole('textbox', { name: 'Name *' });
    private readonly shortCodeInput = this.page.getByRole('textbox', { name: 'Short Code' });
    
    // Bootstrap Select dropdown triggers
    private readonly selectCompanyButton = this.page.locator('button[data-id="company_id"]');
    // For department, data-id is standard, but fallback to text filter if it fails during verification
    private readonly selectDepartmentButton = this.page.locator('button[data-id="department_id"]');

    // Submit
    private readonly submitButton = this.page.getByRole('button', { name: 'Submit' });

    // ── Success Messages ─────────────────────────────────────────────────────
    readonly createdHeading = this.page.getByRole('heading', { name: /Designation Created/i });
    readonly updatedHeading = this.page.getByRole('heading', { name: /Designation Updated/i });
    readonly deletedHeading = this.page.getByRole('heading', { name: /Designation Deleted/i });

    constructor(page: Page) {
        super(page);
    }

    // ── Methods ──────────────────────────────────────────────────────────────

    async navigateTo(): Promise<void> {
        await this.click(this.organizationMenu);
        await this.click(this.designationSubMenu);
        await this.waitForPageLoad();
    }

    getDesignationRow(name: string) {
        // Matches the row loosely by name string interpolation
        return this.page.getByRole('row', { name: new RegExp(name) });
    }

    // ── CRUD Actions ─────────────────────────────────────────────────────────

    private async fillForm(data: Partial<DesignationData>): Promise<void> {
        if (data.name) {
            await this.clearAndFill(this.nameInput, data.name);
        }

        if (data.companySearch) {
            await this.selectBootstrapOption(
                this.selectCompanyButton, 
                data.companySearch, 
                data.companyExpectedName
            );
        }

        if (data.departmentSearch) {
            await this.selectBootstrapOption(
                this.selectDepartmentButton, 
                data.departmentSearch, 
                data.departmentExpectedName
            );
        }

        if (data.shortCode) {
            await this.clearAndFill(this.shortCodeInput, data.shortCode);
        }
    }

    async createDesignation(data: DesignationData): Promise<void> {
        await this.click(this.addDesignationButton);
        await this.fillForm(data);

        await this.scrollIntoView(this.submitButton);
        await this.click(this.submitButton);
    }

    async editDesignation(oldName: string, updates: Partial<DesignationData>): Promise<void> {
        const row = this.getDesignationRow(oldName);
        // The edit icon button
        await this.click(row.locator('button[name="edit"]').first());

        await this.fillForm(updates);

        await this.scrollIntoView(this.submitButton);
        await this.click(this.submitButton);
    }

    async deleteDesignation(name: string): Promise<void> {
        const row = this.getDesignationRow(name);
        // The delete icon button
        await this.click(row.locator('button[name="delete"]').first());

        // Confirm dialog
        await this.click(this.page.getByRole('button', { name: 'OK' }));
    }
}
