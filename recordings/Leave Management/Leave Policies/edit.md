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

  await page.getByRole('searchbox', { name: 'Search:' }).click();
  await page.getByRole('searchbox', { name: 'Search:' }).fill('');
  await page.getByRole('row', { name: 'Employee: QA Hassan 06-04-' }).locator('button[name="edit"]').click();
  await page.getByRole('textbox', { name: 'Remarks' }).click();
  await page.getByRole('textbox', { name: 'Remarks' }).fill('its one month leave polcy');
  await page.locator('div:nth-child(11) > .form-group > .custom-control').click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Leave Policy Updated' }).click();
});
```
