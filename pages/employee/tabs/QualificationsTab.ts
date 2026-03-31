import { Page } from '@playwright/test';
import { BasePage } from '../../BasePage';

export interface QualificationData {
    institute: string;
    educationLevelSearch: string;
    fromTo: string;
    majorSubject: string;
    professionalSkill: string;
    description?: string;
}

export class QualificationsTab extends BasePage {
    private readonly tabButton = this.page.getByRole('tab', { name: 'Qualifications' });
    private readonly addButton = this.page.getByRole('button', { name: ' Add Employee Qualification' });
    
    private readonly instituteInput = this.page.getByRole('textbox', { name: 'Institute/ School/ University' });
    private readonly educationLevelButton = this.page.locator('#employee-qualification-form button[data-id="education_level_id"]');
    
    private readonly fromToInput = this.page.getByRole('textbox', { name: 'From To' });
    private readonly majorSubjectInput = this.page.getByRole('textbox', { name: 'Major Subject' });
    private readonly professionalSkillInput = this.page.getByRole('textbox', { name: 'Professional Skill' });
    private readonly descInput = this.page.getByRole('textbox', { name: 'Description' });
    
    private readonly submitButton = this.page.locator('#employee-qualification-form').getByRole('button', { name: 'Submit' });
    readonly createdHeading = this.page.getByRole('heading', { name: 'Employee Qualification' });

    constructor(page: Page) {
        super(page);
    }

    async navigateToTab(): Promise<void> {
        await this.click(this.page.getByRole('tab', { name: 'General', exact: true }));
        await this.page.waitForTimeout(500);
        await this.click(this.tabButton);
        await this.page.waitForTimeout(500);
    }

    async createQualification(data: QualificationData): Promise<void> {
        await this.click(this.addButton);
        
        await this.clearAndFill(this.instituteInput, data.institute);
        await this.selectBootstrapOption(this.educationLevelButton, data.educationLevelSearch);
        
        await this.clearAndFill(this.fromToInput, data.fromTo);
        await this.clearAndFill(this.majorSubjectInput, data.majorSubject);
        await this.clearAndFill(this.professionalSkillInput, data.professionalSkill);
        
        if (data.description) {
            await this.clearAndFill(this.descInput, data.description);
        }

        await this.scrollIntoView(this.submitButton);
        await this.click(this.submitButton);
    }
}
