import { test, expect } from '@playwright/test';

test('Employee - E-Wallet Create', async ({ page }) => {
  await page.getByRole('tab', { name: 'E-Wallet' }).click();
  await page.getByRole('button', { name: ' Add Employee E Wallet' }).click();

  await page.getByRole('textbox', { name: 'Wallet ID *' }).fill('5254543');
  await page.getByRole('textbox', { name: 'Mobile Number' }).fill('43545244');

  await page.getByRole('textbox', { name: 'Start Date' }).click();
  await page.getByRole('cell', { name: '30' }).click();
  await page.getByRole('textbox', { name: 'End Date' }).click();
  await page.getByRole('cell', { name: '31' }).click();

  await page.getByLabel('E-Wallet').locator('button').filter({ hasText: 'Select Payment Type' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('bank');
  await page.locator('#bs-select-33-1').click();

  await page.getByRole('textbox', { name: 'Percentage' }).fill('2');
  await page.locator('#employee-e-wallet-form > .row > .m-4 > .form-group > .custom-control').click();

  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Employee E-Wallet Created' }).click();
});
