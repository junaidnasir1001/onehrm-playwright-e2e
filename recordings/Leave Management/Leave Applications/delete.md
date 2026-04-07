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

  await page.getByRole('button', { name: '' }).first().click();
  
  await page.getByRole('button', { name: 'Yes, delete it!' }).click();
  await page.getByRole('heading', { name: 'Deleted!' }).click();
});
```
