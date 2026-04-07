import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export interface LeaveTypeData {
    leaveParentSearch?: string;
    name: string;
    description: string;
    toggleIndices?: number[];
}

export class LeaveTypesPage extends BasePage {
    // Navigation
    private readonly moduleLink = this.page.getByRole('link', { name: /Leave Management/i });
    private readonly subModuleLink = this.page.getByRole('link', { name: /Leave Types/i });

    // List View
    private readonly addBtn = this.page.getByRole('button', { name: /Add Leave Type/i });
    readonly searchBox = this.page.getByRole('searchbox', { name: 'Search:' });

    // Form
    private readonly nameInput = this.page.getByRole('textbox', { name: 'Name *' });
    private readonly descriptionInput = this.page.getByRole('textbox', { name: 'Description' });
    private readonly submitBtn = this.page.getByRole('button', { name: 'Submit' });

    // Assertions
    readonly createdHeading = this.page.getByRole('heading', { name: 'Leave Type Created' });
    readonly updatedHeading = this.page.getByRole('heading', { name: 'Leave Type Updated' });
    readonly deletedHeading = this.page.getByRole('heading', { name: 'Leave Type Deleted' });

    constructor(page: Page) {
        super(page);
    }

    async navigateTo(): Promise<void> {
        await this.click(this.moduleLink);
        await this.waitForPageLoad();
        await this.click(this.subModuleLink);
        await this.waitForPageLoad();
    }

    async createType(data: LeaveTypeData): Promise<void> {
        await this.click(this.addBtn);

        if (data.leaveParentSearch) {
            await this.selectBootstrapOption(
                this.page.locator('button').filter({ hasText: 'Select Leave Parent' }).last(),
                data.leaveParentSearch,
                data.leaveParentSearch
            );
        }

        await this.clearAndFill(this.nameInput, data.name);
        
        // Process arbitrary custom-control toggles safely if active
        if (data.toggleIndices && data.toggleIndices.length > 0) {
            for (const index of data.toggleIndices) {
                const toggle = this.page.locator('.custom-control').nth(index);
                if (await toggle.isVisible()) {
                    await this.click(toggle);
                }
            }
        }
        
        await this.clearAndFill(this.descriptionInput, data.description);

        await this.scrollIntoView(this.submitBtn);
        await this.click(this.submitBtn);
    }

    async searchType(searchTerm: string): Promise<void> {
        await this.clearAndFill(this.searchBox, searchTerm);
        await this.page.waitForTimeout(1500); // Standard Grid UI Debounce margin
    }

    getTypeRowCell(cellName: string): Locator {
        return this.page.getByRole('cell', { name: new RegExp(cellName, 'i') }).first();
    }

    async editType(targetRowContext: string, updatedName: string): Promise<void> {
        // Atomic binding to prevent detached-node race conditions mid-render
        const row = this.page.locator(`tr:has-text("${targetRowContext}")`).first();
        const editAction = row.locator('button[name="edit"]').or(row.locator('.edit-leave-type'));
        
        await this.click(editAction);
        
        await this.clearAndFill(this.nameInput, updatedName);

        await this.scrollIntoView(this.submitBtn);
        await this.click(this.submitBtn);
    }

    async deleteType(targetRowContext: string): Promise<void> {
        const row = this.page.locator(`tr:has-text("${targetRowContext}")`).first();
        const deleteAction = row.locator('button[name="delete"]').or(row.locator('.delete-leave-type'));
        
        await this.click(deleteAction);
        
        // Dismiss confirmation popup natively
        await this.click(this.page.getByRole('button', { name: 'OK' }));
    }
}
