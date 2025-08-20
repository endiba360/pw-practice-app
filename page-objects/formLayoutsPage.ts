import { Locator, Page } from "@playwright/test";

export class FormLayoutsPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  /**
   * This method will fill Using the grid form with email, password and select options
   * @param email - valid email for the test user
   * @param password - valid password as a string value
   * @param optionText - valid option name as a string value
   */
  async submitUsingTheGridFormWithCredentialsAndSelectOptions(
    email: string,
    password: string,
    optionText: string
  ) {
    const usingTheGridForm = this.page.locator("nb-card", {
      hasText: "Using the Grid",
    });
    await usingTheGridForm.getByRole("textbox", { name: "Email" }).fill(email);
    await usingTheGridForm
      .getByRole("textbox", { name: "Password" })
      .fill(password);
    await usingTheGridForm
      .getByRole("radio", { name: optionText })
      .check({ force: true });
    await usingTheGridForm.getByRole("button").click();
  }
  /**
   * This method will fill the Inline form with user details
   * @param name - should be first and last name
   * @param email - valid email for the test user
   * @param rememberMe - true or false if user session to be saved
   */
  async submitInLineFormWithNameEmailAndCheckbox(
    name: string,
    email: string,
    rememberMe: boolean
  ) {
    const inlineForm = this.page.locator("nb-card", {
      hasText: "Inline form",
    });
    await inlineForm.getByPlaceholder("Jane Doe").fill(name);
    await inlineForm.getByPlaceholder("Email").fill(email);
    if (rememberMe)
      await inlineForm.getByRole("checkbox").check({ force: true });
    await inlineForm.getByRole("button").click();
  }
}
