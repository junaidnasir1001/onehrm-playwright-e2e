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
  await page.getByRole('cell', { name: 'Supervisor', exact: true }).click();
  await page.getByRole('link', { name: 'f' }).nth(1).click();
  await page.getByRole('treeitem', { name: 'Organization' }).click();
  await page.getByRole('treeitem', { name: 'Attendances', exact: true }).click();
  await page.getByRole('treeitem', { name: 'Employee List' }).click();
  await page.getByRole('treeitem', { name: 'Awards' }).click();
  await page.getByRole('treeitem', { name: 'Travels' }).click();
  await page.getByRole('treeitem', { name: 'Transfers' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Permissions updated' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('link', { name: ' Roles & Permissions' }).click();
});