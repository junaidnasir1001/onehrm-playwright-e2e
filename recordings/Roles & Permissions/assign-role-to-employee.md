import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://v2.onehrm.com.my/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('pukat-admin');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin@1234');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('heading', { name: 'Welcome Ahmad' }).click();
  await page.getByRole('link', { name: ' Roles & Permissions' }).click();
  await page.getByRole('row', { name: 'Supervisor Unassigned sup' }).locator('button[name="assign-role"]').click();
  await page.getByRole('combobox', { name: 'Select Employee' }).click();
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Test');
  await page.locator('#bs-select-1-0').click();
  await page.locator('#assign-role-modal > .modal-dialog > .modal-content > .modal-header').click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Role Updated Successfully.' }).click();
  await page.getByText('Test Employee', { exact: true }).click();
});