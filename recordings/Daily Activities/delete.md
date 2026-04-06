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

  await page.getByRole('row', { name: 'QA Hassan 06-04-2026 09:00 AM' }).locator('button[name="delete"]').click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await page.getByRole('searchbox', { name: 'Search:' }).click();
  await page.getByRole('searchbox', { name: 'Search:' }).fill('QA hassan');
  await page.getByRole('cell', { name: 'QA Hassan' }).click();
  await page.locator('button[name="delete"]').click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('heading', { name: 'Daily Activity Deleted' }).click();
  
  await page.getByRole('searchbox', { name: 'Search:' }).click();
  await page.getByRole('searchbox', { name: 'Search:' }).click();
  await page.getByRole('searchbox', { name: 'Search:' }).click();
  await page.getByRole('searchbox', { name: 'Search:' }).fill('');
});
```
