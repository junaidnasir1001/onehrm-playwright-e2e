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

  // Edit action
  await page.getByRole('row', { name: 'QA desi Pukat Technologies' }).locator('button[name="edit"]').click();
  
  // Updates
  await page.getByRole('textbox', { name: 'Name *' }).click();
  await page.getByRole('textbox', { name: 'Name *' }).fill('QA desig');
  await page.getByRole('textbox', { name: 'Name *' }).click();
  await page.getByRole('textbox', { name: 'Name *' }).fill('QA designation');
  
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Designation Updated' }).click();
});
