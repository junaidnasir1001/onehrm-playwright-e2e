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
  await page.getByRole('link', { name: '* Leave Applications' }).click();

  await page.getByRole('button', { name: ' Add Leave Application' }).click();
  
  await page.locator('button').filter({ hasText: 'Select Company' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Pukat');
  await page.getByRole('option', { name: 'Pukat' }).click();

  await page.locator('button').filter({ hasText: 'Select Department' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('IT');
  await page.getByRole('option', { name: 'IT' }).click();

  await page.locator('button').filter({ hasText: 'Select Employee' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('QA Hassan');
  await page.getByRole('option', { name: 'QA Hassan' }).click();

  await page.locator('button').filter({ hasText: 'Select Leave Type' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Annual Leave');
  await page.getByRole('option', { name: 'Annual Leave' }).click();
  
  await page.getByRole('textbox', { name: 'Start Date *' }).click();
  await page.getByRole('textbox', { name: 'Start Date *' }).fill('01-05-2026');

  await page.getByRole('textbox', { name: 'End Date *' }).click();
  await page.getByRole('textbox', { name: 'End Date *' }).fill('01-05-2026');
  
  await page.locator('button').filter({ hasText: 'Select Leave Duration' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('First Half');
  await page.getByRole('option', { name: 'First Half' }).click();

  await page.getByRole('textbox', { name: 'Leave Reason' }).click();
  await page.getByRole('textbox', { name: 'Leave Reason' }).fill('Taking a break');

  await page.locator('button').filter({ hasText: 'Select Status' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Approved');
  await page.getByRole('option', { name: 'Approved' }).click();

  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Leave Application Created' }).click();
});
```
