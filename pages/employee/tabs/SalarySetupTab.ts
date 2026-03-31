import { Page } from '@playwright/test';
import { BasePage } from '../../BasePage';

export interface SalaryBasicData {
    salaryTypeSearch: string;
    basicSalary: string;
    paymentTypeSearch: string;
    allowanceAmount?: string;
}

export class SalarySetupTab extends BasePage {
    private readonly tabButton = this.page.getByRole('tab', { name: 'Salary Setup' });
    private readonly addBasicButton = this.page.getByRole('button', { name: ' Add Salary Basic' });
    
    private readonly effectiveDateInput = this.page.getByRole('textbox', { name: 'Effective Date *' });
    private readonly salaryTypeButton = this.page.locator('button').filter({ hasText: 'Select Salary Type' });
    private readonly basicSalaryInput = this.page.getByRole('textbox', { name: 'Basic Salary *' });
    private readonly paymentTypeButton = this.page.getByLabel('Salary Basic').locator('button').filter({ hasText: 'Select Payment Type' });
    
    private readonly addAllowanceButton = this.page.getByRole('button', { name: ' Add Allowance' });
    private readonly allowanceAmountInput = this.page.getByPlaceholder('Allowance Amount');
    
    private readonly submitButton = this.page.getByRole('button', { name: 'Submit' });
    readonly createdHeading = this.page.getByRole('heading', { name: 'Salary Basic Created' });

    constructor(page: Page) {
        super(page);
    }

    async navigateToTab(): Promise<void> {
        await this.click(this.tabButton);
        // Wait for tab content to render
        await this.page.waitForTimeout(500);
    }

    async createSalaryBasic(data: SalaryBasicData): Promise<void> {
        await this.click(this.addBasicButton);
        
        // Effective Date
        await this.click(this.effectiveDateInput);
        // pick first available cell (e.g., today or 1st of month)
        await this.page.getByRole('cell', { name: '1', exact: true }).first().click();

        await this.selectBootstrapOption(this.salaryTypeButton, data.salaryTypeSearch);
        await this.clearAndFill(this.basicSalaryInput, data.basicSalary);
        await this.selectBootstrapOption(this.paymentTypeButton, data.paymentTypeSearch);

        if (data.allowanceAmount) {
            await this.click(this.addAllowanceButton);
            
            // Allowances are loaded dynamically. The native select represents the raw type.
            // The codegen selected option '33' but that's a dynamic ID. 
            // We'll pick the first options using the native select dropdown index.
            const allowanceSelect = this.page.locator('select[name="allowance_types[]"]').last();
            await allowanceSelect.selectOption({ index: 1 });
            
            await this.clearAndFill(this.allowanceAmountInput.last(), data.allowanceAmount);
        }

        await this.scrollIntoView(this.submitButton);
        await this.click(this.submitButton);
    }
}
