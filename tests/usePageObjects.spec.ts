import { test } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";
import { FormLayoutsPage } from "../page-objects/formLayoutsPage";
import { DatepickerPage } from "../page-objects/datepickerPage";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("Navigate to Form page", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  await navigateTo.formLayoutsPage();
  await navigateTo.datepickerPage();
  await navigateTo.toastrPage();
  await navigateTo.tooltipPage();
  await navigateTo.smartTablePage();
});

test("Parametrized methods", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  const onFormLayoutsPage = new FormLayoutsPage(page);
  const onDatepickerPage = new DatepickerPage(page);

  await navigateTo.formLayoutsPage();
  await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOptions(
    "test@gmail.com",
    "pAssW0rd",
    "Option 2"
  );
  await onFormLayoutsPage.submitInLineFormWithNameEmailAndCheckbox(
    "Reed Richards",
    "fantastic4@gmail.com",
    true
  );
  await navigateTo.datepickerPage();
  await onDatepickerPage.selectCommonDatepickerDateFromToday(10);
});
