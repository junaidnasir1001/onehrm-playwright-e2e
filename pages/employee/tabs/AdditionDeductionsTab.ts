import { Page } from '@playwright/test';
import { BasePage } from '../../BasePage';

export interface AdditionDeductionData {
    payrollSearch: string;
    transactionTypeSearch: string;
    reasonTypeSearch: string;
    amount: string;
    reason: string;
}

export class AdditionDeductionsTab extends BasePage {
    private readonly tabButton = this.page.getByRole('tab', { name: 'Addition Deductions' });
    private readonly addButton = this.page.getByRole('button', { name: ' Add Addition Deduction' });
    
    private readonly payrollButton = this.page.getByLabel('Addition Deductions').locator('button').filter({ hasText: 'Select Payroll' });
    private readonly transactionTypeButton = this.page.locator('button').filter({ hasText: 'Select Transaction Type' });
    private readonly reasonTypeButton = this.page.locator('button').filter({ hasText: 'Select Reason Type' });
    private readonly amountInput = this.page.getByRole('spinbutton', { name: 'Amount *' });
    private readonly reasonInput = this.page.getByRole('textbox', { name: 'Reason' });
    
    private readonly submitButton = this.page.getByRole('button', { name: 'Submit' });
    readonly createdHeading = this.page.getByRole('heading', { name: 'Salary Addition Deduction' });

    constructor(page: Page) {
        super(page);
    }

    async navigateToTab(): Promise<void> {
        // Need to open the parent tab first to reveal the sub-tabs
        await this.click(this.page.getByRole('tab', { name: 'Salary Setup', exact: true }));
        await this.page.waitForTimeout(500);
        await this.click(this.tabButton);
        await this.page.waitForTimeout(500);
    }

    async createAdditionDeduction(data: AdditionDeductionData): Promise<void> {
        await this.click(this.addButton);
        
        await this.selectBootstrapOption(this.payrollButton, data.payrollSearch);
        await this.selectBootstrapOption(this.transactionTypeButton, data.transactionTypeSearch);
        await this.selectBootstrapOption(this.reasonTypeButton, data.reasonTypeSearch);
        
        await this.clearAndFill(this.amountInput, data.amount);
        await this.clearAndFill(this.reasonInput, data.reason);

        await this.scrollIntoView(this.submitButton);
        await this.click(this.submitButton);
    }
}
