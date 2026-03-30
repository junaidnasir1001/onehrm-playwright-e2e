import { test, expect } from '@playwright/test';

test('Employee - Addition Deduction Create', async ({ page }) => {
  await page.getByRole('tab', { name: 'Addition Deductions' }).click();
  await page.getByRole('button', { name: ' Add Addition Deduction' }).click();

  await page.getByLabel('Addition Deductions').locator('button').filter({ hasText: 'Select Payroll' }).click();
  await page.locator('#bs-select-36-0').click();

  await page.locator('button').filter({ hasText: 'Select Transaction Type' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('add');
  await page.locator('#bs-select-37-0').click();

  await page.locator('button').filter({ hasText: 'Select Reason Type' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('othe');
  await page.locator('#bs-select-38-0').click();

  await page.getByRole('spinbutton', { name: 'Amount *' }).fill('100');
  await page.getByRole('textbox', { name: 'Reason' }).fill('abc');

  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Salary Addition Deduction' }).click();
});
