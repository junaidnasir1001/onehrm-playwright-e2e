import { test, expect } from '@playwright/test';

test('Employee - Create', async ({ page }) => {
  await page.goto('https://v2.onehrm.com.my/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('pukat-admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin@1234');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: '  Employees' }).click();
  await page.getByRole('link', { name: ' Employee Lists' }).click();
  await page.getByRole('button', { name: ' Add Employee' }).click();

  await page.locator('button').filter({ hasText: 'Select Prefix' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Mr');
  await page.locator('#bs-select-5-0').click();

  await page.getByRole('textbox', { name: 'Full Name *' }).fill('Dawood');
  await page.getByRole('textbox', { name: 'Username *' }).fill('dawood');
  await page.getByRole('textbox', { name: 'Email *' }).fill('dawood@gmail.com');
  await page.getByRole('spinbutton', { name: 'Contact No *' }).fill('03243434234');

  await page.locator('button').filter({ hasText: 'Select Gender' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Ma');
  await page.locator('#bs-select-6-0').click();

  await page.locator('button').filter({ hasText: 'Select Marital Status' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Sin');
  await page.locator('#bs-select-7-0').click();

  await page.locator('#employee-form button').filter({ hasText: 'Select Company' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Pukat');
  await page.locator('#bs-select-8-0').click();

  await page.locator('#employee-form button').filter({ hasText: 'Select Department' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Quality');
  await page.locator('#bs-select-9-1').click();

  await page.locator('#employee-form button').filter({ hasText: 'Select Designation' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Ass');
  await page.locator('#bs-select-10-0').click();

  await page.locator('button').filter({ hasText: 'Select Office Shift' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Defa');
  await page.locator('#bs-select-11-0').click();

  await page.locator('button').filter({ hasText: 'Select Holiday Calendar' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Fed');
  await page.locator('#bs-select-12-0').click();

  // Joining Date - click cell 30 from the calendar
  await page.getByRole('textbox', { name: 'Joining Date *' }).click();
  await page.getByRole('cell', { name: '30', exact: true }).click();

  await page.locator('button').filter({ hasText: 'Select Working Status' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Acti');
  await page.locator('#bs-select-13-0').click();

  await page.getByRole('textbox', { name: 'Password *', exact: true }).fill('12345678');
  await page.getByRole('textbox', { name: 'Confirm Password *' }).fill('12345678');

  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Employee Created Successfully.' }).click();
});
