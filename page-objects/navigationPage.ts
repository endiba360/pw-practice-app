import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase {
  private readonly formLayoutMenuItem: Locator;
  private readonly datePickerMenuItem: Locator;
  private readonly smartTableMenuItem: Locator;
  private readonly tooltipMenuItem: Locator;
  private readonly toastrMenuItem: Locator;

  constructor(page: Page) {
    super(page);
    this.formLayoutMenuItem = page.getByText("Form Layouts");
    this.datePickerMenuItem = page.getByText("Datepicker");
    this.smartTableMenuItem = page.getByText("Smart Table");
    this.tooltipMenuItem = page.getByText("Tooltip");
    this.toastrMenuItem = page.getByText("Toastr");
  }

  async formLayoutsPage() {
    await this.selectGroupMenuItem("Forms");
    await this.formLayoutMenuItem.click();
    await this.waitForNumberOfSeconds(4);
  }

  async datepickerPage() {
    await this.selectGroupMenuItem("Forms");
    await this.datePickerMenuItem.click();
  }

  async toastrPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.toastrMenuItem.click();
  }

  async tooltipPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.tooltipMenuItem.click();
  }

  async smartTablePage() {
    await this.selectGroupMenuItem("Tables & Data");
    await this.smartTableMenuItem.click();
  }

  private async selectGroupMenuItem(groupItemTitle: string) {
    const groupMenuItem = this.page.getByTitle(groupItemTitle);
    const expandedState = await groupMenuItem.getAttribute("aria-expanded");
    if (expandedState == "false") {
      await groupMenuItem.click();
    }
  }
}
