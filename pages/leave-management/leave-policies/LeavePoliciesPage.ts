import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export interface LeavePolicyData {
    companySearch: string;
    employeeSearch: string;
    startDate: string;
    endDate: string;
    leavePairing: string;
    remarks: string;
    /** Ordered indexes for unlabeled custom-control toggles (e.g., Is Paid, Allow Half Day, etc) */
    toggleIndices?: number[];
}

export class LeavePoliciesPage extends BasePage {
    // Navigation
    private readonly moduleLink = this.page.getByRole('link', { name: /Leave Management/i });
    private readonly subModuleLink = this.page.getByRole('link', { name: /Leave Policies/i });

    // List View
    private readonly addBtn = this.page.getByRole('button', { name: /Add Leave Policy/i });
    readonly searchBox = this.page.getByRole('searchbox', { name: 'Search:' });

    // Form
    private readonly startDateInput = this.page.getByRole('textbox', { name: 'Start Date *' });
    private readonly endDateInput = this.page.getByRole('textbox', { name: 'End Date *' });
    private readonly leavePairingInput = this.page.getByRole('spinbutton', { name: 'Leave Pairing *' });
    private readonly remarksInput = this.page.getByRole('textbox', { name: 'Remarks' });
    private readonly submitBtn = this.page.getByRole('button', { name: 'Submit' });

    // Assertions
    readonly createdHeading = this.page.getByRole('heading', { name: 'Leave Policy Created' });
    readonly updatedHeading = this.page.getByRole('heading', { name: 'Leave Policy Updated' });
    readonly deletedHeading = this.page.getByRole('heading', { name: 'Leave Policy Deleted' });

    constructor(page: Page) {
        super(page);
    }

    async navigateTo(): Promise<void> {
        await this.click(this.moduleLink);
        await this.waitForPageLoad();
        await this.click(this.subModuleLink);
        await this.waitForPageLoad();
    }

    async createPolicy(data: LeavePolicyData): Promise<void> {
        await this.click(this.addBtn);

        // Bootstrap Pickers mappings
        await this.selectBootstrapOption(
            this.page.locator('button').filter({ hasText: 'Select Company' }).last(),
            data.companySearch,
            data.companySearch
        );
        
        await this.selectBootstrapOption(
            this.page.locator('button').filter({ hasText: 'Select Employee' }).last(),
            data.employeeSearch,
            data.employeeSearch
        );

        // Native DOM injection for strict Calendar Pickers ensuring Bootstrap parses string to Date object
        await this.startDateInput.evaluate((el: HTMLInputElement, val) => {
            el.value = val;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
        }, data.startDate);
        await this.startDateInput.blur();

        await this.endDateInput.evaluate((el: HTMLInputElement, val) => {
            el.value = val;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
        }, data.endDate);
        await this.endDateInput.blur();

        await this.clearAndFill(this.leavePairingInput, data.leavePairing);
        await this.clearAndFill(this.remarksInput, data.remarks);

        // Process arbitrary custom-control toggles if safely mapped
        if (data.toggleIndices && data.toggleIndices.length > 0) {
            for (const index of data.toggleIndices) {
                const toggle = this.page.locator('.custom-control').nth(index);
                if (await toggle.isVisible()) {
                    await this.click(toggle);
                }
            }
        }

        await this.scrollIntoView(this.submitBtn);
        await this.click(this.submitBtn);
    }

    async searchPolicy(searchTerm: string): Promise<void> {
        await this.clearAndFill(this.searchBox, searchTerm);
        // Ensure robust datatable reload buffer preventing detached elements
        await this.page.waitForTimeout(1500); 
    }

    getPolicyRowCell(cellName: string): Locator {
        return this.page.getByRole('cell', { name: new RegExp(cellName, 'i') }).first();
    }

    async editPolicy(targetRowContext: string, updatedRemarks: string, toggleIndexToClick?: number): Promise<void> {
        // Atomic locator strategy preventing mid-render unmount (detached element errors)
        const row = this.page.locator(`tr:has-text("${targetRowContext}")`).first();
        const editAction = row.locator('button[name="edit"]').or(row.locator('.edit-leave-policy'));
        
        await this.click(editAction);
        
        await this.clearAndFill(this.remarksInput, updatedRemarks);
        
        if (toggleIndexToClick !== undefined) {
             const toggle = this.page.locator('.custom-control').nth(toggleIndexToClick);
             if (await toggle.isVisible()) await this.click(toggle);
        }

        await this.scrollIntoView(this.submitBtn);
        await this.click(this.submitBtn);
    }

    async deletePolicy(targetRowContext: string): Promise<void> {
        const row = this.page.locator(`tr:has-text("${targetRowContext}")`).first();
        const deleteAction = row.locator('button[name="delete"]').or(row.locator('.delete-leave-policy'));
        
        await this.click(deleteAction);
        await this.click(this.page.getByRole('button', { name: 'OK' }));
    }
}
