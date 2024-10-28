import { Locator, Page } from "@playwright/test";
import { ICart } from "../models/cart.model";
import { getPriceInDollars, PlaywrightExp, step } from "../main";
import {
  IBasketComponentCart,
  IBasketComponentCartsAll,
} from "../models/basket.model";

export class BasketComponent {
  page: Page;
  basketCounter: Locator;
  basketShow: Locator;
  _items: Locator;
  _item: Locator;
  _itemDl: Locator;
  cartsAll: IBasketComponentCartsAll;
  cart: IBasketComponentCart;

  constructor(page: Page) {
    this.page = page;
    this.basketCounter = this.page.locator(`span.counter-number`);
    this.basketShow = this.page.locator(`xpath=//a[@class='action showcart']`);
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
  #el: BasketComponent;
  #exp: PlaywrightExp;

  constructor(page: Page) {
    this.page = page;
    this.#el = new BasketComponent(this.page);
    this.#exp = new PlaywrightExp();
  }

  @step
  async checkBasketQty(qty: number) {
    await this.#exp.toHaveText(this.#el.basketCounter, String(qty));
  }

  @step
  async clickBasket() {
    await this.#el.basketShow.click();
  }

  @step
  async checkBasketItems(product: ICart) {
    await this.#exp.toHaveText(this.#el.cartsAll.items, [
      String(product.qty),
      "Item in Cart",
    ]);
    await this.#exp.toHaveText(this.#el.cartsAll.subtotal, "Cart Subtotal");
    await this.#exp.toHaveText(
      this.#el.cartsAll.price,
      getPriceInDollars(product.qty * product.price)
    );
  }

  @step
  async checkBasketCart(product: ICart) {
    await this.#exp.toHaveText(this.#el.cart.name, product.name);
    await this.#el.cart.details.click();
    await this.#exp.toHaveText(this.#el.cart.dt, ["Size", "Color"]);
    await this.#exp.toHaveText(this.#el.cart.dd, [product.size, product.color]);
    await this.#exp.toHaveText(
      this.#el.cart.price,
      getPriceInDollars(product.price)
    );
    await this.#exp.toHaveValue(this.#el.cart.qty, String(product.qty));
  }

  @step
  async updateBasketCartQty(product: ICart) {
    await this.#el.cart.qty.fill(String(product.qty));
    await this.#el.cart.qty.press("Enter");
    await this.#el.cart.update.click();
    await this.checkBasketItems(product);
  }

  @step
  async deleteBasketCart() {
    await this.#el.cart.delete.click();
    await this.#exp.toBeVisible(
      this.page.getByText("Are you sure you would like")
    );
    await this.page.getByRole("button", { name: "OK" }).click();
    await this.checkBasketQty(0);
  }

  @step
  async editeBasketCart() {
    await this.#el.cart.edit.click();
  }
}
