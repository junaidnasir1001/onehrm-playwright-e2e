import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export interface DepartmentData {
    name: string;
    companySearch?: string;
    companyExpectedName?: string;
}

/**
 * DepartmentPage - Handles the Organization -> Department module
 * URL: /departments (implied)
 */
export class DepartmentPage extends BasePage {
    // ── Navigation ───────────────────────────────────────────────────────────
    private readonly organizationMenu = this.page.getByRole('link', { name: 'Organization' });
    private readonly departmentSubMenu = this.page.getByRole('link', { name: /Department$/i });

    // ── Forms / Actions ──────────────────────────────────────────────────────
    private readonly addDepartmentButton = this.page.getByRole('button', { name: ' Add Department' });
    
    // Text inputs
    private readonly nameInput = this.page.getByRole('textbox', { name: 'Name *' });
    
    // Bootstrap Select dropdown triggers
    private readonly selectCompanyButton = this.page.locator('button[data-id="company_id"]');

    // Submit
    private readonly submitButton = this.page.getByRole('button', { name: 'Submit' });

    // Modals
    private readonly closeModalButton = this.page.locator('#show-department-modal').getByText('×');

    // ── Success Messages ─────────────────────────────────────────────────────
    // Note: Recordings show "Department Created", not necessarily ending in "Successfully."
    readonly createdHeading = this.page.getByRole('heading', { name: /Department Created/i });
    readonly updatedHeading = this.page.getByRole('heading', { name: /Department Updated/i });
    readonly deletedHeading = this.page.getByRole('heading', { name: /Department Deleted/i });

    constructor(page: Page) {
        super(page);
    }

    // ── Methods ──────────────────────────────────────────────────────────────

    async navigateTo(): Promise<void> {
        await this.click(this.organizationMenu);
        await this.click(this.departmentSubMenu);
        await this.waitForPageLoad();
    }

    getDepartmentRow(name: string) {
        // Matches the row by name. Row text in recording e.g., 'Development department N/A'
        return this.page.getByRole('row', { name: new RegExp(name) });
    }

    // ── CRUD Actions ─────────────────────────────────────────────────────────

    private async fillForm(data: Partial<DepartmentData>): Promise<void> {
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
    }

    async createDepartment(data: DepartmentData): Promise<void> {
        await this.click(this.addDepartmentButton);
        await this.fillForm(data);

        await this.scrollIntoView(this.submitButton);
        await this.click(this.submitButton);
    }

    async viewDepartment(name: string): Promise<void> {
        const row = this.getDepartmentRow(name);
        // Click show icon button
        await this.click(row.locator('button[name="show"]').first());
    }

    async closeDepartmentModal(): Promise<void> {
        await this.click(this.closeModalButton);
    }

    async editDepartment(oldName: string, updates: Partial<DepartmentData>): Promise<void> {
        const row = this.getDepartmentRow(oldName);
        // The edit icon button
        await this.click(row.locator('button[name="edit"]').first());

        await this.fillForm(updates);

        await this.scrollIntoView(this.submitButton);
        await this.click(this.submitButton);
    }

    async deleteDepartment(name: string): Promise<void> {
        const row = this.getDepartmentRow(name);
        // The delete icon button
        await this.click(row.locator('button[name="delete"]').first());

        // Confirm dialog
        await this.click(this.page.getByRole('button', { name: 'OK' }));
    }
}
