import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export interface LeaveApplicationData {
    companySearch: string;
    departmentSearch?: string;
    employeeSearch: string;
    leaveTypeSearch: string;
    startDate: string;
    endDate: string;
    approvedFrom: string;
    approvedTo: string;
    leaveDurationSearch?: string;
    abroadDays?: string;
    leaveReason: string;
    replacementSearch?: string;
    recommendedBySearch?: string;
    statusSearch?: string;
    attachFilePath?: string;
}

export class LeaveApplicationsPage extends BasePage {
    // Navigation
    private readonly moduleLink = this.page.getByRole('link', { name: /Leave Management/i });
    private readonly subModuleLink = this.page.getByRole('link', { name: /Leave Applications/i });

    // List View
    private readonly addBtn = this.page.getByRole('button', { name: /Add Leave Application/i });
    readonly searchBox = this.page.getByRole('searchbox', { name: 'Search:' });

    // Form
    private readonly startDateInput = this.page.getByRole('textbox', { name: 'Start Date *' });
    private readonly endDateInput = this.page.getByRole('textbox', { name: 'End Date *' });
    private readonly approvedFromInput = this.page.getByRole('textbox', { name: 'Approved From *' });
    private readonly approvedToInput = this.page.getByRole('textbox', { name: 'Approved To *' });
    
    private readonly abroadDaysInput = this.page.getByRole('spinbutton', { name: 'Abroad Days' });
    private readonly leaveReasonInput = this.page.getByRole('textbox', { name: 'Leave Reason' });
    private readonly attachmentInput = this.page.getByRole('button', { name: 'Attachment' });
    private readonly submitBtn = this.page.getByRole('button', { name: 'Submit' });

    // Assertions
    readonly createdHeading = this.page.getByRole('heading', { name: 'Leave Application Created' });
    readonly updatedHeading = this.page.getByRole('heading', { name: 'Leave Application Updated' });
    readonly deletedHeading = this.page.getByRole('heading', { name: 'Leave Application Deleted' });

    constructor(page: Page) {
        super(page);
    }

    async navigateTo(): Promise<void> {
        await this.click(this.moduleLink);
        await this.waitForPageLoad();
        await this.click(this.subModuleLink);
        await this.waitForPageLoad();
    }

    async createApplication(data: LeaveApplicationData): Promise<void> {
        await this.click(this.addBtn);

        // Core Bootstrap relationships
        await this.selectBootstrapOption(
            this.page.locator('button').filter({ hasText: 'Select Company' }).last(),
            data.companySearch,
            data.companySearch
        );
        
        if (data.departmentSearch) {
            await this.selectBootstrapOption(
                this.page.locator('button').filter({ hasText: 'Select Department' }).last(),
                data.departmentSearch,
                data.departmentSearch
            );
        }

        await this.selectBootstrapOption(
            this.page.locator('button').filter({ hasText: 'Select Employee' }).last(),
            data.employeeSearch,
            data.employeeSearch
        );

        await this.selectBootstrapOption(
            this.page.locator('button').filter({ hasText: 'Select Leave Type' }).last(),
            data.leaveTypeSearch,
            data.leaveTypeSearch
        );

        // Native DOM evaluation bypassing Date Pickers
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

        await this.approvedFromInput.evaluate((el: HTMLInputElement, val) => {
            el.value = val;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
        }, data.approvedFrom);
        await this.approvedFromInput.blur();

        await this.approvedToInput.evaluate((el: HTMLInputElement, val) => {
            el.value = val;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
        }, data.approvedTo);
        await this.approvedToInput.blur();

        // Optional complex drop-downs
        if (data.leaveDurationSearch) {
            await this.selectBootstrapOption(
                this.page.locator('button').filter({ hasText: 'Select Leave Duration' }).last(),
                data.leaveDurationSearch,
                data.leaveDurationSearch
            );
        }

        if (data.abroadDays) await this.clearAndFill(this.abroadDaysInput, data.abroadDays);
        if (data.attachFilePath) await this.attachmentInput.setInputFiles(data.attachFilePath);
        
        await this.clearAndFill(this.leaveReasonInput, data.leaveReason);

        if (data.replacementSearch) {
            await this.selectBootstrapOption(
                this.page.locator('button').filter({ hasText: 'Select Replacement' }).last(),
                data.replacementSearch,
                data.replacementSearch
            );
        }

        if (data.recommendedBySearch) {
            await this.selectBootstrapOption(
                this.page.locator('button').filter({ hasText: 'Select Recommended By' }).last(),
                data.recommendedBySearch,
                data.recommendedBySearch
            );
        }

        if (data.statusSearch) {
            await this.selectBootstrapOption(
                this.page.locator('button').filter({ hasText: 'Select Status' }).last(),
                data.statusSearch,
                data.statusSearch
            );
        }

        await this.scrollIntoView(this.submitBtn);
        await this.click(this.submitBtn);
    }

    async searchApplication(searchTerm: string): Promise<void> {
        await this.clearAndFill(this.searchBox, searchTerm);
        await this.page.waitForTimeout(1500); // UI Debounce buffer
    }

    getApplicationRowCell(cellName: string): Locator {
        return this.page.getByRole('cell', { name: new RegExp(cellName, 'i') }).first();
    }

    async editApplication(targetRowContext: string, updatedStatus: string, rDate: string): Promise<void> {
        const row = this.page.locator(`tr:has-text("${targetRowContext}")`).first();
        const editAction = row.locator('a[href*="/edit"]');
        
        await this.click(editAction);
        await this.page.waitForTimeout(1500); // Bootstrap Modal AJAX stabilization buffer

        await this.page.evaluate((d) => {
            const fromField = document.querySelector('input[name="approved_from"]') as HTMLInputElement;
            if(fromField) fromField.value = d;
            const toField = document.querySelector('input[name="approved_to"]') as HTMLInputElement;
            if(toField) toField.value = d;
        }, rDate);
        
        await this.selectBootstrapOption(
            this.page.locator('button').filter({ hasText: /Pending|Select Status/ }).last(),
            updatedStatus,
            updatedStatus
        );

        await this.scrollIntoView(this.submitBtn);
        await this.click(this.submitBtn);
    }

    async deleteApplication(targetRowContext: string): Promise<void> {
        const row = this.page.locator(`tr:has-text("${targetRowContext}")`).first();
        const deleteAction = row.locator('button[name="delete"]').or(row.locator('.delete-leave-application'));
        
        await this.click(deleteAction);
        await this.click(this.page.getByRole('button', { name: 'OK' }));
    }
}
