import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export interface HolidayData {
    calendarSearch: string;
    calendarExpectedName?: string;
    name: string;
    typeSearch: string;
    typeExpectedName?: string;
    startDateDay: string; // Day of the month to click on the calendar picker
    endDateDay: string;   // Day of the month to click on the calendar picker
    description?: string;
    toggleStatus?: boolean; // Toggles the .custom-control switch
}

/**
 * HolidaysPage - Handles the Holiday Management -> Holidays module
 * URL: /holidays
 */
export class HolidaysPage extends BasePage {
    // ── Navigation ───────────────────────────────────────────────────────────
    private readonly holidayManagementMenu = this.page.getByRole('link', { name: 'Holiday Management' });
    // Use Regex to allow leading spaces/icons, but anchor it with $ to avoid matching "Holidays Calendar"
    private readonly holidaysSubMenu = this.page.getByRole('link', { name: /Holidays$/i });

    // ── Create / Edit Form ───────────────────────────────────────────────────
    private readonly addHolidayButton = this.page.getByRole('button', { name: ' Add Holiday' });
    
    // Bootstrap Select dropdown triggers
    private readonly selectCalendarButton = this.page.locator('button').filter({ hasText: 'Select Holiday Calendar' });
    private readonly selectTypeButton = this.page.locator('button').filter({ hasText: 'Select Type' });

    // Text inputs
    private readonly nameInput = this.page.getByRole('textbox', { name: 'Name *' });
    private readonly startDateInput = this.page.getByRole('textbox', { name: 'Start Date *' });
    private readonly endDateInput = this.page.getByRole('textbox', { name: 'End Date' });
    private readonly descriptionInput = this.page.getByRole('textbox', { name: 'Description' });
    private readonly submitButton = this.page.getByRole('button', { name: 'Submit' });

    // Status toggle (Recording uses .custom-control for the switch)
    private readonly statusToggle = this.page.locator('.custom-control').first();

    // ── Success Messages ─────────────────────────────────────────────────────
    readonly createdHeading = this.page.getByRole('heading', { name: 'Holiday Created Successfully.' });
    readonly updatedHeading = this.page.getByRole('heading', { name: 'Holiday Updated Successfully.' });
    readonly deletedHeading = this.page.getByRole('heading', { name: 'Holiday Deleted Successfully.' });

    constructor(page: Page) {
        super(page);
    }

    // ── Methods ──────────────────────────────────────────────────────────────

    async navigateTo(): Promise<void> {
        await this.click(this.holidayManagementMenu);
        await this.click(this.holidaysSubMenu);
        await this.waitForPageLoad();
    }

    getHolidayRow(name: string) {
        return this.page.getByRole('row', { name: new RegExp(name) });
    }

    getHolidayCell(name: string) {
        return this.page.getByRole('cell', { name: name, exact: true });
    }

    // ── CRUD Actions ─────────────────────────────────────────────────────────

    /**
     * Fills the Holiday form
     */
    private async fillForm(data: Partial<HolidayData>): Promise<void> {
        if (data.calendarSearch) {
            await this.selectBootstrapOption(
                this.selectCalendarButton, 
                data.calendarSearch, 
                data.calendarExpectedName
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

        if (data.startDateDay) {
            await this.click(this.startDateInput);
            await this.click(this.page.getByRole('cell', { name: data.startDateDay, exact: true }).first());
        }

        if (data.endDateDay) {
            await this.click(this.endDateInput);
            await this.click(this.page.getByRole('cell', { name: data.endDateDay, exact: true }).first());
        }

        if (data.description !== undefined) {
            await this.clearAndFill(this.descriptionInput, data.description);
        }

        // Only explicitly interact with toggle if explicitly requested 
        // true usually implies keeping default (checked) or clicking if unchecked, 
        // but since we don't know initial state securely without reading it, 
        // we'll just click it if requested to ensure state change matching recording
        if (data.toggleStatus) {
            await this.click(this.statusToggle);
        }
    }

    async createHoliday(data: HolidayData): Promise<void> {
        await this.click(this.addHolidayButton);
        await this.fillForm(data);

        await this.scrollIntoView(this.submitButton);
        await this.click(this.submitButton);
    }

    async editHoliday(oldName: string, updates: Partial<HolidayData>): Promise<void> {
        const row = this.getHolidayRow(oldName);
        // The edit icon button inside the row
        await this.click(row.locator('button[name="edit"]').first());

        await this.fillForm(updates);

        await this.scrollIntoView(this.submitButton);
        await this.click(this.submitButton);
    }

    async deleteHoliday(name: string): Promise<void> {
        const row = this.getHolidayRow(name);
        // The delete icon button inside the row
        await this.click(row.locator('button[name="delete"]').first());

        // Confirm dialog
        await this.click(this.page.getByRole('button', { name: 'OK' }));
    }
}
