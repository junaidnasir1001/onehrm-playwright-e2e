import { test, expect } from '@playwright/test';

test('Employee - Qualification Create', async ({ page }) => {
  await page.getByRole('tab', { name: 'Qualifications' }).click();
  await page.getByRole('button', { name: ' Add Employee Qualification' }).click();

  await page.getByRole('textbox', { name: 'Institute/ School/ University' }).fill('rfg school');

  await page.locator('button').filter({ hasText: 'Select Education Level' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Pri');
  await page.locator('#bs-select-31-0').click();

  await page.getByRole('textbox', { name: 'From To' }).fill('01-03-2005');
  await page.getByRole('textbox', { name: 'Major Subject' }).fill('science');
  await page.getByRole('textbox', { name: 'Professional Skill' }).fill('dev');
  await page.getByRole('textbox', { name: 'Description' }).fill('abc');

  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Employee Qualification' }).click();
});
