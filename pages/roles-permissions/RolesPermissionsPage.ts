import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * RolesPermissionsPage - Handles the Roles & Permissions module
 * URL: /roles-permissions
 */
export class RolesPermissionsPage extends BasePage {
    // Navigation
    private readonly sidebarLink = this.page.getByRole('link', { name: ' Roles & Permissions' });

    // List view
    private readonly roleNameHeader = this.page.getByRole('button', { name: 'Role Name' });

    // Create role form
    private readonly addRoleButton = this.page.getByRole('button', { name: ' Add Role' });
    private readonly roleNameInput = this.page.getByRole('textbox', { name: 'Role Name *' });
    private readonly descriptionInput = this.page.getByRole('textbox', { name: 'Description' });

    // Success messages
    readonly successHeading = this.page.getByRole('heading', { name: 'Role Created Successfully.' });
    readonly permissionsUpdatedHeading = this.page.getByRole('heading', { name: 'Permissions updated' });
    readonly roleUpdatedHeading = this.page.getByRole('heading', { name: 'Role Updated Successfully.' });

    constructor(page: Page) {
        super(page);
    }

    // ── Navigation ───────────────────────────────────────────────────────────

    async navigateTo(): Promise<void> {
        await this.click(this.sidebarLink);
        await this.waitForPageLoad();
    }

    // ── List view ────────────────────────────────────────────────────────────

    async sortByRoleName(): Promise<void> {
        await this.click(this.roleNameHeader);
    }

    getRoleCell(roleName: string) {
        return this.page.getByRole('cell', { name: roleName, exact: true });
    }

    // ── Create Role ──────────────────────────────────────────────────────────

    async createRole(roleName: string, description: string): Promise<void> {
        await this.click(this.addRoleButton);
        await this.fill(this.roleNameInput, roleName);
        await this.fill(this.descriptionInput, description);
        await this.click(this.page.getByRole('button', { name: 'Submit' }));
    }

    // ── Assign Permissions ───────────────────────────────────────────────────

    /**
     * Open the permissions panel for a given role
     * (the permissions icon is the second action link in the role's row)
     */
    async openPermissionsPanel(roleName: string): Promise<void> {
        const roleRow = this.page.getByRole('row', { name: new RegExp(roleName) });
        // Use an aggressive fallback cascade: strictly target permission hrefs or titles before degrading to raw indexing
        const permissionAction = roleRow.locator('a[href*="permission"]').or(roleRow.locator('[title*="Permission" i]')).or(roleRow.getByRole('link').nth(1)).or(roleRow.getByRole('link').first()).first();
        await this.click(permissionAction);
        await this.waitForPageLoad();
    }

    /**
     * Toggle a permission tree item by its exact label.
     * exact:true is required — e.g. 'Attendances' otherwise matches
     * all child items like 'Import Attendances', 'Monthly Attendances' etc.
     */
    async togglePermission(permissionName: string): Promise<void> {
        await this.click(this.page.getByRole('treeitem', { name: permissionName, exact: true }));
    }

    async togglePermissions(permissions: string[]): Promise<void> {
        for (const permission of permissions) {
            await this.togglePermission(permission);
        }
    }

    /**
     * Save permissions — scrolls submit into view before clicking
     */
    async savePermissions(): Promise<void> {
        const submitBtn = this.page.getByRole('button', { name: 'Submit' });
        await this.scrollIntoView(submitBtn);
        await this.click(submitBtn);
    }

    // ── Assign Role to Employee ──────────────────────────────────────────────

    /**
     * Open the assign-role modal for a given role row.
     * The button is icon-only (no accessible text), so we scope to the row
     * and take the first button — which is the assign-role action.
     */
    async openAssignRoleModal(roleName: string): Promise<void> {
        const roleRow = this.page.getByRole('row', { name: new RegExp(roleName) });
        await this.click(roleRow.getByRole('button').first());
    }

    /**
     * Search for and select an employee in the assign-role modal dropdown.
     * Uses global Bootstrap Select helper inherited from BasePage.
     *
     * After selecting, the Bootstrap overlay sometimes stays open and blocks Submit.
     * Clicking the modal heading dismisses it (mirrors original recording).
     */
    async selectEmployee(searchTerm: string, employeeName: string): Promise<void> {
        await this.selectBootstrapOption(
            this.page.locator('button').filter({ hasText: /Select Employee/i }).last(),
            searchTerm,
            employeeName
        );

        // Wait for overlay to be dismissible, then close it
        await this.page.waitForTimeout(300); // Brief pause for DOM to settle
        const dialog = this.page.getByRole('dialog').first();
        await dialog.waitFor({ state: 'visible' });
        const heading = dialog.getByRole('heading').first();
        await this.click(heading);

        // Ensure overlay is gone before returning
        await this.page.waitForTimeout(200);
    }

    /**
     * Submit the assign-role modal
     */
    async submitAssignRole(): Promise<void> {
        await this.click(this.page.getByRole('button', { name: 'Submit' }));
    }

    /**
     * Get the assigned employee text in the roles list
     */
    getAssignedEmployee(employeeName: string) {
        return this.page.getByRole('cell', { name: employeeName });
    }

    // ── Edit Role ────────────────────────────────────────────────────────────

    /**
     * Open the edit-role modal for a given role row.
     * Buttons in the row are icon-only. Order: [0] assign-role, [1] edit-role.
     */
    async openEditRoleModal(roleName: string): Promise<void> {
        const roleRow = this.page.getByRole('row', { name: new RegExp(roleName) });
        await this.click(roleRow.getByRole('button').nth(1));
    }

    /**
     * Edit an existing role — clears and refills name and description.
     * Replaces all the ArrowLeft keystroke noise from the raw recording.
     */
    async editRole(newRoleName: string, newDescription?: string): Promise<void> {
        await this.clearAndFill(this.page.getByRole('textbox', { name: 'Role Name *' }), newRoleName);
        if (newDescription !== undefined) {
            await this.clearAndFill(this.page.getByRole('textbox', { name: 'Description' }), newDescription);
        }
        await this.click(this.page.getByRole('button', { name: 'Submit' }));
    }
}
