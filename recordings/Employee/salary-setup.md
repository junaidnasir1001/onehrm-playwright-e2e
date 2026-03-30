import { test, expect } from '@playwright/test';

test('Employee - Salary Setup Create', async ({ page }) => {
  await page.getByRole('tab', { name: 'Salary Setup' }).click();
  await page.getByRole('button', { name: ' Add Salary Basic' }).click();

  await page.getByRole('textbox', { name: 'Effective Date *' }).click();
  await page.getByRole('cell', { name: '30' }).click();

  await page.locator('button').filter({ hasText: 'Select Salary Type' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Mon');
  await page.locator('#bs-select-34-0').click();

  await page.getByRole('textbox', { name: 'Basic Salary *' }).fill('4000');

  await page.getByLabel('Salary Basic').locator('button').filter({ hasText: 'Select Payment Type' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('cash');
  await page.locator('#bs-select-35-2').click();

  await page.getByRole('button', { name: ' Add Allowance' }).click();
  await page.locator('select[name="allowance_types[]"]').selectOption('33');
  await page.getByPlaceholder('Allowance Amount').fill('100');

  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Salary Basic Created' }).click();
});
