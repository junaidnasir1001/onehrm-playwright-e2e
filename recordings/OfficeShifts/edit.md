import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://v2.onehrm.com.my/');
  await page.getByRole('link', { name: 'Login' }).click();
  // ... login
  await page.getByRole('link', { name: 'Y Office Shifts' }).click();
  
  await page.getByRole('row', { name: 'Pukat Technologies New Shift' }).locator('button[name="edit"]').click();
  await page.getByRole('textbox', { name: 'Name *' }).fill('Morning Shift');
  await page.getByRole('spinbutton', { name: 'Relaxation Time (Minutes) *' }).fill('30');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Office Shift Updated' }).click();
});
