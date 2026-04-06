import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';

export interface DailyActivityData {
    companySearch: string;
    departmentSearch: string;
    employeeSearch: string;
    date: string;
    startTime: string;
    endTime: string;
    description: string;
}

export class DailyActivitiesPage extends BasePage {
    // Navigation
    private readonly sidebarLink = this.page.getByRole('link', { name: ' Daily Activities' });

    // List View
    private readonly addBtn = this.page.getByRole('button', { name: ' Add Daily Activity' });
    readonly searchBox = this.page.getByRole('searchbox', { name: 'Search:' });

    // Form
    private readonly dateInput = this.page.getByRole('textbox', { name: 'Date *' });
    private readonly startTimeInput = this.page.getByRole('textbox', { name: 'Start Time *' });
    private readonly endTimeInput = this.page.getByRole('textbox', { name: 'End Time *' });
    private readonly descInput = this.page.getByRole('textbox', { name: 'Description' });
    private readonly submitBtn = this.page.getByRole('button', { name: 'Submit' });

    // Assertions
    readonly createdHeading = this.page.getByRole('heading', { name: 'Daily Activity Created' });
    readonly updatedHeading = this.page.getByRole('heading', { name: 'Daily Activity Updated' });
    readonly deletedHeading = this.page.getByRole('heading', { name: 'Daily Activity Deleted' });

    constructor(page: Page) {
        super(page);
    }

    async navigateTo(): Promise<void> {
        await this.click(this.sidebarLink);
        await this.waitForPageLoad();
    }

    async createActivity(data: DailyActivityData): Promise<void> {
        await this.click(this.addBtn);

        // Autonomously map Bootstrap dropdown overrides to skirt arbitrary tree indexing
        await this.selectBootstrapOption(
            this.page.locator('button').filter({ hasText: 'Select Company' }).last(),
            data.companySearch,
            data.companySearch
        );
        
        await this.selectBootstrapOption(
            this.page.locator('button').filter({ hasText: 'Select Department' }).last(),
            data.departmentSearch,
            data.departmentSearch
        );
        
        await this.selectBootstrapOption(
            this.page.locator('button').filter({ hasText: 'Select Employee' }).last(),
            data.employeeSearch,
            data.employeeSearch
        );

        // Handle native textboxes (incorporating DOM event triggers inherited from BasePage to bypass rigid Calendar constraints)
        await this.dateInput.evaluate((el: HTMLInputElement, val) => {
            el.value = val;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
        }, data.date);
        await this.dateInput.blur();

        await this.startTimeInput.evaluate((el: HTMLInputElement, val) => {
            el.value = val;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
        }, data.startTime);
        await this.startTimeInput.blur();

        await this.endTimeInput.evaluate((el: HTMLInputElement, val) => {
            el.value = val;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
        }, data.endTime);
        await this.endTimeInput.blur();
        
        // Removed Escape key sequence to prevent terminating the wrapper modal. Target Description field instead.
        await this.clearAndFill(this.descInput, data.description);

        await this.scrollIntoView(this.submitBtn);
        await this.click(this.submitBtn);
    }

    async searchActivity(searchTerm: string): Promise<void> {
        await this.clearAndFill(this.searchBox, searchTerm);
        // Let the debounced Grid fully reload
        await this.page.waitForTimeout(500);
    }

    getActivityCell(cellName: string): Locator {
        return this.page.getByRole('cell', { name: cellName }).first();
    }

    async editActivity(targetRowContext: string, updatedDescription: string): Promise<void> {
        const row = this.page.getByRole('row', { name: new RegExp(targetRowContext, 'i') }).first();
        const editAction = row.locator('button[name="edit"]').or(row.getByRole('button').nth(0));
        
        await this.click(editAction);
        
        await this.clearAndFill(this.descInput, updatedDescription);
        await this.click(this.submitBtn);
    }

    async deleteActivity(targetRowContext: string): Promise<void> {
        const row = this.page.getByRole('row', { name: new RegExp(targetRowContext, 'i') }).first();
        const deleteAction = row.locator('button[name="delete"]').or(row.getByRole('button').nth(1));
        
        await this.click(deleteAction);
        
        // Acknowledge the JS modal deletion confirmation gracefully
        await this.click(this.page.getByRole('button', { name: 'OK' }));
    }
}
