import { Locator, Page } from "@playwright/test";
import { step } from "./step";
import { PlaywrightExp } from "./playwright_exp";
import { ICartTestData } from "../models/cart.model";
import { getPriceInDollars } from "./price";

export class BasketEl {
  page: Page;
  counter: Locator;
  showcart: Locator;
  _items: Locator;
  cartsAll: {
    items: Locator;
    subtotal: Locator;
    price: Locator;
  };
  _item: Locator;
  _itemDl: Locator;
  cart: {
    name: Locator;
    details: Locator;
    dt: Locator;
    dd: Locator;
    price: Locator;
    qty: Locator;
    update: Locator;
    delete: Locator;
    edit: Locator;
  };

  constructor(page: Page) {
    this.page = page;
    this.counter = this.page.locator(`span.counter-number`);
    this.showcart = this.page.locator(`xpath=//a[@class='action showcart']`);
    this._items = this.page.getByTestId("minicart-content-wrapper");
    this.cartsAll = {
      items: this._items.locator("div.items-total").locator("span"),
      subtotal: this._items.locator("div.subtotal").locator("span.label"),
      price: this._items.locator("div.subtotal").locator("span.price-wrapper"),
    };
    this._item = this.page
      .getByTestId("mini-cart")
      .locator("div.product-item-details");
    this._itemDl = this._item.locator("dl");
    this.cart = {
      name: this._item.locator("strong.product-item-name"),
      details: this._item.getByText("See Details"),
      dt: this._itemDl.locator("dt"),
      dd: this._itemDl.locator("dd"),
      price: this._item.locator("span.minicart-price"),
      qty: this._item.locator("input.cart-item-qty"),
      update: this.page.getByRole("button", { name: "Update" }),
      delete: this._item.locator("a.delete"),
      edit: this._item.locator("a.edit"),
    };
  }
}

export class BasketPage {
  page: Page;
  exp: PlaywrightExp;
  el: BasketEl;

  constructor(page: Page) {
    this.page = page;
    this.exp = new PlaywrightExp();
    this.el = new BasketEl(this.page);
  }

  @step
  async checkQty(qty: number) {
    await this.exp.toHaveText(this.el.counter, String(qty));
  }

  @step
  async clickBasket() {
    await this.el.showcart.click();
  }

  @step
  async checkCartsAll(product: ICartTestData) {
    await this.exp.toHaveText(this.el.cartsAll.items, [
      String(product.qty),
      "Item in Cart",
    ]);
    await this.exp.toHaveText(this.el.cartsAll.subtotal, "Cart Subtotal");
    await this.exp.toHaveText(
      this.el.cartsAll.price,
      getPriceInDollars(product.qty * product.price)
    );
  }

  @step
  async checkCart(product: {
    name?: string;
    size?: string;
    color?: string;
    price?: number;
    qty?: number;
  }) {
    if (product.name)
      await this.exp.toHaveText(this.el.cart.name, product.name);
    if (product.size && product.color) {
      await this.el.cart.details.click();
      await this.exp.toHaveText(this.el.cart.dt, ["Size", "Color"]);
      await this.exp.toHaveText(this.el.cart.dd, [product.size, product.color]);
    }
    if (product.price)
      await this.exp.toHaveText(
        this.el.cart.price,
        getPriceInDollars(product.price)
      );
    if (product.qty)
      await this.exp.toHaveValue(this.el.cart.qty, String(product.qty));
  }

  @step
  async updateQtyCart(product: ICartTestData) {
    await this.checkCart({ name: product.name });
    await this.el.cart.qty.fill(String(product.qty));
    await this.el.cart.qty.press("Enter");
    await this.el.cart.update.click();
    await this.checkCartsAll(product);
  }

  @step
  async deleteCart() {
    await this.el.cart.delete.click();
    await this.exp.toBeVisible(
      this.page.getByText("Are you sure you would like")
    );
    await this.page.getByRole("button", { name: "OK" }).click();
    await this.checkQty(0);
  }

  @step
  async editCart() {
    await this.el.cart.edit.click();
  }
}
