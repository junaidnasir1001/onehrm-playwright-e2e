import { test, expect } from '@playwright/test';

test('Employee - Salary Loan Create', async ({ page }) => {
  await page.getByRole('tab', { name: 'Loans' }).click();
  await page.getByRole('button', { name: ' Add Salary Loan' }).click();

  await page.getByRole('textbox', { name: 'Loan Amount *' }).fill('1000');

  await page.getByRole('textbox', { name: 'Start Month Year *' }).click();
  await page.getByText('Jul').click();
  await page.getByRole('textbox', { name: 'End Month Year *' }).click();
  await page.getByText('Nov').click();

  await page.getByRole('textbox', { name: 'Reason' }).fill('abc loan reason');
  await page.getByRole('textbox', { name: 'Comment' }).fill('abc');

  await page.getByRole('button', { name: ' Create Installments' }).click();

  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Salary Loan Created' }).click();
});
