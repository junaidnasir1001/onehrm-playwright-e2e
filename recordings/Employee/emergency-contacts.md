import { test, expect } from '@playwright/test';

test('Employee - Emergency Contacts Create', async ({ page }) => {
  await page.getByRole('tab', { name: 'Emergency Contacts' }).click();
  await page.getByRole('button', { name: ' Add Employee Emergency' }).click();

  await page.getByLabel('Emergency Contacts').locator('button').filter({ hasText: 'Select Relation' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Pare');
  await page.locator('#bs-select-21-1').click();

  await page.getByRole('textbox', { name: 'Name *' }).fill('shahid');
  await page.getByRole('textbox', { name: 'Phone *' }).fill('4234324234');
  await page.getByRole('textbox', { name: 'Email *' }).fill('shahid@gmail.com');
  await page.getByRole('textbox', { name: 'Address' }).fill('abc');
  await page.locator('#employee-emergency-contact-form').getByText('Is Primary').click();

  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('heading', { name: 'Employee Emergency Contact' }).click();
});
