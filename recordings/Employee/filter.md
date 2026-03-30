import { test, expect } from '@playwright/test';

test('Employee - Filter List', async ({ page }) => {
  await page.getByRole('link', { name: ' Employee Lists' }).click();
  await page.getByRole('button', { name: ' Filter' }).click();

  await page.locator('#collapseFilter button').filter({ hasText: 'Select Company' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Puk');
  await page.locator('#bs-select-3-0').click();

  await page.locator('#collapseFilter button').filter({ hasText: 'Select Department' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('IT');
  await page.locator('#bs-select-1-0').click();

  await page.locator('#collapseFilter button').filter({ hasText: 'Select Designation' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Assoc');
  await page.locator('#bs-select-2-0').click();

  await page.locator('button').filter({ hasText: 'Select Status' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Act');
  await page.locator('#bs-select-4-0').click();

  await page.getByRole('button', { name: 'Filter', exact: true }).click();
  await page.getByRole('link', { name: 'Clear' }).click();
});
