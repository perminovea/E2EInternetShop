import { test, expect, BrowserContext, Page } from "@playwright/test";

test("circe_hooded_ice_fleece_add", async ({ page }) => {
  await page.goto("/circe-hooded-ice-fleece.html");
  await expect(page).toHaveTitle("Circe Hooded Ice Fleece");
  //   const elPageMain = page.getByTestId("maincontent");
  //   await expect(page.locator("ul.items").locator("li")).toHaveText([
  //     "Home",
  //     "Circe Hooded Ice Fleece",
  //   ]);
  //   await expect(page.locator("h1.page-title")).toHaveText(
  //     "Circe Hooded Ice Fleece"
  //   );
  await expect(
    page.locator(`xpath=//span[@data-price-type='finalPrice']//span`).first()
  ).toHaveText("$68.00");

  await page.getByLabel("XS").click();

  await page.getByLabel("Gray").click();
  await expect(
    page.locator("span.swatch-attribute-selected-option")
  ).toHaveText(["XS", "Gray"]);
  await page.getByRole("spinbutton", { name: "Qty" }).fill("3");
  await page.getByRole("button", { name: "Add to Cart" }).click();
  await expect(page.locator(`xpath=//span[@class='counter qty']`)).toHaveText(
    "3"
  );
  await page.getByRole("link", { name: "shopping cart" }).click();
  //div[@data-ui-id='message-success']
  // getByRole('alert').locator('div').first()
  //   await page.goto("/checkout/#shipping");
  //   await expect(page.getByRole("tab", { name: "Items in Cart" })).toHaveText(
  //     "3"
  //   );
  ////span[@class='counter qty']
  //await page.locator(`xpath=//a[@class='action showcart']`).click();
});

test("circe_hooded_error", async ({ page }) => {
  await page.goto("/circe-hooded-ice-fleece.html");
  await expect(page).toHaveTitle("Circe Hooded Ice Fleece");
  await page
    .getByRole("button", { name: "Add to Cart" })
    .click({ force: true });

  await expect(page.locator("div.mage-error")).toHaveText([
    "This is a required field.",
    "This is a required field.",
  ]);
});

test("circe_hooded_ice_fleece_add_two", async ({ page }) => {
  await page.goto("/circe-hooded-ice-fleece.html");
  //await expect(page).toHaveTitle("Circe Hooded Ice Fleece");
  await expect(
    page.locator(`xpath=//span[@data-price-type='finalPrice']//span`).first()
  ).toHaveText("$68.00");

  await page.getByLabel("XS").click();

  await page.getByLabel("Gray").click();
  await page.getByRole("spinbutton", { name: "Qty" }).fill("3");
  await page.getByRole("button", { name: "Add to Cart" }).click();
  //   await expect(page.locator(`xpath=//span[@class='counter qty']`)).toHaveText(
  //     "3"
  //   );
  await expect(page.locator(`span.counter-number`)).toHaveText("3");
  await page.locator(`xpath=//a[@class='action showcart']`).click();
  let minicart = page.getByTestId("minicart-content-wrapper");
  // id btn-minicart-close
  await expect(minicart.locator("div.items-total").locator("span")).toHaveText([
    "3",
    "Item in Cart",
  ]);
  await expect(
    minicart.locator("div.subtotal").locator("span.label")
  ).toHaveText("Cart Subtotal");
  await expect(
    minicart.locator("div.subtotal").locator("span.price-wrapper")
  ).toHaveText("$204.00");
  let minicartP = page.getByTestId("mini-cart");
  let details = minicartP.locator("div.product-item-details");
  await expect(details.locator("strong.product-item-name")).toHaveText(
    "Circe Hooded Ice Fleece"
  );
  await details.getByText("See Details").click();
  let dl = details.locator("dl");
  await expect(dl.locator("dt")).toHaveText(["Size", "Color"]);
  await expect(dl.locator("dd")).toHaveText(["XS", "Gray"]);
  await expect(details.locator("span.minicart-price")).toHaveText("$68.00");
  await expect(details.locator("input.cart-item-qty")).toHaveValue("3");
});

test("circe_hooded_ice_fleece_add_two_tttt", async ({ page }) => {
  await page.goto("/circe-hooded-ice-fleece.html");
  await page.getByLabel("XS").click();
  await page.getByLabel("Gray").click();
  await page.getByRole("spinbutton", { name: "Qty" }).fill("3");
  await page.getByRole("button", { name: "Add to Cart" }).click();
  await expect(page.locator(`span.counter-number`)).toHaveText("3");
  await page.locator(`xpath=//a[@class='action showcart']`).click();

  let minicartP = page.getByTestId("mini-cart");
  let details = minicartP.locator("div.product-item-details");
  await expect(details.locator("strong.product-item-name")).toHaveText(
    "Circe Hooded Ice Fleece"
  );
  await details.locator("input.cart-item-qty").fill("2");
  await details.locator("input.cart-item-qty").press("Enter");
  await page.getByRole("button", { name: "Update" }).click();
  let minicart = page.getByTestId("minicart-content-wrapper");
  await expect(minicart.locator("div.items-total").locator("span")).toHaveText([
    "2",
    "Item in Cart",
  ]);
  await expect(
    minicart.locator("div.subtotal").locator("span.label")
  ).toHaveText("Cart Subtotal");
  await expect(
    minicart.locator("div.subtotal").locator("span.price-wrapper")
  ).toHaveText("$136.00");
});

test("circe_hooded_ice_deleta", async ({ page }) => {
  await page.goto("/circe-hooded-ice-fleece.html");
  await page.getByLabel("XS").click();
  await page.getByLabel("Gray").click();
  await page.getByRole("spinbutton", { name: "Qty" }).fill("3");
  await page.getByRole("button", { name: "Add to Cart" }).click();
  await expect(page.locator(`span.counter-number`)).toHaveText("3");
  await page.locator(`xpath=//a[@class='action showcart']`).click();

  let minicartP = page.getByTestId("mini-cart");
  let details = minicartP.locator("div.product-item-details");
  let deleteEl = details.locator("a.delete");
  await deleteEl.click();
  await expect(page.getByText("Are you sure you would like")).toBeVisible();
  await page.getByRole("button", { name: "OK" }).click();
  await expect(page.locator(`span.counter-number`)).toHaveText("0");
});

test("circe_hooded_ice_edit", async ({ page }) => {
  await page.goto("/circe-hooded-ice-fleece.html");
  await page.getByLabel("XS").click();
  await page.getByLabel("Gray").click();
  await page.getByRole("spinbutton", { name: "Qty" }).fill("3");
  await page.getByRole("button", { name: "Add to Cart" }).click();
  await expect(page.locator(`span.counter-number`)).toHaveText("3");
  await page.locator(`xpath=//a[@class='action showcart']`).click();

  let minicartP = page.getByTestId("mini-cart");
  let details = minicartP.locator("div.product-item-details");
  let deleteEl = details.locator("a.edit");
  await deleteEl.click();

  await page.getByLabel("M", { exact: true }).click();
  await page.getByLabel("Green").click();
  await page.getByRole("spinbutton", { name: "Qty" }).fill("5");
  await page.getByRole("button", { name: "Update Cart" }).click();
  await expect(page.locator(`span.counter-number`)).toHaveText("5");
});

test("circe_hooded_ice_senf", async ({ page }) => {
  await page.goto("/circe-hooded-ice-fleece.html");
  await page.getByLabel("XS").click();
  await page.getByLabel("Gray").click();
  await page.getByRole("spinbutton", { name: "Qty" }).fill("3");
  await page.getByRole("button", { name: "Add to Cart" }).click();
  await expect(page.locator(`span.counter-number`)).toHaveText("3");
  await page.locator(`xpath=//a[@class='action showcart']`).click();

  await page.getByRole("button", { name: "Proceed to Checkout" }).click();

  await page.getByTestId("customer-email").fill("2");
  await page.getByLabel("First Name").fill("");
  await page.getByLabel("Last Name").fill("");
  await page.getByLabel("Company").fill("");
  await page.getByLabel("Street Address: Line 1").fill("1");
  await page.getByLabel("Street Address: Line 2").fill("2");
  await page.getByLabel("Street Address: Line 3").fill("3");
  await page.getByLabel("City").fill("f");
  await page.locator('select[name="region_id"]').click();
  await page.locator('select[name="region_id"]').selectOption("12");
  await page.getByLabel("Zip/Postal Code").fill("33");
  await page.getByLabel("Country").click();
  await page.getByLabel("Country").selectOption("TN");
  await page.getByLabel('Phone Number').fill("4444")
  await page.getByRole('button', { name: 'Next' }).click();
});

import { en, Faker } from "@faker-js/faker";
const faker = new Faker({
    locale: [en],
  });
console.log(faker.internet.email());
console.log(faker.person.firstName());
console.log(faker.person.lastName());
console.log(faker.company.name());
console.log(faker.location.street());
console.log(faker.location.city());
console.log(faker.location.state());
console.log(faker.location.country());
console.log(faker.phone.number());