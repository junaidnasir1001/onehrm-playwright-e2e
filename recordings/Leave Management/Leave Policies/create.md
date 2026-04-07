```typescript
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://v2.onehrm.com.my/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('pukat-admin');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin@1234');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: '  Leave Management' }).click();
  await page.getByRole('link', { name: ' Leave Policies' }).click();
  
  await page.getByRole('button', { name: ' Add Leave Policy' }).click();
  await page.locator('button').filter({ hasText: 'Select Company' }).click();
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Pukat');
  await page.locator('#bs-select-1-0').click();
  await page.locator('button').filter({ hasText: 'Select Employee' }).click();
  await page.getByRole('combobox', { name: 'Search' }).dblclick();
  await page.getByRole('combobox', { name: 'Search' }).fill('QA Hassan');
  await page.locator('#bs-select-2-2').click();
  await page.getByRole('textbox', { name: 'Start Date *' }).click();
  await page.getByRole('cell', { name: '6' }).nth(4).click();
  await page.getByRole('textbox', { name: 'End Date *' }).click();
  await page.getByRole('cell', { name: '30' }).nth(2).click();
  await page.getByRole('spinbutton', { name: 'Leave Pairing *' }).click();
  await page.getByRole('spinbutton', { name: 'Leave Pairing *' }).fill('5');
  await page.getByRole('textbox', { name: 'Remarks' }).click();
  await page.getByRole('textbox', { name: 'Remarks' }).fill('its one month leave policy');
  await page.locator('.custom-control').first().click();
  await page.locator('div:nth-child(10) > .form-group > .custom-control').click();
  await page.locator('div:nth-child(11) > .form-group > .custom-control').click();
  await page.locator('div:nth-child(12) > .form-group > .custom-control').click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Leave Policy Created' }).click();
});
```
