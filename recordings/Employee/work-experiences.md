import { test, expect } from '@playwright/test';

test('Employee - Work Experience Create', async ({ page }) => {
  await page.getByRole('tab', { name: 'Work Experiences' }).click();
  await page.getByRole('button', { name: ' Add Employee Work Experience' }).click();

  await page.getByRole('textbox', { name: 'Company Name *' }).fill('acube');
  await page.getByRole('textbox', { name: 'Position *' }).fill('deve');
  await page.getByRole('textbox', { name: 'To Year' }).fill('01-03-2005');
  await page.getByRole('textbox', { name: 'Description' }).fill('abc');

  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Employee Work Experience' }).click();
});
