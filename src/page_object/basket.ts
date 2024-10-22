import { Page } from "@playwright/test";
import { step } from "./step";
import { PlaywrightExp } from "./playwright_exp";

export class BasketPage {
  page: Page;
  exp: PlaywrightExp;

  constructor(page: Page) {
    this.page = page;
    this.exp = new PlaywrightExp();
  }

  @step
  async checkBasketQty(qty: string) {
    await this.exp.toHaveText(this.page.locator(`span.counter-number`), qty);
  }

  @step
  async clickBasket() {
    await this.page.locator(`xpath=//a[@class='action showcart']`).click();
  }
}
