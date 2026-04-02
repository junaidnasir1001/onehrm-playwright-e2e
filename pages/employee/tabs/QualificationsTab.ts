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
    
    private readonly addQualificationDialog = this.page.getByRole('dialog').filter({ has: this.page.getByRole('heading', { name: 'Add Employee Qualification' }) });
    
    private readonly instituteInput = this.addQualificationDialog.getByRole('textbox', { name: 'Institute/ School/ University' });
    private readonly educationLevelButton = this.addQualificationDialog.locator('button').filter({ hasText: 'Select Education Level' }).last();
    
    private readonly fromToInput = this.addQualificationDialog.getByRole('textbox', { name: 'From To' });
    private readonly majorSubjectInput = this.addQualificationDialog.getByRole('textbox', { name: 'Major Subject' });
    private readonly professionalSkillInput = this.addQualificationDialog.getByRole('textbox', { name: 'Professional Skill' });
    private readonly descInput = this.addQualificationDialog.getByRole('textbox', { name: 'Description' });
    
    private readonly submitButton = this.addQualificationDialog.getByRole('button', { name: 'Submit' });
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
        await this.selectBootstrapOption(this.educationLevelButton, data.educationLevelSearch, data.educationLevelSearch);
        
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
