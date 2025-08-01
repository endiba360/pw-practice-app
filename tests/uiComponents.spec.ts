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
});
