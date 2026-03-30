import { test, expect } from '@playwright/test';

test('Employee - Basic Info Update', async ({ page }) => {
  // Login + navigate to an existing employee
  await page.getByRole('link', { name: 'Dawood' }).click();

  // Blood Group
  await page.getByRole('combobox', { name: 'N/A' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('A');
  await page.locator('#bs-select-4-0').click();

  await page.getByLabel('Basic', { exact: true }).locator('button').filter({ hasText: 'Select Nationality' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Mal');
  await page.locator('#bs-select-5-0').click();

  await page.getByLabel('Basic', { exact: true }).locator('button').filter({ hasText: 'Select Religion' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Is');
  await page.locator('#bs-select-6-2').click();

  await page.locator('button').filter({ hasText: 'Select Race' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('M');
  await page.locator('#bs-select-7-8').click();

  await page.getByLabel('Basic', { exact: true }).locator('button').filter({ hasText: 'Select Country' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Mala');
  await page.locator('#bs-select-8-130').click();

  await page.getByRole('textbox', { name: 'City' }).fill('Jampur');
  await page.getByRole('textbox', { name: 'State' }).fill('Punjab');
  await page.getByRole('textbox', { name: 'Zip Code' }).fill('5400');
  await page.getByRole('textbox', { name: 'Address' }).fill('abcc address');
  await page.getByRole('textbox', { name: 'IC/Passport Number *' }).fill('34324324324234');
  await page.getByRole('textbox', { name: 'Income Tax No' }).fill('343243243243');
  await page.getByRole('textbox', { name: 'EPF No' }).fill('1001');
  await page.getByRole('textbox', { name: 'SOCSO No' }).fill('10012');
  await page.getByRole('textbox', { name: 'EIS No' }).fill('100034');
  await page.getByRole('textbox', { name: 'Service No/Employment No' }).fill('100043');
  await page.getByRole('textbox', { name: 'Passport No' }).fill('324343232');

  await page.locator('button').filter({ hasText: 'Select Employee Type' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Per');
  await page.locator('#bs-select-13-0').click();

  await page.locator('button').filter({ hasText: 'Select Supervisor' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Super');
  await page.locator('#bs-select-16-2').click();

  await page.locator('button').filter({ hasText: 'Select Attendance Type' }).click();
  await page.locator('#bs-select-17-0').click();

  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('heading', { name: 'Employee Updated Successfully.' }).click();
});
