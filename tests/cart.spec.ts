import test from "@playwright/test";
import { CartPage } from "../src/page_object/cart";
import { DataTest } from "../src/page_object/test_data";
import { ICart } from "../src/models/cart.model";

test.describe("product", function () {
  let product: ICart;

  test.beforeEach(async function () {
    const mDataTest = new DataTest();
    mDataTest.initDataCart();
    product = mDataTest.cart;
  });

  test(
    "cart_add",
    {
      annotation: {
        type: "task",
        description: "Проверка корзины после добавления товара",
      },
    },
    async ({ page }) => {
      const mCart = new CartPage(page);
      await mCart.gotoCart(product.name);
      await mCart.fillCart(product);
      await mCart.addCart();
      await mCart.basket.checkBasketQty(product.qty);
    }
  );

  test(
    "cart_form_error",
    {
      annotation: {
        type: "task",
        description: "Проверка подсказки если не указать данные товара",
      },
    },
    async ({ page }) => {
      const mCart = new CartPage(page);
      await mCart.gotoCart(product.name);
      await mCart.addCart();
      await mCart.checkFormCartError();
    }
  );

  test(
    "basket_cart_inform",
    {
      annotation: {
        type: "task",
        description: "Проверка данных о товаре в корзине",
      },
    },
    async ({ page }) => {
      const mCart = new CartPage(page);
      await mCart.gotoCart(product.name);
      await mCart.fillCart(product);
      await mCart.addCart();
      await mCart.basket.checkBasketQty(product.qty);
      await mCart.basket.clickBasket();
      await mCart.basket.checkBasketItems(product);
      await mCart.basket.checkBasketCart(product);
    }
  );

  test(
    "basket_cart_update",
    {
      annotation: {
        type: "task",
        description: "Изменение кол-ва товара в корзине",
      },
    },
    async ({ page }) => {
      const mCart = new CartPage(page);
      await mCart.gotoCart(product.name);
      await mCart.fillCart(product);
      await mCart.addCart();
      await mCart.basket.checkBasketQty(product.qty);
      await mCart.basket.clickBasket();
      product.qty = 7;
      await mCart.basket.updateBasketCartQty(product);
    }
  );

  test(
    "basket_cart_delete",
    {
      annotation: {
        type: "task",
        description: "Удаление товара из корзины",
      },
    },
    async ({ page }) => {
      const mCart = new CartPage(page);
      await mCart.gotoCart(product.name);
      await mCart.fillCart(product);
      await mCart.addCart();
      await mCart.basket.checkBasketQty(product.qty);
      await mCart.basket.clickBasket();
      await mCart.basket.deleteBasketCart();
    }
  );

  test(
    "basket_cart_edit",
    {
      annotation: {
        type: "task",
        description: "Редактирование товара из корзины",
      },
    },
    async ({ page }) => {
      const mCart = new CartPage(page);
      await mCart.gotoCart(product.name);
      await mCart.fillCart(product);
      await mCart.addCart();
      await mCart.basket.checkBasketQty(product.qty);
      await mCart.basket.clickBasket();
      await mCart.basket.editeBasketCart();
      product.size = "M";
      product.color = "Green";
      product.qty = 2;
      await mCart.fillCart(product);
      await mCart.updateCart();
      await mCart.basket.checkBasketQty(product.qty);
      await mCart.basket.clickBasket();
      await mCart.basket.checkBasketItems(product);
      await mCart.basket.checkBasketCart(product);
    }
  );
});
