import { expect, type Locator, type Page } from "@playwright/test";

export class TheInternetPage {
  readonly flashMessage: Locator;

  constructor(private readonly page: Page) {
    this.flashMessage = page.locator("#flash");
  }

  async openLogin(): Promise<void> {
    await this.page.goto("/login");
    await expect(
      this.page.getByRole("heading", { name: "Login Page" }),
    ).toBeVisible();
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.getByLabel("Username").fill(username);
    await this.page.getByLabel("Password").fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();
  }

  async selectDropdownOption(label: string): Promise<void> {
    await this.page.goto("/dropdown");
    await this.page.locator("#dropdown").selectOption({ label });
  }

  async revealDynamicContent(): Promise<void> {
    await this.page.goto("/dynamic_loading/2");
    await this.page.getByRole("button", { name: "Start" }).click();
  }
}
