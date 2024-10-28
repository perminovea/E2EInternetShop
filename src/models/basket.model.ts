import { Locator } from "@playwright/test";

export interface IBasketComponentCartsAll {
  items: Locator;
  subtotal: Locator;
  price: Locator;
}

export interface IBasketComponentCart {
  name: Locator;
  details: Locator;
  dt: Locator;
  dd: Locator;
  price: Locator;
  qty: Locator;
  update: Locator;
  delete: Locator;
  edit: Locator;
}
