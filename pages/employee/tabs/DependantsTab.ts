import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../BasePage';

export interface DependantData {
    name: string;
    /** Date of Birth uses a calendar widget — plain fill does not stick; pick a day cell (default "15"). */
    dateOfBirthDay?: string;
    genderSearch: string;
    maritalStatusSearch: string;
    bloodGroupSearch: string;
    relationSearch: string;
    contactNo: string;
    nationalitySearch: string;
    /** Defaults in createDependant if omitted — backend rejects unset Religion / Country. */
    religionSearch?: string;
    countrySearch?: string;
    city?: string;
    icNumber?: string;
}

export class DependantsTab extends BasePage {
    private readonly tabButton = this.page.getByRole('tab', { name: 'Dependants' });
    private readonly addButton = this.page.getByRole('button', { name: ' Add Employee Dependant' });

    private readonly addDependantDialog: Locator = this.page
        .getByRole('dialog')
        .filter({ has: this.page.getByRole('heading', { name: 'Add Employee Dependant' }) });

    private readonly nameInput = this.addDependantDialog.getByRole('textbox', { name: 'Name *' });
    private readonly dateOfBirthInput = this.addDependantDialog.getByRole('textbox', { name: 'Date of Birth *' });

    private readonly genderButton = this.addDependantDialog.getByRole('combobox', { name: 'Select Gender' }).last();
    private readonly maritalStatusButton = this.addDependantDialog.getByRole('combobox', { name: 'Select Marital Status' }).last();
    private readonly bloodGroupButton = this.addDependantDialog.getByRole('combobox', { name: 'Select Blood Group' }).last();
    private readonly relationButton = this.addDependantDialog.getByRole('combobox', { name: 'Select Relation' }).last();

    private readonly contactNoInput = this.addDependantDialog.getByRole('textbox', { name: 'Contact No' });
    private readonly nationalityButton = this.addDependantDialog.getByRole('combobox', { name: 'Select Nationality' }).last();
    private readonly religionButton = this.addDependantDialog.getByRole('combobox', { name: 'Select Religion' }).last();
    private readonly countryButton = this.addDependantDialog.getByRole('combobox', { name: 'Select Country' }).last();

    private readonly cityInput = this.addDependantDialog.getByRole('textbox', { name: 'City' });
    private readonly icNumberInput = this.addDependantDialog.getByRole('textbox', { name: 'IC Number' });

    private readonly submitButton = this.addDependantDialog.getByRole('button', { name: 'Submit' });
    readonly createdHeading = this.page.getByRole('heading', { name: 'Employee Dependant Created' });

    constructor(page: Page) {
        super(page);
    }

    async navigateToTab(): Promise<void> {
        await this.click(this.page.getByRole('tab', { name: 'General', exact: true }));
        await this.page.waitForTimeout(500);
        await this.click(this.tabButton);
        await this.page.waitForTimeout(500);
    }

    async createDependant(data: DependantData): Promise<void> {
        await this.click(this.addButton);

        await this.clearAndFill(this.nameInput, data.name);
        await this.click(this.dateOfBirthInput);
        const dobDay = data.dateOfBirthDay ?? '15';
        await this.page.getByRole('cell', { name: dobDay, exact: true }).first().click();

        await this.selectBootstrapOption(this.genderButton, data.genderSearch);
        await this.selectBootstrapOption(this.maritalStatusButton, data.maritalStatusSearch);
        await this.selectBootstrapOption(this.bloodGroupButton, data.bloodGroupSearch);

        await this.selectBootstrapOption(this.relationButton, data.relationSearch);

        await this.clearAndFill(this.contactNoInput, data.contactNo);
        await this.selectBootstrapOption(this.nationalityButton, data.nationalitySearch);
        await this.selectBootstrapOption(this.religionButton, data.religionSearch ?? 'Isl');
        await this.selectBootstrapOption(this.countryButton, data.countrySearch ?? 'Malaysia');

        if (data.city) {
            await this.clearAndFill(this.cityInput, data.city);
        }
        if (data.icNumber) {
            await this.clearAndFill(this.icNumberInput, data.icNumber);
        }

        await this.scrollIntoView(this.submitButton);
        await this.click(this.submitButton);
    }
}
