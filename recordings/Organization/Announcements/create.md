import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://v2.onehrm.com.my/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('pukat-admin');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin@1234');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: '  Organization' }).click();
  await page.getByRole('link', { name: 'I Announcements' }).click();
  await page.getByRole('button', { name: ' Add Announcement' }).click();
  
  await page.locator('button').filter({ hasText: 'Select Company' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Pu');
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Puk');
  await page.locator('#bs-select-1-0').click();
  
  await page.locator('button').filter({ hasText: 'Select Department' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('IT');
  await page.locator('#bs-select-2-0').click();
  
  await page.getByRole('textbox', { name: 'Title *' }).click();
  await page.getByRole('textbox', { name: 'Title *' }).fill('new ');
  
  await page.getByRole('textbox', { name: 'Start Date *' }).click();
  await page.getByRole('cell', { name: '18' }).click();
  await page.getByRole('textbox', { name: 'End Date *' }).click();
  await page.getByRole('cell', { name: '19' }).click();
  
  await page.locator('#description').click();
  await page.locator('#description').fill('new leave');
  
  await page.locator('button').filter({ hasText: 'Select Announcement' }).click();
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('pub');
  await page.locator('#bs-select-3-1').click();
  
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Announcement Created' }).click();
});
