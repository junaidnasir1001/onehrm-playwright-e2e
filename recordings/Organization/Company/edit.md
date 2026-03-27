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

  // Edit action
  await page.getByRole('row', { name: 'Acube acube@gmail.com' }).locator('button[name="edit"]').click();
  await page.getByRole('textbox', { name: 'Name *' }).click();
  await page.getByRole('textbox', { name: 'Name *' }).fill('Acubepk');
  await page.locator('.custom-control').first().click();
  await page.locator('div:nth-child(17) > .form-group > .custom-control').click();
  await page.getByText('Yes Allow Check In Image').click();
  await page.getByRole('button', { name: 'Submit' }).click();
});
