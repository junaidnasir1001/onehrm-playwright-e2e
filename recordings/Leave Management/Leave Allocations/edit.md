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
  await page.getByRole('searchbox', { name: 'Search:' }).click();
  await page.getByRole('searchbox', { name: 'Search:' }).fill('QA Hassan');
  await page.locator('button[name="edit"]').click();
  await page.getByRole('spinbutton', { name: 'Cf Leaves' }).click();
  await page.getByRole('spinbutton', { name: 'Cf Leaves' }).fill('5');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Leave Allocation Updated' }).click();
});
```
