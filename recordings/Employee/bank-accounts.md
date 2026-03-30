import { test, expect } from '@playwright/test';

test('Employee - Bank Account Create', async ({ page }) => {
  await page.getByRole('tab', { name: 'Bank Accounts' }).click();
  await page.getByRole('button', { name: ' Add Employee Bank Account' }).click();

  await page.getByRole('textbox', { name: 'Account Title *' }).fill('meezan bank');
  await page.getByRole('textbox', { name: 'Account Number *' }).fill('42343432');

  await page.locator('button').filter({ hasText: 'Select Bank' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('CIM');
  await page.locator('#bs-select-32-1').click();

  await page.getByRole('textbox', { name: 'Bank Code' }).fill('432432');
  await page.getByRole('textbox', { name: 'Bank Branch' }).fill('lahore');
  await page.getByRole('textbox', { name: 'Swift Code' }).fill('34545345');
  await page.locator('#employee-bank-account-form').getByText('Is Primary').click();

  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Employee Bank Account Created' }).click();
});
