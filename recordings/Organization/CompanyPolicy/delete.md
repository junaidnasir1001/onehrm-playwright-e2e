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

  await page.getByRole('row', { name: 'policy change Pukat' }).locator('button[name="delete"]').click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('heading', { name: 'Company Policy Deleted' }).click();
});
