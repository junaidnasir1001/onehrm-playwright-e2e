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

  await page.getByRole('textbox', { name: 'Search:' }).click();
  await page.getByRole('textbox', { name: 'Search:' }).fill('QA Hassan');
  await page.keyboard.press('Enter');

  await page.locator('tr:nth-child(1) a[href*="/edit"]').click();

  await page.getByRole('textbox', { name: 'Approved From *' }).click();
  await page.getByRole('textbox', { name: 'Approved From *' }).fill('01-05-2026');

  await page.getByRole('textbox', { name: 'Approved To *' }).click();
  await page.getByRole('textbox', { name: 'Approved To *' }).fill('01-05-2026');

  await page.locator('button').filter({ hasText: 'Pending' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Approved');
  await page.getByRole('option', { name: 'Approved' }).click();

  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Leave Application Updated' }).click();
});
```
