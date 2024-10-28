import { Locator, Page } from "@playwright/test";

import { BasketPage } from "./basket";
import { getPriceInDollars, PlaywrightExp, step } from "../main";
import { ICart } from "../models/cart.model";

const el_cart = {
  price: function (page: Page) {
    return page
      .locator(`xpath=//span[@data-price-type='finalPrice']//span`)
      .first();
  },
  size: function (page: Page, size: string) {
    return page.getByLabel(size, { exact: true });
  },
  color: function (page: Page, color: string) {
    return page.getByLabel(color);
  },
  attribute: function (page: Page) {
    return page.locator("span.swatch-attribute-selected-option");
  },
  qty: function (page: Page) {
    return page.getByRole("spinbutton", { name: "Qty" });
  },
  addCart: function (page: Page) {
    return page.getByRole("button", { name: "Add to Cart" });
  },
  updateCart: function (page: Page) {
    return page.getByRole("button", { name: "Update" });
  },
};

export class CartPage {
  page: Page;
  exp: PlaywrightExp;
  basket: BasketPage;

  constructor(page: Page) {
    this.page = page;
    this.exp = new PlaywrightExp();
    this.basket = new BasketPage(this.page);
  }

  @step
  async gotoCart(productName: string) {
    const nameLower = productName.toLowerCase();
    const nameArr = nameLower.split(" ");
    let nameLink = "";
    for (let index = 0; index < nameArr.length; index++) {
      const element = nameArr[index];
      if (index === 0) {
        nameLink = element;
      } else {
        nameLink = nameLink + `-${element}`;
      }
    }
    await this.page.goto(`/${nameLink}.html`);
    await this.exp.toHaveTitle(this.page, productName);
    // await this.exp.toHaveText(this.page.locator("ul.items").locator("li"), [
    //   "Home",
    //   productName,
    // ]);
    await this.exp.toHaveText(this.page.locator("h1.page-title"), productName);
  }

  @step
  async fillCart(data: ICart) {
    await this.exp.toHaveText(
      el_cart.price(this.page),
      getPriceInDollars(data.price)
    );
    await el_cart.size(this.page, data.size).click();
    await el_cart.color(this.page, data.color).click();
    await el_cart.qty(this.page).fill(String(data.qty));
  }

  @step
  async addCart() {
    await el_cart.addCart(this.page).click();
  }

  @step
  async updateCart() {
    await el_cart.updateCart(this.page).click();
  }

  @step
  async checkFormCartError() {
    await this.exp.toHaveText(this.page.locator("div.mage-error"), [
      "This is a required field.",
      "This is a required field.",
    ]);
  }
}
