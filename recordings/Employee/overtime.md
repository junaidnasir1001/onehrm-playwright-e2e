import { test, expect } from '@playwright/test';

test('Employee - Overtime Create', async ({ page }) => {
  await page.getByRole('tab', { name: 'Overtime' }).click();
  await page.getByRole('button', { name: ' Add Salary Overtime' }).click();

  await page.getByLabel('Overtime').locator('button').filter({ hasText: 'Select Payroll' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('2026 Jan');
  await page.locator('#bs-select-39-0').click();

  await page.locator('button').filter({ hasText: 'Select Day Type' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Res');
  await page.locator('#bs-select-40-1').click();

  await page.getByRole('textbox', { name: 'Date *' }).click();
  await page.getByRole('cell', { name: '31' }).click();

  await page.getByRole('textbox', { name: 'Requested Start Time *' }).fill('09:00');
  await page.getByRole('textbox', { name: 'Requested End Time *' }).fill('15:00');
  await page.getByRole('textbox', { name: 'Approved Start Time *' }).fill('10:00');
  await page.getByRole('textbox', { name: 'Approved End Time *' }).fill('12:00');
  await page.getByRole('spinbutton', { name: 'Hours *' }).fill('2');
  await page.getByRole('textbox', { name: 'Description' }).fill('2 hours');
  await page.getByRole('textbox', { name: 'Remarks' }).fill('abc');

  await page.getByLabel('Overtime').locator('button').filter({ hasText: 'Select Status' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Pen');
  await page.locator('#bs-select-42-0').click();

  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Salary Overtime Created' }).click();
});
