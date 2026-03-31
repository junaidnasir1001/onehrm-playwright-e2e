import { Page } from '@playwright/test';
import { BasePage } from '../../BasePage';

export interface EmergencyContactData {
    relationSearch: string;
    name: string;
    phone: string;
    email: string;
    address?: string;
    isPrimary?: boolean;
}

export class EmergencyContactsTab extends BasePage {
    private readonly tabButton = this.page.getByRole('tab', { name: 'Emergency Contacts' });
    private readonly addButton = this.page.getByRole('button', { name: ' Add Employee Emergency' });
    
    private readonly relationButton = this.page.getByLabel('Emergency Contacts').locator('button').filter({ hasText: 'Select Relation' });
    private readonly nameInput = this.page.getByRole('textbox', { name: 'Name *' });
    private readonly phoneInput = this.page.getByRole('textbox', { name: 'Phone *' });
    private readonly emailInput = this.page.getByRole('textbox', { name: 'Email *' });
    private readonly addressInput = this.page.getByRole('textbox', { name: 'Address' });
    private readonly primaryCheckbox = this.page.locator('#employee-emergency-contact-form').getByText('Is Primary');
    
    private readonly submitButton = this.page.getByRole('button', { name: 'Submit' });
    readonly createdHeading = this.page.getByRole('heading', { name: 'Employee Emergency Contact' });

    constructor(page: Page) {
        super(page);
    }

    async navigateToTab(): Promise<void> {
        await this.click(this.page.getByRole('tab', { name: 'General', exact: true }));
        await this.page.waitForTimeout(500);
        await this.click(this.tabButton);
        await this.page.waitForTimeout(500);
    }

    async createEmergencyContact(data: EmergencyContactData): Promise<void> {
        await this.click(this.addButton);
        
        await this.selectBootstrapOption(this.relationButton, data.relationSearch);
        await this.clearAndFill(this.nameInput, data.name);
        await this.clearAndFill(this.phoneInput, data.phone);
        await this.clearAndFill(this.emailInput, data.email);
        
        if (data.address) {
            await this.clearAndFill(this.addressInput, data.address);
        }

        if (data.isPrimary) {
            await this.click(this.primaryCheckbox);
        }

        await this.scrollIntoView(this.submitButton);
        await this.click(this.submitButton);
    }
}
