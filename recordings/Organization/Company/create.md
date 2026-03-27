import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://v2.onehrm.com.my/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('pukat-admin');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin@1234');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: '  Organization' }).click();
  await page.getByRole('link', { name: 'E Company' }).click();
  await page.getByRole('button', { name: ' Add Company' }).click();
  await page.locator('button').filter({ hasText: 'Select Company Type' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('limited Par');
  await page.locator('#bs-select-1-0').click();
  await page.locator('button').filter({ hasText: 'Select Company Head' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('abc');
  await page.getByRole('textbox', { name: 'Name *' }).fill('Acube');
  await page.getByRole('textbox', { name: 'Registration No *' }).fill('100001');
  await page.getByRole('textbox', { name: 'Trading Name' }).fill('abc');
  await page.getByRole('textbox', { name: 'Contact No' }).fill('4534543534');
  await page.getByRole('textbox', { name: 'Email' }).fill('acube@gmail.com');
  await page.getByRole('textbox', { name: 'Address' }).fill('sadiq center');
  await page.getByRole('textbox', { name: 'Website' }).fill('acube.com');
  await page.getByRole('textbox', { name: 'Tax No' }).fill('35454354');
  await page.getByRole('button', { name: 'Company Logo' }).setInputFiles('hoc.jpeg'); // Note: file upload
  await page.locator('button').filter({ hasText: 'Select Timezone' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('asia/karachi');
  await page.locator('#bs-select-3-6').click();
  await page.locator('button').filter({ hasText: 'Select Holiday Calendar' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Federal H');
  await page.locator('#bs-select-4-1').click();
  await page.getByRole('spinbutton', { name: 'HRDF Limit *' }).fill('1');
  await page.locator('.custom-control').first().click();
  await page.locator('div:nth-child(17) > .form-group > .custom-control').click();
  await page.locator('div:nth-child(18) > .form-group > .custom-control').click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Company Created Successfully.' }).click();
});
