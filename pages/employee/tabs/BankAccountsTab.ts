import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../BasePage';

export interface BankAccountData {
    accountTitle: string;
    accountNumber: string;
    bankSearch: string;
    bankCode?: string;
    bankBranch?: string;
    swiftCode?: string;
    isPrimary?: boolean;
}

export class BankAccountsTab extends BasePage {
    private readonly tabButton = this.page.getByRole('tab', { name: 'Bank Accounts' });
    private readonly addButton = this.page.getByRole('button', { name: ' Add Employee Bank Account' });

    /** Form is in a modal; old inline `#employee-bank-account-form` no longer exists on this screen. */
    private readonly addBankAccountDialog: Locator = this.page
        .getByRole('dialog')
        .filter({ has: this.page.getByRole('heading', { name: 'Add Employee Bank Account' }) });

    private readonly accountTitleInput = this.addBankAccountDialog.getByRole('textbox', { name: 'Account Title *' });
    private readonly accountNumberInput = this.addBankAccountDialog.getByRole('textbox', { name: 'Account Number *' });

    private readonly bankButton = this.addBankAccountDialog.getByRole('combobox', { name: 'Select Bank' }).last();

    private readonly bankCodeInput = this.addBankAccountDialog.getByRole('textbox', { name: 'Bank Code' });
    private readonly bankBranchInput = this.addBankAccountDialog.getByRole('textbox', { name: 'Bank Branch' });
    private readonly swiftCodeInput = this.addBankAccountDialog.getByRole('textbox', { name: 'Swift Code' });
    private readonly primaryCheckbox = this.addBankAccountDialog.getByRole('checkbox', { name: 'Is Primary' });

    private readonly submitButton = this.addBankAccountDialog.getByRole('button', { name: 'Submit' });
    readonly createdHeading = this.page.getByRole('heading', { name: 'Employee Bank Account Created' });

    constructor(page: Page) {
        super(page);
    }

    async navigateToTab(): Promise<void> {
        await this.click(this.page.getByRole('tab', { name: 'General', exact: true }));
        await this.page.waitForTimeout(500);
        await this.click(this.tabButton);
        await this.page.waitForTimeout(500);
    }

    async createBankAccount(data: BankAccountData): Promise<void> {
        await this.click(this.addButton);
        
        await this.clearAndFill(this.accountTitleInput, data.accountTitle);
        await this.clearAndFill(this.accountNumberInput, data.accountNumber);
        
        await this.selectBootstrapOption(this.bankButton, data.bankSearch);
        
        if (data.bankCode) await this.clearAndFill(this.bankCodeInput, data.bankCode);
        if (data.bankBranch) await this.clearAndFill(this.bankBranchInput, data.bankBranch);
        if (data.swiftCode) await this.clearAndFill(this.swiftCodeInput, data.swiftCode);
        
        if (data.isPrimary) {
            await this.primaryCheckbox.check({ force: true });
        }

        await this.scrollIntoView(this.submitButton);
        await this.click(this.submitButton);
    }
}
