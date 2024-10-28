import test from "@playwright/test";
import dataJson from "../src/test_data/cart.json";
import { CartPage } from "../src/page_object/cart";

test("product_add_to_cart", async ({ page }) => {
  const product = { ...dataJson };
  const mCart = new CartPage(page);
  await mCart.goto(product.name);
  await mCart.fillCart(product);
  await mCart.addCart();
  await mCart.basket.checkQty(product.qty);
});

test("product_cart_form_error", async ({ page }) => {
  const product = { ...dataJson };
  const mCart = new CartPage(page);
  await mCart.goto(product.name);
  await mCart.addCart();
  await mCart.checkFormCartError();
});

test("product_cart_check_basket_inf", async ({ page }) => {
  const product = { ...dataJson };
  const mCart = new CartPage(page);
  await mCart.goto(product.name);
  await mCart.fillCart(product);
  await mCart.addCart();
  await mCart.basket.checkQty(product.qty);
  await mCart.basket.clickBasket();
  await mCart.basket.checkCartsAll(product);
  await mCart.basket.checkCart(product);
});

test("product_cart_check_update_basket_inf", async ({ page }) => {
  const product = { ...dataJson };
  const mCart = new CartPage(page);
  await mCart.goto(product.name);
  await mCart.fillCart(product);
  await mCart.addCart();
  await mCart.basket.checkQty(product.qty);
  await mCart.basket.clickBasket();
  product.qty = 7;
  await mCart.basket.updateQtyCart(product);
});

test("product_cart_check_delete_cart", async ({ page }) => {
  const product = { ...dataJson };
  const mCart = new CartPage(page);
  await mCart.goto(product.name);
  await mCart.fillCart(product);
  await mCart.addCart();
  await mCart.basket.checkQty(product.qty);
  await mCart.basket.clickBasket();
  await mCart.basket.deleteCart();
});

test("product_cart_check_edit_cart", async ({ page }) => {
  const product = { ...dataJson };
  const mCart = new CartPage(page);
  await mCart.goto(product.name);
  await mCart.fillCart(product);
  await mCart.addCart();
  await mCart.basket.checkQty(product.qty);
  await mCart.basket.clickBasket();
  await mCart.basket.editCart();
  product.size = "M";
  product.color = "Green";
  product.qty = 2;
  await mCart.fillCart(product);
  await mCart.updateCart();
  await mCart.basket.checkQty(product.qty);
  await mCart.basket.clickBasket();
  await mCart.basket.checkCartsAll(product);
  await mCart.basket.checkCart(product);
});
