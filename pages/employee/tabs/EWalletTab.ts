import { Page } from '@playwright/test';
import { BasePage } from '../../BasePage';

export interface EWalletData {
    walletId: string;
    mobileNumber?: string;
    startDate?: boolean;
    endDate?: boolean;
    paymentTypeSearch: string;
    percentage: string;
    isActive?: boolean;
}

export class EWalletTab extends BasePage {
    private readonly tabButton = this.page.getByRole('tab', { name: 'E-Wallet' });
    private readonly addButton = this.page.getByRole('button', { name: ' Add Employee E Wallet' });
    
    private readonly walletIdInput = this.page.getByRole('textbox', { name: 'Wallet ID *' });
    private readonly mobileNumberInput = this.page.getByRole('textbox', { name: 'Mobile Number' });
    
    private readonly startDateInput = this.page.getByRole('textbox', { name: 'Start Date' });
    private readonly endDateInput = this.page.getByRole('textbox', { name: 'End Date' });
    
    private readonly paymentTypeButton = this.page.getByLabel('E-Wallet').locator('button').filter({ hasText: 'Select Payment Type' });
    private readonly percentageInput = this.page.getByRole('textbox', { name: 'Percentage' });
    private readonly activeCheckbox = this.page.locator('#employee-e-wallet-form > .row > .m-4 > .form-group > .custom-control');
    
    private readonly submitButton = this.page.locator('#employee-e-wallet-form').getByRole('button', { name: 'Submit' });
    readonly createdHeading = this.page.getByRole('heading', { name: 'Employee E-Wallet Created' });

    constructor(page: Page) {
        super(page);
    }

    async navigateToTab(): Promise<void> {
        await this.click(this.page.getByRole('tab', { name: 'General', exact: true }));
        await this.page.waitForTimeout(500);
        await this.click(this.tabButton);
        await this.page.waitForTimeout(500);
    }

    async createEWallet(data: EWalletData): Promise<void> {
        await this.click(this.addButton);
        
        await this.clearAndFill(this.walletIdInput, data.walletId);
        if (data.mobileNumber) {
            await this.clearAndFill(this.mobileNumberInput, data.mobileNumber);
        }

        if (data.startDate) {
            await this.click(this.startDateInput);
            await this.page.getByRole('cell', { name: '1', exact: true }).first().click();
        }
        if (data.endDate) {
            await this.click(this.endDateInput);
            await this.page.getByRole('cell', { name: '28', exact: true }).first().click();
        }

        await this.selectBootstrapOption(this.paymentTypeButton, data.paymentTypeSearch);
        await this.clearAndFill(this.percentageInput, data.percentage);

        if (data.isActive) {
            await this.click(this.activeCheckbox);
        }

        await this.scrollIntoView(this.submitButton);
        await this.click(this.submitButton);
    }
}
