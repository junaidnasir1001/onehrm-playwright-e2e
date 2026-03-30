import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export interface EmployeeData {
    prefix?: string;
    fullName: string;
    username: string;
    email: string;
    contactNo: string;
    dateOfBirth?: string;  // format: DD-MM-YYYY
    gender?: string;
    maritalStatus?: string;
    company?: string;
    department?: string;
    designation?: string;
    officeShift?: string;
    holidayCalendar?: string;
    workingStatus?: string;
    password: string;
    confirmPassword: string;
}

/**
 * EmployeeFormPage — handles the "Add Employee" creation form
 * (the main form, not the profile tabs)
 */
export class EmployeeFormPage extends BasePage {
    // ── Form inputs ───────────────────────────────────────────────────────────
    private readonly prefixButton = this.page.locator('button').filter({ hasText: 'Select Prefix' });
    private readonly fullNameInput = this.page.getByRole('textbox', { name: 'Full Name *' });
    private readonly usernameInput = this.page.getByRole('textbox', { name: 'Username *' });
    private readonly emailInput = this.page.getByRole('textbox', { name: 'Email *' });
    private readonly contactNoInput = this.page.getByRole('spinbutton', { name: 'Contact No *' });
    private readonly dobInput = this.page.getByRole('textbox', { name: 'Date Of Birth *' });
    private readonly genderButton = this.page.locator('button').filter({ hasText: 'Select Gender' });
    private readonly maritalStatusButton = this.page.locator('button').filter({ hasText: 'Select Marital Status' });

    // Scoped to #employee-form to avoid matching table filter buttons
    private readonly companyButton = this.page.locator('#employee-form button').filter({ hasText: 'Select Company' });
    private readonly departmentButton = this.page.locator('#employee-form button').filter({ hasText: 'Select Department' });
    // Designation button changes its text after department loads — we re-locate it dynamically in createEmployee
    private readonly designationButtonSelector = '#employee-form button[data-id="designation_id"]';

    private readonly officeShiftButton = this.page.locator('button').filter({ hasText: 'Select Office Shift' });
    private readonly holidayCalendarButton = this.page.locator('button').filter({ hasText: 'Select Holiday Calendar' });
    private readonly joiningDateInput = this.page.getByRole('textbox', { name: 'Joining Date *' });
    private readonly workingStatusButton = this.page.locator('button').filter({ hasText: 'Select Working Status' });
    private readonly passwordInput = this.page.getByRole('textbox', { name: 'Password *', exact: true });
    private readonly confirmPasswordInput = this.page.getByRole('textbox', { name: 'Confirm Password *' });
    private readonly submitButton = this.page.getByRole('button', { name: 'Submit' });

    // ── Success ───────────────────────────────────────────────────────────────
    readonly createdHeading = this.page.getByRole('heading', { name: /Employee Created Successfully/i });

    constructor(page: Page) {
        super(page);
    }

    async createEmployee(data: EmployeeData): Promise<void> {
        if (data.prefix) {
            await this.selectBootstrapOption(this.prefixButton, data.prefix);
        }

        await this.clearAndFill(this.fullNameInput, data.fullName);
        await this.clearAndFill(this.usernameInput, data.username);
        await this.clearAndFill(this.emailInput, data.email);
        await this.clearAndFill(this.contactNoInput, data.contactNo);

        if (data.dateOfBirth) {
            // Freetext fill gets cleared by the calendar widget. 
            // We'll click the input to open the calendar, then click the first available day.
            await this.click(this.dobInput);
            await this.page.getByRole('cell', { name: '1', exact: true }).first().click();
        }

        if (data.gender) {
            await this.selectBootstrapOption(this.genderButton, data.gender);
        }
        if (data.maritalStatus) {
            await this.selectBootstrapOption(this.maritalStatusButton, data.maritalStatus);
        }
        if (data.company) {
            await this.selectBootstrapOption(this.companyButton, data.company);
            // Wait for Department options to populate (AJAX cascade after Company selection)
            await this.waitForNetworkIdle({ timeout: 10000 });
        }
        if (data.department) {
            await this.selectBootstrapOption(this.departmentButton, data.department);
            // Wait for Designation options to populate (AJAX cascade after Department selection)
            await this.waitForNetworkIdle({ timeout: 10000 });
            // Extra guard: wait until the Designation button exists and is visible
            await this.page.locator(this.designationButtonSelector).waitFor({ state: 'visible', timeout: 10000 });
        }
        if (data.designation) {
            const designationBtn = this.page.locator(this.designationButtonSelector);
            await this.selectBootstrapOption(designationBtn, data.designation);
        }
        if (data.officeShift) {
            await this.selectBootstrapOption(this.officeShiftButton, data.officeShift);
        }
        if (data.holidayCalendar) {
            await this.selectBootstrapOption(this.holidayCalendarButton, data.holidayCalendar);
        }

        // Joining Date — click today's first available date cell
        await this.click(this.joiningDateInput);
        await this.page.getByRole('cell', { name: '1', exact: true }).first().click();

        if (data.workingStatus) {
            await this.selectBootstrapOption(this.workingStatusButton, data.workingStatus);
        }

        await this.clearAndFill(this.passwordInput, data.password);
        await this.clearAndFill(this.confirmPasswordInput, data.confirmPassword);

        await this.scrollIntoView(this.submitButton);
        await this.click(this.submitButton);
    }
}
