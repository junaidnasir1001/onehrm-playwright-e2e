import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export interface AnnouncementData {
    title: string;
    startDate?: string;
    endDate?: string;
    description?: string;
    companySearch?: string;
    companyExpectedName?: string;
    departmentSearch?: string;
    departmentExpectedName?: string;
    announcementSearch?: string;
    announcementExpectedName?: string;
}

/**
 * AnnouncementsPage - Handles the Organization -> Announcements module
 * URL: /announcements (implied)
 */
export class AnnouncementsPage extends BasePage {
    // ── Navigation ───────────────────────────────────────────────────────────
    private readonly organizationMenu = this.page.getByRole('link', { name: 'Organization' });
    private readonly announcementsSubMenu = this.page.getByRole('link', { name: /Announcements$/i });

    // ── Forms / Actions ──────────────────────────────────────────────────────
    private readonly addAnnouncementButton = this.page.getByRole('button', { name: ' Add Announcement' });
    
    // Text inputs
    private readonly titleInput = this.page.getByRole('textbox', { name: 'Title *' });
    private readonly startDateInput = this.page.getByRole('textbox', { name: 'Start Date *' });
    private readonly endDateInput = this.page.getByRole('textbox', { name: 'End Date *' });
    private readonly descriptionInput = this.page.locator('#description');
    
    // Bootstrap Select dropdown triggers
    private readonly selectCompanyButton = this.page.locator('button[data-id="company_id"]');
    private readonly selectDepartmentButton = this.page.locator('button[data-id="department_id"]');
    private readonly selectAnnouncementButton = this.page.locator('button').filter({ hasText: 'Select Announcement' });

    // Submit
    private readonly submitButton = this.page.getByRole('button', { name: 'Submit' });

    // ── Success Messages ─────────────────────────────────────────────────────
    readonly createdHeading = this.page.getByRole('heading', { name: /Announcement Created/i });
    readonly updatedHeading = this.page.getByRole('heading', { name: /Announcement Updated/i });
    readonly deletedHeading = this.page.getByRole('heading', { name: /Announcement Deleted/i });

    constructor(page: Page) {
        super(page);
    }

    // ── Methods ──────────────────────────────────────────────────────────────

    async navigateTo(): Promise<void> {
        await this.click(this.organizationMenu);
        await this.click(this.announcementsSubMenu);
        await this.waitForPageLoad();
    }

    getAnnouncementRow(title: string) {
        // Matches the row loosely by string
        return this.page.getByRole('row', { name: new RegExp(title) });
    }

    // ── CRUD Actions ─────────────────────────────────────────────────────────

    private async fillForm(data: Partial<AnnouncementData>): Promise<void> {
        if (data.companySearch) {
            await this.selectBootstrapOption(
                this.selectCompanyButton, 
                data.companySearch, 
                data.companyExpectedName
            );
        }

        if (data.departmentSearch) {
            await this.selectBootstrapOption(
                this.selectDepartmentButton, 
                data.departmentSearch, 
                data.departmentExpectedName
            );
        }

        if (data.title) {
            await this.clearAndFill(this.titleInput, data.title);
        }

        if (data.startDate) {
            await this.clearAndFill(this.startDateInput, data.startDate);
            await this.startDateInput.press('Enter');
        }

        if (data.endDate) {
            await this.clearAndFill(this.endDateInput, data.endDate);
            await this.endDateInput.press('Enter');
        }

        if (data.description) {
            await this.clearAndFill(this.descriptionInput, data.description);
        }

        if (data.announcementSearch) {
            // Note: In the form sequence this occurs after Description
            await this.selectBootstrapOption(
                this.selectAnnouncementButton, 
                data.announcementSearch, 
                data.announcementExpectedName
            );
        }
    }

    async createAnnouncement(data: AnnouncementData): Promise<void> {
        await this.click(this.addAnnouncementButton);
        await this.fillForm(data);

        await this.scrollIntoView(this.submitButton);
        await this.click(this.submitButton);
    }

    async editAnnouncement(oldTitle: string, updates: Partial<AnnouncementData>): Promise<void> {
        const row = this.getAnnouncementRow(oldTitle);
        // The edit icon button
        await this.click(row.locator('button[name="edit"]').first());

        await this.fillForm(updates);

        await this.scrollIntoView(this.submitButton);
        await this.click(this.submitButton);
    }

    async deleteAnnouncement(title: string): Promise<void> {
        const row = this.getAnnouncementRow(title);
        // The delete icon button
        await this.click(row.locator('button[name="delete"]').first());

        // Confirm dialog
        await this.click(this.page.getByRole('button', { name: 'OK' }));
    }
}
