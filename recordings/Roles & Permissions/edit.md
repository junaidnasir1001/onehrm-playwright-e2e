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
  await page.getByRole('link', { name: ' Roles & Permissions' }).click
  await page.getByRole('row', { name: 'Supervisor Test Employee sup' }).locator('button[name="edit-role"]').click();
  await page.getByRole('textbox', { name: 'Role Name *' }).click();
  await page.getByRole('textbox', { name: 'Role Name *' }).fill('Supervisor');
  await page.getByRole('textbox', { name: 'Role Name *' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Role Name *' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Role Name *' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Role Name *' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Role Name *' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Role Name *' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Role Name *' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Role Name *' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Role Name *' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Role Name *' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Role Name *' }).fill('Main Supervisor');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Role Updated Successfully.' }).click();
  await page.getByRole('cell', { name: 'Main Supervisor' }).click();
});