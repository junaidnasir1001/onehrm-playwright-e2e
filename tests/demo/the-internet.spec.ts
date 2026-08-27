import { expect, test } from "@playwright/test";
import { TheInternetPage } from "../../pages/demo/TheInternetPage";

test.describe("The Internet public demo", () => {
  test("accepts valid login credentials", async ({ page }) => {
    const app = new TheInternetPage(page);

    await app.openLogin();
    await app.login("tomsmith", "SuperSecretPassword!");

    await expect(
      page.getByRole("heading", { name: "Secure Area", exact: true }),
    ).toBeVisible();
    await expect(app.flashMessage).toContainText(
      "You logged into a secure area!",
    );
    await expect(page.getByRole("link", { name: "Logout" })).toBeVisible();
  });

  test("rejects invalid login credentials", async ({ page }) => {
    const app = new TheInternetPage(page);

    await app.openLogin();
    await app.login("not-a-user", "not-a-password");

    await expect(app.flashMessage).toContainText("Your username is invalid!");
    await expect(page).toHaveURL(/\/login$/);
  });

  test("selects an option in a form control", async ({ page }) => {
    const app = new TheInternetPage(page);

    await app.selectDropdownOption("Option 2");

    await expect(page.locator("#dropdown")).toHaveValue("2");
    await expect(page.locator("#dropdown option:checked")).toHaveText(
      "Option 2",
    );
  });

  test("waits for dynamically loaded content", async ({ page }) => {
    const app = new TheInternetPage(page);

    await app.revealDynamicContent();

    const result = page.locator("#finish");
    await expect(result).toBeVisible();
    await expect(result).toHaveText("Hello World!");
  });
});
