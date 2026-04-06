```typescript
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://v2.onehrm.com.my/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('pukat-admin');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin@1234');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: ' Daily Activities' }).click();
  
  await page.getByRole('button', { name: ' Add Daily Activity' }).click();
  await page.locator('#daily-activity-form button').filter({ hasText: 'Select Company' }).click();
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Pukat');
  await page.locator('#bs-select-4-0').click();
  await page.locator('#daily-activity-form button').filter({ hasText: 'Select Department' }).click();
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('IT');
  await page.locator('#bs-select-5-0').click();
  await page.locator('#daily-activity-form button').filter({ hasText: 'Select Employee' }).click();
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('QA Hassan');
  await page.locator('#bs-select-6-2').click();
  await page.getByRole('textbox', { name: 'Date *' }).click();
  await page.getByRole('cell', { name: '6' }).nth(3).click();
  await page.getByRole('textbox', { name: 'Start Time *' }).click();
  await page.getByRole('textbox', { name: 'Start Time *' }).fill('09:00');
  await page.getByRole('textbox', { name: 'End Time *' }).click();
  await page.getByRole('textbox', { name: 'End Time *' }).fill('18:00');
  await page.getByRole('textbox', { name: 'Description' }).click();
  await page.getByRole('textbox', { name: 'Description' }).fill('daily activity descripiton');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Daily Activity Created' }).click();
});
```
