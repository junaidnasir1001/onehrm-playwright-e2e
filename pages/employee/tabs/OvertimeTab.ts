import { Page } from '@playwright/test';
import { BasePage } from '../../BasePage';

export interface OvertimeData {
    payrollSearch: string;
    dayTypeSearch: string;
    requestedStart: string;
    requestedEnd: string;
    approvedStart: string;
    approvedEnd: string;
    hours: string;
    description: string;
    remarks: string;
    statusSearch: string;
}

export class OvertimeTab extends BasePage {
    private readonly tabButton = this.page.getByRole('tab', { name: 'Overtime' });
    private readonly addButton = this.page.getByRole('button', { name: ' Add Salary Overtime' });
    
    private readonly payrollButton = this.page.getByLabel('Overtime').locator('button').filter({ hasText: 'Select Payroll' });
    private readonly dayTypeButton = this.page.locator('button').filter({ hasText: 'Select Day Type' });
    private readonly dateInput = this.page.getByRole('textbox', { name: 'Date *' });
    
    private readonly reqStartInput = this.page.getByRole('textbox', { name: 'Requested Start Time *' });
    private readonly reqEndInput = this.page.getByRole('textbox', { name: 'Requested End Time *' });
    private readonly appStartInput = this.page.getByRole('textbox', { name: 'Approved Start Time *' });
    private readonly appEndInput = this.page.getByRole('textbox', { name: 'Approved End Time *' });
    private readonly hoursInput = this.page.getByRole('spinbutton', { name: 'Hours *' });
    
    private readonly descInput = this.page.getByRole('textbox', { name: 'Description' });
    private readonly remarksInput = this.page.getByRole('textbox', { name: 'Remarks' });
    
    private readonly statusButton = this.page.getByLabel('Overtime').locator('button').filter({ hasText: 'Select Status' });
    
    private readonly submitButton = this.page.getByRole('button', { name: 'Submit' });
    readonly createdHeading = this.page.getByRole('heading', { name: 'Salary Overtime Created' });

    constructor(page: Page) {
        super(page);
    }

    async navigateToTab(): Promise<void> {
        await this.click(this.page.getByRole('tab', { name: 'Salary Setup', exact: true }));
        await this.page.waitForTimeout(500);
        await this.click(this.tabButton);
        await this.page.waitForTimeout(500);
    }

    async createOvertime(data: OvertimeData): Promise<void> {
        await this.click(this.addButton);
        
        await this.selectBootstrapOption(this.payrollButton, data.payrollSearch);
        await this.selectBootstrapOption(this.dayTypeButton, data.dayTypeSearch);
        
        await this.click(this.dateInput);
        await this.page.getByRole('cell', { name: '1', exact: true }).first().click();

        await this.clearAndFill(this.reqStartInput, data.requestedStart);
        await this.clearAndFill(this.reqEndInput, data.requestedEnd);
        await this.clearAndFill(this.appStartInput, data.approvedStart);
        // Workaround for time widget overlay logic
        await this.clearAndFill(this.appEndInput, data.approvedEnd);
        await this.appEndInput.press('Tab'); // close time picker without closing modal

        await this.clearAndFill(this.hoursInput, data.hours);
        await this.clearAndFill(this.descInput, data.description);
        await this.clearAndFill(this.remarksInput, data.remarks);

        await this.selectBootstrapOption(this.statusButton, data.statusSearch);

        await this.scrollIntoView(this.submitButton);
        await this.click(this.submitButton);
    }
}
