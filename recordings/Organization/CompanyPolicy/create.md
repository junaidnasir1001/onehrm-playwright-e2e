import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://v2.onehrm.com.my/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('pukat-admin');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin@1234');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: '  Organization' }).click();
  await page.getByRole('link', { name: '( Company Policy' }).click();
  
  await page.getByRole('button', { name: ' Add Company Policy' }).click();
  await page.getByRole('combobox', { name: 'Select Company' }).nth(1).click();
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('puk');
  await page.locator('#bs-select-1-0').click();
  
  await page.getByRole('textbox', { name: 'Title *' }).click();
  await page.getByRole('textbox', { name: 'Title *' }).fill('policy');
  
  await page.locator('#description').click();
  await page.locator('#description').fill('abc');
  
  await page.getByRole('button', { name: 'Company Policy Attachment' }).click();
  await page.getByRole('button', { name: 'Company Policy Attachment' }).setInputFiles('hoc.jpeg');
  
  await page.locator('button').filter({ hasText: 'Select Company Policy' }).click();
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Pu');
  await page.locator('#bs-select-2-1').click();
  
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Company Policy Created' }).click();
});
