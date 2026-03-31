import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../BasePage';

export interface DocumentData {
    typeSearch: string;
    title: string;
    documentFilePath: string;
    documentNo: string;
    issueDate?: string;
    expiryDate?: string;
    description?: string;
    statusSearch: string;
}

export class DocumentsTab extends BasePage {
    private readonly tabButton = this.page.getByRole('tab', { name: 'Documents' });
    private readonly addButton = this.page.getByRole('button', { name: ' Add Employee Document' });

    /** Bootstrap keeps inactive tab panels in the DOM; scope modal fields so "Select Status" etc. stay unique. */
    private readonly addDocumentDialog: Locator = this.page
        .getByRole('dialog')
        .filter({ has: this.page.getByRole('heading', { name: 'Add Employee Document' }) });

    /** Bootstrap Select trigger; `.last()` prefers the visible toggle when a native select shares the same name. */
    private readonly typeButton = this.addDocumentDialog.getByRole('combobox', { name: 'Select Type' }).last();
    private readonly titleInput = this.addDocumentDialog.getByRole('textbox', { name: 'Title *' });
    /** Styled upload control: underlying file input is wired to this button (see CompanyPolicyPage). */
    private readonly documentFileInput = this.addDocumentDialog.locator('input[type="file"]');
    private readonly documentNoInput = this.addDocumentDialog.getByRole('textbox', { name: 'Document No *' });

    private readonly issueDateInput = this.addDocumentDialog.getByRole('textbox', { name: 'Issue Date' });
    private readonly expiryDateInput = this.addDocumentDialog.getByRole('textbox', { name: 'Expiry Date' });
    private readonly descInput = this.addDocumentDialog.getByRole('textbox', { name: 'Description' });

    private readonly statusButton = this.addDocumentDialog.getByRole('combobox', { name: 'Select Status' }).last();

    private readonly submitButton = this.addDocumentDialog.getByRole('button', { name: 'Submit' });
    readonly createdHeading = this.page.getByRole('heading', { name: 'Employee Document Created' });

    constructor(page: Page) {
        super(page);
    }

    async navigateToTab(): Promise<void> {
        await this.click(this.page.getByRole('tab', { name: 'General', exact: true }));
        await this.page.waitForTimeout(500);
        await this.click(this.tabButton);
        await this.page.waitForTimeout(500);
    }

    async createDocument(data: DocumentData): Promise<void> {
        await this.click(this.addButton);
        
        await this.selectBootstrapOption(this.typeButton, data.typeSearch);
        await this.clearAndFill(this.titleInput, data.title);
        await this.documentFileInput.setInputFiles(data.documentFilePath);
        await this.clearAndFill(this.documentNoInput, data.documentNo);
        
        if (data.issueDate) {
            await this.click(this.issueDateInput);
            await this.page.getByRole('cell', { name: '1', exact: true }).first().click();
        }

        if (data.expiryDate) {
            await this.click(this.expiryDateInput);
            await this.page.getByRole('cell', { name: '28', exact: true }).first().click();
        }

        if (data.description) {
            await this.clearAndFill(this.descInput, data.description);
        }

        await this.selectBootstrapOption(this.statusButton, data.statusSearch);

        await this.scrollIntoView(this.submitButton);
        await this.click(this.submitButton);
    }
}
