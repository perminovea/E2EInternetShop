import test from "@playwright/test";
import dataJson from "../src/test_data/cart.json";
import { CartPage } from "../src/page_object/cart";

test("product_add_to_cart", async ({ page }) => {
  const product = { ...dataJson };
  const mCart = new CartPage(page);
  await mCart.goto(product.name);
  await mCart.fillCart(product);
  await mCart.addCart();
  await mCart.basket.checkBasketQty(String(product.qty));
});

test("product_cart_form_error", async ({ page }) => {
  const product = { ...dataJson };
  const mCart = new CartPage(page);
  await mCart.goto(product.name);
  await mCart.addCart();
  await mCart.checkFormCartError();
});
