import { Page } from '@playwright/test';
import { BasePage } from '../../BasePage';

export interface SalaryLoanData {
    loanAmount: string;
    reason?: string;
    comment?: string;
}

export class LoansTab extends BasePage {
    private readonly tabButton = this.page.getByRole('tab', { name: 'Loans' });
    private readonly addButton = this.page.getByRole('button', { name: ' Add Salary Loan' });
    
    private readonly loanAmountInput = this.page.getByRole('textbox', { name: 'Loan Amount *' });
    private readonly startMonthYearInput = this.page.getByRole('textbox', { name: 'Start Month Year *' });
    private readonly endMonthYearInput = this.page.getByRole('textbox', { name: 'End Month Year *' });
    
    private readonly reasonInput = this.page.getByRole('textbox', { name: 'Reason' });
    private readonly commentInput = this.page.getByRole('textbox', { name: 'Comment' });
    
    private readonly createInstallmentsButton = this.page.getByRole('button', { name: ' Create Installments' });
    private readonly submitButton = this.page.getByRole('button', { name: 'Submit' });
    readonly createdHeading = this.page.getByRole('heading', { name: 'Salary Loan Created' });

    constructor(page: Page) {
        super(page);
    }

    async navigateToTab(): Promise<void> {
        await this.click(this.page.getByRole('tab', { name: 'Salary Setup', exact: true }));
        await this.page.waitForTimeout(500);
        await this.click(this.tabButton);
        await this.page.waitForTimeout(500);
    }

    async createSalaryLoan(data: SalaryLoanData): Promise<void> {
        await this.click(this.addButton);
        
        await this.clearAndFill(this.loanAmountInput, data.loanAmount);
        
        // Use exact months to avoid calendar navigation complexities in automation
        // Assuming current year, we will click Start Month Year, explicitly pick next month
        await this.click(this.startMonthYearInput);
        await this.page.locator('.datepicker-months .month').first().click(); // Pick Jan
        
        await this.click(this.endMonthYearInput);
        await this.page.locator('.datepicker-months .month').nth(11).click(); // Pick Dec

        if (data.reason) {
            await this.clearAndFill(this.reasonInput, data.reason);
        }
        if (data.comment) {
            await this.clearAndFill(this.commentInput, data.comment);
        }

        // Required step: Generate the installment breakdown grid
        await this.scrollIntoView(this.createInstallmentsButton);
        await this.click(this.createInstallmentsButton);
        // Wait for installments to generate
        await this.page.waitForTimeout(1000);

        await this.scrollIntoView(this.submitButton);
        await this.click(this.submitButton);
    }
}
