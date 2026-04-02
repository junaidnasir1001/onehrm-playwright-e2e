import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * EmployeeListPage — handles the Employee Lists landing page
 * (navigation, search, filter, finding employee rows)
 */
export class EmployeeListPage extends BasePage {
    // ── Navigation ───────────────────────────────────────────────────────────
    private readonly employeesMenu = this.page.getByRole('link', { name: '  Employees' });
    private readonly employeeListsLink = this.page.getByRole('link', { name: ' Employee Lists' });

    // ── Search ────────────────────────────────────────────────────────────────
    readonly searchBox = this.page.getByRole('searchbox', { name: 'Search:' });

    // ── Add ───────────────────────────────────────────────────────────────────
    readonly addEmployeeButton = this.page.getByRole('button', { name: ' Add Employee' });

    // ── Filter panel ─────────────────────────────────────────────────────────
    private readonly filterButton = this.page.getByRole('button', { name: ' Filter' });
    private readonly filterCompanyButton = this.page.locator('#collapseFilter button').filter({ hasText: 'Select Company' });
    private readonly filterDepartmentButton = this.page.locator('#collapseFilter button').filter({ hasText: 'Select Department' });
    private readonly filterDesignationButton = this.page.locator('#collapseFilter button').filter({ hasText: 'Select Designation' });
    private readonly filterStatusButton = this.page.locator('#collapseFilter button').filter({ hasText: 'Select Status' });
    private readonly applyFilterButton = this.page.getByRole('button', { name: 'Filter', exact: true });
    private readonly clearFilterLink = this.page.getByRole('link', { name: 'Clear' });

    constructor(page: Page) {
        super(page);
    }

    async navigateTo(): Promise<void> {
        await this.click(this.employeesMenu);
        await this.click(this.employeeListsLink);
        await this.waitForPageLoad();
    }

    async navigateToListFromProfile(): Promise<void> {
        await this.click(this.employeeListsLink);
        await this.waitForPageLoad();
    }

    /**
     * Search in the datatable search box and click the employee link.
     */
    async openEmployee(searchTerm: string, employeeName: string): Promise<void> {
        await this.clearAndFill(this.searchBox, searchTerm);
        await this.click(this.page.getByRole('link', { name: employeeName }));
        await this.waitForPageLoad();
    }

    /**
     * Apply list filters. All params are optional.
     */
    async filterEmployees(params: {
        company?: string;
        department?: string;
        designation?: string;
        status?: string;
    }): Promise<void> {
        await this.click(this.filterButton);
        if (params.company) await this.selectBootstrapOption(this.filterCompanyButton, params.company);
        if (params.department) await this.selectBootstrapOption(this.filterDepartmentButton, params.department);
        if (params.designation) await this.selectBootstrapOption(this.filterDesignationButton, params.designation);
        if (params.status) await this.selectBootstrapOption(this.filterStatusButton, params.status);
        await this.click(this.applyFilterButton);
    }

    async clearFilters(): Promise<void> {
        await this.click(this.clearFilterLink);
    }
}
