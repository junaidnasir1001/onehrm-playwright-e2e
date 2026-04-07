```typescript
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://v2.onehrm.com.my/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('pukat-admin');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin@1234');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: '  Leave Management' }).click();
  
  await page.getByRole('link', { name: 'g Leave Allocations' }).click();
  await page.getByRole('button', { name: ' Add Leave Allocation' }).click();
  await page.locator('#leave-allocation-form button').filter({ hasText: 'Select Company' }).click();
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Pukat');
  await page.locator('#bs-select-4-0').click();
  await page.locator('button').filter({ hasText: 'Select Department' }).click();
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('IT');
  await page.locator('#bs-select-5-0').click();
  await page.locator('#leave-allocation-form button').filter({ hasText: 'Select Employee' }).click();
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('QA H');
  await page.locator('#bs-select-6-2').click();
  await page.locator('#leave-allocation-form button').filter({ hasText: 'Select Leave Type' }).click();
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Annual');
  await page.locator('#bs-select-7-0').click();
  await page.getByRole('textbox', { name: 'Start Date *' }).click();
  await page.getByRole('cell', { name: '14' }).click();
  await page.getByRole('textbox', { name: 'End Date *' }).click();
  await page.getByRole('cell', { name: '14' }).click();
  await page.getByRole('spinbutton', { name: 'Total Leaves *' }).click();
  await page.getByRole('spinbutton', { name: 'Total Leaves *' }).fill('10');
  await page.getByRole('spinbutton', { name: 'Cf Leaves' }).click();
  await page.getByRole('spinbutton', { name: 'Cf Leaves' }).fill('0');
  await page.getByRole('textbox', { name: 'Cf Leave Expiry' }).click();
  await page.getByRole('cell', { name: '30' }).nth(1).click();
  await page.getByRole('textbox', { name: 'Remarks' }).click();
  await page.getByRole('textbox', { name: 'Start Date *' }).click();
  await page.getByRole('cell', { name: '1', exact: true }).first().click();
  await page.getByRole('textbox', { name: 'End Date *' }).click();
  await page.getByRole('cell', { name: '30' }).nth(1).click();
  await page.getByRole('textbox', { name: 'Remarks' }).click();
  await page.getByRole('textbox', { name: 'Remarks' }).fill('leave allocation for one month');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Leave Allocation Created' }).click();
});
```
