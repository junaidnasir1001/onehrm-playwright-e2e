import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export interface CompanyPolicyData {
    title: string;
    description?: string;
    companySearch?: string;
    companyExpectedName?: string;
    policyTypeSearch?: string;
    policyTypeExpectedName?: string;
    attachmentPath?: string;
}

/**
 * CompanyPolicyPage - Handles the Organization -> Company Policy module
 * URL: /company-policy (implied)
 */
export class CompanyPolicyPage extends BasePage {
    // ── Navigation ───────────────────────────────────────────────────────────
    private readonly organizationMenu = this.page.getByRole('link', { name: 'Organization' });
    private readonly companyPolicySubMenu = this.page.getByRole('link', { name: /Company Policy$/i });

    // ── Forms / Actions ──────────────────────────────────────────────────────
    private readonly addPolicyButton = this.page.getByRole('button', { name: ' Add Company Policy' });
    
    // Text inputs
    private readonly titleInput = this.page.getByRole('textbox', { name: 'Title *' });
    private readonly descriptionInput = this.page.locator('#description');
    
    // File inputs (Playwright allows mapping SetInputFiles against styled facade buttons directly when implicitly linked)
    private readonly attachmentButton = this.page.getByRole('button', { name: 'Company Policy Attachment' });

    // Bootstrap Select dropdown triggers
    private readonly selectCompanyButton = this.page.locator('button[data-id="company_id"]');
    // Mapped safely without overlapping since it targets `Select Company Policy` explicit filter
    private readonly selectPolicyTypeButton = this.page.locator('button').filter({ hasText: 'Select Company Policy' });

    // Submit
    private readonly submitButton = this.page.getByRole('button', { name: 'Submit' });

    // ── Success Messages ─────────────────────────────────────────────────────
    readonly createdHeading = this.page.getByRole('heading', { name: /Company Policy Created/i });
    readonly updatedHeading = this.page.getByRole('heading', { name: /Company Policy Updated/i });
    readonly deletedHeading = this.page.getByRole('heading', { name: /Company Policy Deleted/i });

    constructor(page: Page) {
        super(page);
    }

    // ── Methods ──────────────────────────────────────────────────────────────

    async navigateTo(): Promise<void> {
        await this.click(this.organizationMenu);
        await this.click(this.companyPolicySubMenu);
        await this.waitForPageLoad();
    }

    getPolicyRow(title: string) {
        // Matches the row loosely by string
        return this.page.getByRole('row', { name: new RegExp(title) });
    }

    // ── CRUD Actions ─────────────────────────────────────────────────────────

    private async fillForm(data: Partial<CompanyPolicyData>): Promise<void> {
        if (data.companySearch) {
            await this.selectBootstrapOption(
                this.selectCompanyButton, 
                data.companySearch, 
                data.companyExpectedName
            );
        }

        if (data.title) {
            await this.clearAndFill(this.titleInput, data.title);
        }

        if (data.description) {
            await this.clearAndFill(this.descriptionInput, data.description);
        }

        if (data.attachmentPath) {
            await this.attachmentButton.setInputFiles(data.attachmentPath);
        }

        if (data.policyTypeSearch) {
            await this.selectBootstrapOption(
                this.selectPolicyTypeButton, 
                data.policyTypeSearch, 
                data.policyTypeExpectedName
            );
        }
    }

    async createCompanyPolicy(data: CompanyPolicyData): Promise<void> {
        await this.click(this.addPolicyButton);
        await this.fillForm(data);

        await this.scrollIntoView(this.submitButton);
        await this.click(this.submitButton);
    }

    async editCompanyPolicy(oldTitle: string, updates: Partial<CompanyPolicyData>): Promise<void> {
        const row = this.getPolicyRow(oldTitle);
        // The edit icon button
        await this.click(row.locator('button[name="edit"]').first());

        await this.fillForm(updates);

        await this.scrollIntoView(this.submitButton);
        await this.click(this.submitButton);
    }

    async deleteCompanyPolicy(title: string): Promise<void> {
        const row = this.getPolicyRow(title);
        // The delete icon button
        await this.click(row.locator('button[name="delete"]').first());

        // Confirm dialog
        await this.click(this.page.getByRole('button', { name: 'OK' }));
    }
}
