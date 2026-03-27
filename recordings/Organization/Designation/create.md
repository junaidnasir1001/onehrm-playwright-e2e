import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://v2.onehrm.com.my/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('pukat-admin');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin@1234');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: '  Organization' }).click();
  await page.getByRole('link', { name: ' Designation' }).click();

  // Create
  await page.getByRole('button', { name: ' Add Designation' }).click();
  await page.getByRole('textbox', { name: 'Name *' }).click();
  await page.getByRole('textbox', { name: 'Name *' }).fill('QA desi');
  
  await page.locator('button').filter({ hasText: 'Select Company' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('');
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('acu');
  await page.locator('#bs-select-1-2').click();
  
  // They select Department
  await page.locator('button').filter({ hasText: 'Select Department' }).click();
  await page.getByRole('combobox', { name: 'Acube' }).click();
  await page.locator('#bs-select-1-0').click();
  
  // Overwriting Company directly
  await page.getByRole('combobox', { name: 'Pukat Technologies' }).click();
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('puka');
  await page.locator('#bs-select-1-0').click();
  
  // Overwriting Department
  await page.locator('#bs-select-1-0').click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Qua');
  await page.locator('#bs-select-2-1').click();
  
  // Short code
  await page.getByRole('textbox', { name: 'Short Code' }).click();
  await page.getByRole('textbox', { name: 'Short Code' }).fill('1001');
  
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Designation Created' }).click();
});
