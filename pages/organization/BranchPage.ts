import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export interface BranchData {
    name: string;
    address?: string;
    companySearch?: string;
    companyExpectedName?: string;
}

/**
 * BranchPage - Handles the Organization -> Branch module
 * URL: /branches (implied)
 */
export class BranchPage extends BasePage {
    // ── Navigation ───────────────────────────────────────────────────────────
    private readonly organizationMenu = this.page.getByRole('link', { name: 'Organization' });
    private readonly branchSubMenu = this.page.getByRole('link', { name: /Branch$/i });

    // ── Forms / Actions ──────────────────────────────────────────────────────
    private readonly addBranchButton = this.page.getByRole('button', { name: ' Add Branch' });
    
    // Text inputs
    private readonly nameInput = this.page.getByRole('textbox', { name: 'Name *' });
    private readonly addressInput = this.page.getByRole('textbox', { name: 'Address' });
    
    // Bootstrap Select dropdown triggers
    private readonly selectCompanyButton = this.page.locator('button[data-id="company_id"]');

    // Submit
    private readonly submitButton = this.page.getByRole('button', { name: 'Submit' });

    // ── Success Messages ─────────────────────────────────────────────────────
    readonly createdHeading = this.page.getByRole('heading', { name: /Branch Created Successfully/i });
    readonly updatedHeading = this.page.getByRole('heading', { name: /Branch Updated Successfully/i });
    readonly deletedHeading = this.page.getByRole('heading', { name: /Branch Deleted Successfully/i });

    constructor(page: Page) {
        super(page);
    }

    // ── Methods ──────────────────────────────────────────────────────────────

    async navigateTo(): Promise<void> {
        await this.click(this.organizationMenu);
        await this.click(this.branchSubMenu);
        await this.waitForPageLoad();
    }

    getBranchRow(name: string) {
        // Matches the row loosely by name string interpolation
        return this.page.getByRole('row', { name: new RegExp(name) });
    }

    // ── CRUD Actions ─────────────────────────────────────────────────────────

    private async fillForm(data: Partial<BranchData>): Promise<void> {
        if (data.name) {
            await this.clearAndFill(this.nameInput, data.name);
        }

        if (data.address) {
            await this.clearAndFill(this.addressInput, data.address);
        }

        if (data.companySearch) {
            await this.selectBootstrapOption(
                this.selectCompanyButton, 
                data.companySearch, 
                data.companyExpectedName
            );
        }
    }

    async createBranch(data: BranchData): Promise<void> {
        await this.click(this.addBranchButton);
        await this.fillForm(data);

        await this.scrollIntoView(this.submitButton);
        await this.click(this.submitButton);
    }

    async editBranch(oldName: string, updates: Partial<BranchData>): Promise<void> {
        const row = this.getBranchRow(oldName);
        // The edit icon button
        await this.click(row.locator('button[name="edit"]').first());

        await this.fillForm(updates);

        await this.scrollIntoView(this.submitButton);
        await this.click(this.submitButton);
    }

    async deleteBranch(name: string): Promise<void> {
        const row = this.getBranchRow(name);
        // The delete icon button
        await this.click(row.locator('button[name="delete"]').first());

        // Confirm dialog
        await this.click(this.page.getByRole('button', { name: 'OK' }));
    }
}
