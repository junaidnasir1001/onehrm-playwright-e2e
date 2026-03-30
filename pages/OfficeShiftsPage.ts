import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export interface ShiftDay {
    in?: string;
    out?: string;
    break?: string;
}

export interface OfficeShiftData {
    companySearch?: string;
    companyExpectedName?: string;
    name: string;
    typeSearch?: string;
    typeExpectedName?: string;
    timezoneSearch?: string;
    timezoneExpectedName?: string;
    relaxationTime?: string;
    days?: Record<string, ShiftDay>; // e.g. { monday: { in: '09:00', out: '18:00', break: '30' } }
}

/**
 * OfficeShiftsPage - Handles the Office Shifts module
 * URL: /office-shifts (implied)
 */
export class OfficeShiftsPage extends BasePage {
    // ── Navigation ───────────────────────────────────────────────────────────
    private readonly officeShiftsMenu = this.page.getByRole('link', { name: /Office Shifts$/i });

    // ── Forms / Actions ──────────────────────────────────────────────────────
    private readonly addShiftButton = this.page.getByRole('button', { name: ' Add Office Shift' });
    
    // Text / Spin inputs
    private readonly nameInput = this.page.getByRole('textbox', { name: 'Name *' });
    private readonly relaxationTimeInput = this.page.getByRole('spinbutton', { name: 'Relaxation Time (Minutes) *' });
    
    // Bootstrap Select dropdown triggers (Relying directly on codegen text filters)
    private readonly selectCompanyButton = this.page.locator('button').filter({ hasText: 'Select Company' });
    private readonly selectTypeButton = this.page.locator('button').filter({ hasText: 'Select Type' });
    private readonly selectTimezoneButton = this.page.locator('button').filter({ hasText: 'Select Timezone' });

    // Submit
    private readonly submitButton = this.page.getByRole('button', { name: 'Submit' });

    // ── Success Messages ─────────────────────────────────────────────────────
    readonly createdHeading = this.page.getByRole('heading', { name: /Office Shift Created/i });
    readonly updatedHeading = this.page.getByRole('heading', { name: /Office Shift Updated/i });
    readonly deletedHeading = this.page.getByRole('heading', { name: /Office Shift Deleted/i });

    constructor(page: Page) {
        super(page);
    }

    // ── Methods ──────────────────────────────────────────────────────────────

    async navigateTo(): Promise<void> {
        await this.click(this.officeShiftsMenu);
        await this.waitForPageLoad();
    }

    getShiftRow(name: string) {
        // Matches the row loosely by string interpolation
        return this.page.getByRole('row', { name: new RegExp(name) });
    }

    // ── CRUD Actions ─────────────────────────────────────────────────────────

    private async fillForm(data: Partial<OfficeShiftData>): Promise<void> {
        if (data.companySearch) {
            await this.selectBootstrapOption(
                this.selectCompanyButton, 
                data.companySearch, 
                data.companyExpectedName
            );
        }

        if (data.name) {
            await this.clearAndFill(this.nameInput, data.name);
        }

        if (data.typeSearch) {
            await this.selectBootstrapOption(
                this.selectTypeButton, 
                data.typeSearch, 
                data.typeExpectedName
            );
        }

        if (data.timezoneSearch) {
            await this.selectBootstrapOption(
                this.selectTimezoneButton, 
                data.timezoneSearch, 
                data.timezoneExpectedName
            );
        }

        if (data.relaxationTime) {
            await this.clearAndFill(this.relaxationTimeInput, data.relaxationTime);
        }

        // Mapping weekly iterative calendar schedule array targets
        if (data.days) {
            for (const [day, times] of Object.entries(data.days)) {
                if (times.in) {
                    await this.clearAndFill(this.page.locator(`#${day}-in`), times.in);
                }
                if (times.out) {
                    await this.clearAndFill(this.page.locator(`#${day}-out`), times.out);
                }
                if (times.break) {
                    await this.clearAndFill(this.page.locator(`#${day}-break`), times.break);
                }
            }
        }
    }

    async createShift(data: OfficeShiftData): Promise<void> {
        await this.click(this.addShiftButton);
        await this.fillForm(data);

        await this.scrollIntoView(this.submitButton);
        await this.click(this.submitButton);
    }

    async editShift(oldName: string, updates: Partial<OfficeShiftData>): Promise<void> {
        const row = this.getShiftRow(oldName);
        // The edit icon button
        await this.click(row.locator('button[name="edit"]').first());

        await this.fillForm(updates);

        await this.scrollIntoView(this.submitButton);
        await this.click(this.submitButton);
    }

    async deleteShift(name: string): Promise<void> {
        const row = this.getShiftRow(name);
        // The delete icon button
        await this.click(row.locator('button[name="delete"]').first());

        // Confirm dialog
        await this.click(this.page.getByRole('button', { name: 'OK' }));
    }
}
