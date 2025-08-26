import { test } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("Navigate to Form page", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().formLayoutsPage();
  await pm.navigateTo().datepickerPage();
  await pm.navigateTo().toastrPage();
  await pm.navigateTo().tooltipPage();
  await pm.navigateTo().smartTablePage();
});

test("Parametrized methods", async ({ page }) => {
  const pm = new PageManager(page);

  await pm.navigateTo().formLayoutsPage();
  await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOptions(
    "test@gmail.com",
    "pAssW0rd",
    "Option 2"
  );
  await pm.onFormLayoutsPage().submitInLineFormWithNameEmailAndCheckbox(
    "Reed Richards",
    "fantastic4@gmail.com",
    true
  );
  await pm.navigateTo().datepickerPage();
  await pm.onDatepickerPage().selectCommonDatepickerDateFromToday(6);
  await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(1, 3);
});
