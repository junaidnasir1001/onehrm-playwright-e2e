import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export interface LeaveAllocationData {
    companySearch: string;
    departmentSearch?: string;
    employeeSearch: string;
    leaveTypeSearch: string;
    startDate: string;
    endDate: string;
    totalLeaves: string;
    cfLeaves?: string;
    cfLeaveExpiry?: string;
    remarks: string;
}

export class LeaveAllocationsPage extends BasePage {
    // Navigation
    private readonly moduleLink = this.page.getByRole('link', { name: /Leave Management/i });
    private readonly subModuleLink = this.page.getByRole('link', { name: /Leave Allocations/i });

    // List View
    private readonly addBtn = this.page.getByRole('button', { name: /Add Leave Allocation/i });
    readonly searchBox = this.page.getByRole('searchbox', { name: 'Search:' });

    // Form
    private readonly startDateInput = this.page.getByRole('textbox', { name: 'Start Date *' });
    private readonly endDateInput = this.page.getByRole('textbox', { name: 'End Date *' });
    private readonly cfLeaveExpiryInput = this.page.getByRole('textbox', { name: 'Cf Leave Expiry' });
    private readonly totalLeavesInput = this.page.getByRole('spinbutton', { name: 'Total Leaves *' });
    private readonly cfLeavesInput = this.page.getByRole('spinbutton', { name: 'Cf Leaves' });
    private readonly remarksInput = this.page.getByRole('textbox', { name: 'Remarks' });
    private readonly submitBtn = this.page.getByRole('button', { name: 'Submit' });

    // Assertions
    readonly createdHeading = this.page.getByRole('heading', { name: 'Leave Allocation Created' });
    readonly updatedHeading = this.page.getByRole('heading', { name: 'Leave Allocation Updated' });
    readonly deletedHeading = this.page.getByRole('heading', { name: 'Leave Allocation Deleted' });

    constructor(page: Page) {
        super(page);
    }

    async navigateTo(): Promise<void> {
        await this.click(this.moduleLink);
        await this.waitForPageLoad();
        await this.click(this.subModuleLink);
        await this.waitForPageLoad();
    }

    async createAllocation(data: LeaveAllocationData): Promise<void> {
        await this.click(this.addBtn);

        // Bootstrap Pickers mappings
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

        // Native DOM evaluation resolving arbitrary Calendar mask rejections universally
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

        if (data.cfLeaveExpiry) {
            await this.cfLeaveExpiryInput.evaluate((el: HTMLInputElement, val) => {
                el.value = val;
                el.dispatchEvent(new Event('input', { bubbles: true }));
                el.dispatchEvent(new Event('change', { bubbles: true }));
            }, data.cfLeaveExpiry);
            await this.cfLeaveExpiryInput.blur();
        }

        await this.clearAndFill(this.totalLeavesInput, data.totalLeaves);
        
        if (data.cfLeaves) {
            await this.clearAndFill(this.cfLeavesInput, data.cfLeaves);
        }

        await this.clearAndFill(this.remarksInput, data.remarks);

        await this.scrollIntoView(this.submitBtn);
        await this.click(this.submitBtn);
    }

    async searchAllocation(searchTerm: string): Promise<void> {
        await this.clearAndFill(this.searchBox, searchTerm);
        await this.page.waitForTimeout(1500); // Standard Grid UI Debounce margin
    }

    getAllocationRowCell(cellName: string): Locator {
        return this.page.getByRole('cell', { name: new RegExp(cellName, 'i') }).first();
    }

    async editAllocation(targetRowContext: string, updatedCfLeaves: string): Promise<void> {
        // Atomic binding to prevent detached-node race conditions mid-render
        const row = this.page.locator(`tr:has-text("${targetRowContext}")`).first();
        const editAction = row.locator('button[name="edit"]').or(row.locator('.edit-leave-allocation'));
        
        await this.click(editAction);
        
        // Modal Stabilization Buffer: Prevent async Bootstrap AJAX bindings from silently overwriting Playwright's fill action
        await this.page.waitForTimeout(1500);
        
        await this.clearAndFill(this.cfLeavesInput, updatedCfLeaves);

        await this.scrollIntoView(this.submitBtn);
        await this.click(this.submitBtn);
    }

    async deleteAllocation(targetRowContext: string): Promise<void> {
        // Robust detached-dom protection mapping
        const row = this.page.locator(`tr:has-text("${targetRowContext}")`).first();
        const deleteAction = row.locator('button[name="delete"]').or(row.locator('.delete-leave-allocation'));
        
        await this.click(deleteAction);
        
        // Dismiss confirmation popup natively
        await this.click(this.page.getByRole('button', { name: 'OK' }));
    }
}
