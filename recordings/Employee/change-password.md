import { test, expect } from '@playwright/test';

test('Employee - Change Password', async ({ page }) => {
  await page.getByRole('tab', { name: 'Change Password' }).click();
  await page.getByRole('textbox', { name: 'New Password *', exact: true }).fill('12345678');
  await page.getByRole('textbox', { name: 'Confirm New Password *' }).fill('12345678');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('heading', { name: 'Password Updated Successfully.' }).click();
});
