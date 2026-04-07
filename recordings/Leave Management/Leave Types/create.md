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
  await page.getByRole('link', { name: ' Leave Types' }).click();

  await page.getByRole('button', { name: ' Add Leave Type' }).click();
  await page.locator('button').filter({ hasText: 'Select Leave Parent' }).click();
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Annual');
  await page.locator('#bs-select-1-1').click();
  await page.getByRole('textbox', { name: 'Name *' }).click();
  await page.getByRole('textbox', { name: 'Name *' }).fill('parent leave');
  await page.locator('.custom-control').first().click();
  await page.locator('div:nth-child(5) > .form-group > .custom-control').click();
  await page.getByRole('textbox', { name: 'Description' }).click();
  await page.getByRole('textbox', { name: 'Description' }).fill('its parent leave');
  await page.getByRole('textbox', { name: 'Description' }).click();
  await page.getByRole('textbox', { name: 'Description' }).click();
  await page.getByRole('textbox', { name: 'Description' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Description' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Description' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Description' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Description' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Description' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Description' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Description' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Description' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Description' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Description' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Description' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Description' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Description' }).fill('its has parent leave');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Leave Type Created' }).click();
});
```
