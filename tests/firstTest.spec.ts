import { test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("Our first test", async ({ page }) => {
  await page.getByText("Form Layouts").click();
});

test.describe("Test suite 1", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Modal & Overlays").click();
  });
  test("Navigate to Popover", async ({ page }) => {
    await page.getByText("Popover").click();
  });
});

test.describe("Test suite 2", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
  });
  test("Navigate to Form Layouts", async ({ page }) => {
    await page.getByText("Form Layouts").click();
  });
  test("Navigate to Datepicker page", async ({ page }) => {
    await page.getByText("Datepicker").click();
  });
});
