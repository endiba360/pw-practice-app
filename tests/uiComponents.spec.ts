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

test("Lists and Dropdowns", async ({ page }) => {
  const dropdownMenu = page.locator("ngx-header nb-select");
  await dropdownMenu.click();

  page.getByRole("list"); // When the list has a UL tag
  page.getByRole("listitem"); // When the list has LI tag

  const optionList = page.locator("nb-option-list nb-option");
  await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]);
  await optionList.filter({ hasText: "Cosmic" }).click();
  const header = page.locator("nb-layout-header");
  await expect(header).toHaveCSS("background-color", "rgb(50, 50, 89)");
  // Iterate through the options
  const colors = {
    Light: "rgb(255, 255, 255)",
    Dark: "rgb(34, 43, 69)",
    Cosmic: "rgb(50, 50, 89)",
    Corporate: "rgb(255, 255, 255)",
  };
  await dropdownMenu.click();
  for (const color in colors) {
    await optionList.filter({ hasText: color }).click();
    await expect(header).toHaveCSS("background-color", colors[color]);
    if (color != "Corporate") {
      await dropdownMenu.click();
    }
  }
});

test("Tooltips", async ({ page }) => {
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Tooltip").click();

  const tooltipCard = page.locator("nb-card", {
    hasText: "Tooltip Placements",
  });
  await tooltipCard.getByRole("button", { name: "Top" }).hover();
  const tooltip = await page.locator("nb-tooltip").textContent();
  expect(tooltip).toEqual("This is a tooltip");
});

test("Dialog boxes", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();
  page.on("dialog", (dialog) => {
    expect(dialog.message()).toEqual("Are you sure you want to delete?");
    dialog.accept();
  });
  await page
    .getByRole("table")
    .locator("tr", { hasText: "mdo@gmail.com" })
    .locator(".nb-trash")
    .click();
  await expect(
    page.getByRole("table").locator("tr", { hasText: "mdo@gmail.com" })
  ).toBeHidden();
});
