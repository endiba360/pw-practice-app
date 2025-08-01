import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test.describe("Form Layouts page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });
  test("Input fields", async ({ page }) => {
    const usingTheGridEmailInput = page
      .locator("nb-card", {
        hasText: "Using the Grid",
      })
      .getByRole("textbox", { name: "Email" });
    await usingTheGridEmailInput.fill("test@gmail.com");
    await usingTheGridEmailInput.clear();
    await usingTheGridEmailInput.pressSequentially("testing@test.com", {
      delay: 500,
    });
    // Generic assertion
    const inputValue = await usingTheGridEmailInput.inputValue();
    expect(inputValue).toEqual("testing@test.com");
    // locator assertion
    await expect(usingTheGridEmailInput).toHaveValue("testing@test.com");
  });
  test("Radio buttons", async ({ page }) => {
    const usingTheGridForm = page.locator("nb-card", {
      hasText: "Using the Grid",
    });
    await usingTheGridForm.getByLabel("Option 1").check({ force: true });
    await usingTheGridForm
      .getByRole("radio", { name: "Option 2" })
      .check({ force: true });
    const radioStatus = await usingTheGridForm
      .getByRole("radio", { name: "Option 2" })
      .isChecked();
    expect(radioStatus).toBeTruthy();
    await expect(
      usingTheGridForm.getByRole("radio", { name: "Option 2" })
    ).toBeChecked();
    expect(
      await usingTheGridForm
        .getByRole("radio", { name: "Option 1" })
        .isChecked()
    ).toBeFalsy();
  });
});

test.describe("Toastr page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Modal & Overlays").click();
    await page.getByText("Toastr").click();
  });
  test("Checkboxes", async ({ page }) => {
    await page
      .getByRole("checkbox", { name: "Hide on click" })
      .click({ force: true });
    await page
      .getByRole("checkbox", { name: "Hide on click" })
      .check({ force: true });
    await page
      .getByRole("checkbox", { name: "Hide on click" })
      .uncheck({ force: true });
    // Check all checkboxes
    const allBoxes = page.getByRole("checkbox");
    for (const box of await allBoxes.all()) {
      await box.uncheck({ force: true });
      expect(await box.isChecked()).toBeFalsy();
    }
  });
});
