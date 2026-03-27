import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export interface HolidayCalendarData {
    name: string;
    description?: string;
    country: string;
    state: string;
    timezone: string;
    weekendDays: string[];
}

/**
 * HolidayCalendarPage - Handles the Holiday Management -> Holidays Calendar module
 * URL: /holiday-calendars
 */
export class HolidayCalendarPage extends BasePage {
    // ── Navigation ───────────────────────────────────────────────────────────
    private readonly holidayManagementMenu = this.page.getByRole('link', { name: 'Holiday Management' });
    private readonly holidayCalendarSubMenu = this.page.getByRole('link', { name: 'M Holidays Calendar' });

    // ── Create / Edit Form ───────────────────────────────────────────────────
    private readonly addCalendarButton = this.page.getByRole('button', { name: ' Add Holiday Calendar' });
    private readonly nameInput = this.page.getByRole('textbox', { name: 'Name *' });
    private readonly stateInput = this.page.getByRole('textbox', { name: 'State *' });
    private readonly descriptionInput = this.page.getByRole('textbox', { name: 'Description' });
    private readonly submitButton = this.page.getByRole('button', { name: 'Submit' });

    // ── Bootstrap Select (Comboboxes) ────────────────────────────────────────
    private readonly selectCountryButton = this.page.locator('button').filter({ hasText: 'Select Country' });
    private readonly selectTimezoneButton = this.page.locator('button').filter({ hasText: 'Select Timezone' });
    private readonly selectWeekendDaysButton = this.page.locator('button[data-id="weekends"]');

    // The search input appears inside whichever Bootstrap dropdown is currently open
    private readonly dropdownSearchInput = this.page.getByRole('combobox', { name: 'Search' });

    // ── Success Messages ─────────────────────────────────────────────────────
    readonly createdHeading = this.page.getByRole('heading', { name: 'Holiday Calendar Created' });
    readonly updatedHeading = this.page.getByRole('heading', { name: 'Holiday Calendar Updated' });
    readonly deletedHeading = this.page.getByRole('heading', { name: 'Holiday Calendar Deleted' });

    constructor(page: Page) {
        super(page);
    }

    // ── Methods ──────────────────────────────────────────────────────────────

    async navigateTo(): Promise<void> {
        await this.click(this.holidayManagementMenu);
        await this.click(this.holidayCalendarSubMenu);
        await this.waitForPageLoad();
    }

    getCalendarCell(name: string) {
        return this.page.getByRole('cell', { name: name, exact: true });
    }

    // ── Bootstrap Dropdown Helpers ───────────────────────────────────────────

    // Inherits selectBootstrapOption and selectMultipleBootstrapOptions from BasePage

    // ── CRUD Actions ─────────────────────────────────────────────────────────

    async createCalendar(data: HolidayCalendarData): Promise<void> {
        await this.click(this.addCalendarButton);

        await this.fill(this.nameInput, data.name);

        await this.selectBootstrapOption(this.selectCountryButton, data.country);

        await this.fill(this.stateInput, data.state);

        await this.selectBootstrapOption(this.selectTimezoneButton, data.timezone);

        if (data.description) {
            await this.fill(this.descriptionInput, data.description);
        }

        // Pass the modal heading as a click context to dismiss the dropdown overlay
        await this.selectMultipleBootstrapOptions(
            this.selectWeekendDaysButton, 
            data.weekendDays,
            this.page.getByRole('heading', { name: 'Add Holiday Calendar' }).first()
        );

        await this.scrollIntoView(this.submitButton);
        await this.click(this.submitButton);
    }

    async editCalendar(oldName: string, newName: string): Promise<void> {
        const row = this.page.getByRole('row', { name: new RegExp(oldName) });
        // The edit icon button
        await this.click(row.locator('button[name="edit"]').first());

        await this.clearAndFill(this.nameInput, newName);

        await this.scrollIntoView(this.submitButton);
        await this.click(this.submitButton);
    }

    async deleteCalendar(name: string): Promise<void> {
        const row = this.page.getByRole('row', { name: new RegExp(name) });
        // The delete icon button
        await this.click(row.locator('button[name="delete"]').first());

        // Confirm dialog
        await this.click(this.page.getByRole('button', { name: 'OK' }));
    }
}
