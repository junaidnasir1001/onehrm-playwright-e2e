import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://v2.onehrm.com.my/');
  await page.getByRole('link', { name: 'Login' }).click();
  // ... login
  await page.getByRole('link', { name: 'Y Office Shifts' }).click();

  await page.getByRole('row', { name: 'Pukat Technologies Morning' }).locator('button[name="delete"]').click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('heading', { name: 'Office Shift Deleted' }).click();
});
