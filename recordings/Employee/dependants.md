import { test, expect } from '@playwright/test';

test('Employee - Dependant Create', async ({ page }) => {
  await page.getByRole('tab', { name: 'Dependants' }).click();
  await page.getByRole('button', { name: ' Add Employee Dependant' }).click();

  await page.getByRole('textbox', { name: 'Name *' }).fill('ali');

  await page.getByLabel('Dependants').locator('button').filter({ hasText: 'Select Gender' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Male');
  await page.locator('#bs-select-24-0').click();

  await page.getByLabel('Dependants').locator('button').filter({ hasText: 'Select Marital Status' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Sin');
  await page.locator('#bs-select-25-0').click();

  await page.getByLabel('Dependants').locator('button').filter({ hasText: 'Select Blood Group' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('A');
  await page.locator('#bs-select-26-0').click();

  await page.locator('button').filter({ hasText: 'Select Relation' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Chi');
  await page.locator('#bs-select-27-1').click();

  await page.getByRole('textbox', { name: 'Contact No' }).fill('42354325432');

  await page.getByLabel('Dependants').locator('button').filter({ hasText: 'Select Nationality' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Mal');
  await page.locator('#bs-select-28-0').click();

  await page.getByRole('textbox', { name: 'City' }).fill('lahore');
  await page.getByRole('textbox', { name: 'IC Number' }).fill('343423423');

  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Employee Dependant Created' }).click();
});
