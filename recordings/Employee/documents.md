import { test, expect } from '@playwright/test';

test('Employee - Document Create', async ({ page }) => {
  await page.getByRole('tab', { name: 'Documents' }).click();
  await page.getByRole('button', { name: ' Add Employee Document' }).click();

  await page.locator('button').filter({ hasText: 'Select Type' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Vis');
  await page.locator('#bs-select-22-1').click();

  await page.getByRole('textbox', { name: 'Title *' }).fill('visa');
  await page.getByRole('button', { name: 'Document File *' }).setInputFiles('utils/dummy.png');
  await page.getByRole('textbox', { name: 'Document No *' }).fill('5435324234');

  await page.getByRole('textbox', { name: 'Issue Date' }).click();
  await page.getByRole('cell', { name: '30' }).click();
  await page.getByRole('textbox', { name: 'Expiry Date' }).click();
  await page.getByRole('cell', { name: '31' }).click();

  await page.getByRole('textbox', { name: 'Description' }).fill('fdsfadsf');

  await page.locator('button').filter({ hasText: 'Select Status' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Appr');
  await page.locator('#bs-select-23-1').click();

  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Employee Document Created' }).click();
});
