import { Page } from '@playwright/test';
import { BasePage } from '../../BasePage';

export interface WorkExperienceData {
    companyName: string;
    position: string;
    toYear: string;
    description?: string;
}

export class WorkExperiencesTab extends BasePage {
    private readonly tabButton = this.page.getByRole('tab', { name: 'Work Experiences' });
    private readonly addButton = this.page.getByRole('button', { name: ' Add Employee Work Experience' });
    
    private readonly companyNameInput = this.page.getByRole('textbox', { name: 'Company Name *' });
    private readonly positionInput = this.page.getByRole('textbox', { name: 'Position *' });
    private readonly toYearInput = this.page.getByRole('textbox', { name: 'To Year' });
    private readonly descInput = this.page.getByRole('textbox', { name: 'Description' });
    
    private readonly submitButton = this.page.locator('#employee-work-experience-form').getByRole('button', { name: 'Submit' });
    readonly createdHeading = this.page.getByRole('heading', { name: 'Employee Work Experience' });

    constructor(page: Page) {
        super(page);
    }

    async navigateToTab(): Promise<void> {
        await this.click(this.page.getByRole('tab', { name: 'General', exact: true }));
        await this.page.waitForTimeout(500);
        await this.click(this.tabButton);
        await this.page.waitForTimeout(500);
    }

    async createWorkExperience(data: WorkExperienceData): Promise<void> {
        await this.click(this.addButton);
        
        await this.clearAndFill(this.companyNameInput, data.companyName);
        await this.clearAndFill(this.positionInput, data.position);
        
        await this.clearAndFill(this.toYearInput, data.toYear);
        // Press Escape in case the datepicker blocks other inputs 
        await this.toYearInput.press('Escape');

        if (data.description) {
            await this.clearAndFill(this.descInput, data.description);
        }

        await this.scrollIntoView(this.submitButton);
        await this.click(this.submitButton);
    }
}
