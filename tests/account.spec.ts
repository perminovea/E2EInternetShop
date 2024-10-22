import { test, expect, BrowserContext, Page } from "@playwright/test";
import { AccountData, AccountPage } from "../src/pages";
import { describe } from "node:test";
import { IAccountData, IAccountDataTest } from "../src/account.model";
import { tr } from "@faker-js/faker/.";

test("create_success", async ({ page }) => {
  const account = new AccountData();
  account.initAccount({ isNew: true });
  const mAccount = new AccountPage(page);
  mAccount.initDataAccount(account.account);
  await mAccount.goto();
  await mAccount.fillAccount();
  await expect(page.getByText("Thank you for registering")).toBeVisible();
});

test("create_success_firstName", async ({ page }) => {
  const account = new AccountData();
  account.initAccount({ isNew: true });
  const mAccount = new AccountPage(page);
  const user: any = account.account;
  user.firstName = "";
  mAccount.initDataAccount(user);
  await mAccount.goto();
  await mAccount.fillAccount();
  await mAccount.checkAlert(["firstName"]);
});

test("create_success_fail_new", async ({ page }) => {
  const account = new AccountData();
  account.initAccount();
  const mAccount = new AccountPage(page);
  mAccount.initDataAccount(account.account);
  await mAccount.goto();
  await mAccount.fillAccount();
  await expect(page.getByText("There is already an account")).toBeVisible();
  await page.getByRole("link", { name: "click here" }).click();
  await expect(
    page.getByTestId("maincontent").getByText("Forgot Your Password?")
  ).toBeVisible();
  await page.getByTestId("email_address").fill(account.account.email);
  await page.getByRole("button", { name: "Reset My Password" }).click(); // ???????
  await expect(page.getByText("If there is an account")).toBeVisible();
});

test("autorization_fail", async ({ page }) => {
  const account = new AccountData();
  account.initAccount({ isNew: true });
  await page.goto("/customer/account/login/referer");
  await page.getByTestId("email").fill(account.account.email);
  await page
    .getByTestId("maincontent")
    .getByTestId("pass")
    .fill(account.account.password);
  await page.getByTestId("maincontent").getByTestId("send2").click();
  await expect(page.getByText("The account sign-in was")).toBeVisible();
});

test("autorization_not_fail", async ({ page }) => {
  const account = new AccountData();
  account.initAccount();
  await page.goto("/customer/account/login/referer");
  await page.getByTestId("email").fill(account.account.email);
  await page
    .getByTestId("maincontent")
    .getByTestId("pass")
    .fill(account.account.password);
  await page.getByTestId("maincontent").getByTestId("send2").click();
  await expect(
    page.getByRole("heading", { name: "My Account" }).locator("span")
  ).toBeVisible();
  await expect(page.getByText("Camryn Pouros Bennie.Koepp74@")).toBeVisible();
});

// test.describe("create_new_customer_account", function () {
//   describe("follow_link_create_account", function () {
//     const titleAccountPage = "Create New Customer Account";
//     test("follow_link_home page", async ({ page }) => {
//       await page.goto("");
//       await page.getByRole("link", { name: "Create an Account" }).click();
//       await expect(page.locator("h1")).toHaveText(titleAccountPage);
//     });
//     test("follow_link_account_login page", async ({ page }) => {
//       await page.goto("/customer/account/login/referer");
//       await page
//         .locator("#maincontent")
//         .getByRole("link", { name: "Create an Account" })
//         .click();
//       await expect(page.locator("h1")).toHaveText(titleAccountPage);
//     });
//   });

//});

// fetch(
//   "https://magento.softwaretestingboard.com/customer/account/loginPost/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS9jdXN0b21lci9hY2NvdW50L2xvZ291dFN1Y2Nlc3Mv/",
//   {
//     headers: {
//       accept:
//         "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
//       "accept-language": "en-US",
//       "cache-control": "max-age=0",
//       "content-type": "application/x-www-form-urlencoded",
//       priority: "u=0, i",
//       "sec-ch-ua": '"Not?A_Brand";v="99", "Chromium";v="130"',
//       "sec-ch-ua-mobile": "?0",
//       "sec-ch-ua-platform": '"Windows"',
//       "sec-fetch-dest": "document",
//       "sec-fetch-mode": "navigate",
//       "sec-fetch-site": "same-origin",
//       "sec-fetch-user": "?1",
//       "upgrade-insecure-requests": "1",
//       cookie:
//         "mage-cache-storage=%7B%7D; mage-cache-storage-section-invalidation=%7B%7D; _ga=GA1.2.1121923751.1729326956; _gid=GA1.2.1215660154.1729326956; recently_viewed_product=%7B%7D; recently_viewed_product_previous=%7B%7D; recently_compared_product=%7B%7D; recently_compared_product_previous=%7B%7D; product_data_storage=%7B%7D; mage-messages=; __gads=ID=a1c3477ff49c5f30:T=1729327009:RT=1729327382:S=ALNI_MYZCXhCSkDIDUTuATMcNT3hbslCkQ; __gpi=UID=00000f0d16163087:T=1729327009:RT=1729327382:S=ALNI_MZa2aVYVb3PjMGTHyc4XbW7rIzmrg; __eoi=ID=ef4f0d6fc51c6fd2:T=1729327009:RT=1729327382:S=AA-AfjZZJoJkHCO_0005BpW96C7g; private_content_version=a518baa0731c3035ab615ee71088c8d1; PHPSESSID=54e8ee0c79dfb0f954f44e3cdc2c5618; form_key=GiRJKokiBwE3hvvn; mage-cache-sessid=true; _ga_1SPG0WZDNF=GS1.2.1729326956.1.1.1729327453.56.0.0; section_data_ids=%7B%22customer%22%3A1729328503%2C%22compare-products%22%3A1729328503%2C%22last-ordered-items%22%3A1729328503%2C%22cart%22%3A1729328503%2C%22directory-data%22%3A1729328503%2C%22captcha%22%3A1729328503%2C%22instant-purchase%22%3A1729328503%2C%22persistent%22%3A1729328503%2C%22review%22%3A1729328503%2C%22wishlist%22%3A1729328503%2C%22recently_viewed_product%22%3A1729328503%2C%22recently_compared_product%22%3A1729328503%2C%22product_data_storage%22%3A1729328503%2C%22paypal-billing-agreement%22%3A1729328503%2C%22messages%22%3A1729328503%7D",
//       Referer:
//         "https://magento.softwaretestingboard.com/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS9jdXN0b21lci9hY2NvdW50L2xvZ291dFN1Y2Nlc3Mv/",
//       "Referrer-Policy": "strict-origin-when-cross-origin",
//     },
//     body: "form_key=GiRJKokiBwE3hvvn&login%5Busername%5D=Bennie.Koepp74%40gmail.com&login%5Bpassword%5D=Jq62b7RurQ6qCgz",
//     method: "POST",
//   }
// );

// fetch(
//   "https://magento.softwaretestingboard.com/customer/account/loginPost/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS9jdXN0b21lci9hY2NvdW50L2xvZ291dFN1Y2Nlc3Mv/",
//   {
//     headers: {
//       accept:
//         "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
//       "accept-language": "en-US",
//       "cache-control": "max-age=0",
//       "content-type": "application/x-www-form-urlencoded",
//       priority: "u=0, i",
//       "sec-ch-ua": '"Not?A_Brand";v="99", "Chromium";v="130"',
//       "sec-ch-ua-mobile": "?0",
//       "sec-ch-ua-platform": '"Windows"',
//       "sec-fetch-dest": "document",
//       "sec-fetch-mode": "navigate",
//       "sec-fetch-site": "same-origin",
//       "sec-fetch-user": "?1",
//       "upgrade-insecure-requests": "1",
//     },
//     referrer:
//       "https://magento.softwaretestingboard.com/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS9jdXN0b21lci9hY2NvdW50L2xvZ291dFN1Y2Nlc3Mv/",
//     referrerPolicy: "strict-origin-when-cross-origin",
//     body: "form_key=GiRJKokiBwE3hvvn&login%5Busername%5D=Bennie.Koepp74%40gmail.com&login%5Bpassword%5D=Jq62b7RurQ6qCgz",
//     method: "POST",
//     mode: "cors",
//     credentials: "include",
//   }
// );
// form_key=GiRJKokiBwE3hvvn&login%5Busername%5D=Bennie.Koepp74%40gmail.com&login%5Bpassword%5D=Jq62b7RurQ6qCgz
// form_key=sJdGalUFR3eNYyvl&login%5Busername%5D=Bennie.Koepp74%40gmail.com&login%5Bpassword%5D=Jq62b7RurQ6qCgz

// fetch("https://magento.softwaretestingboard.com/customer/account/loginPost/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS8%2C/", {
//   "headers": {
//     "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
//     "accept-language": "en-US",
//     "cache-control": "max-age=0",
//     "content-type": "application/x-www-form-urlencoded",
//     "priority": "u=0, i",
//     "sec-ch-ua": "\"Not?A_Brand\";v=\"99\", \"Chromium\";v=\"130\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"Windows\"",
//     "sec-fetch-dest": "document",
//     "sec-fetch-mode": "navigate",
//     "sec-fetch-site": "same-origin",
//     "sec-fetch-user": "?1",
//     "upgrade-insecure-requests": "1"
//   },
//   "referrer": "https://magento.softwaretestingboard.com/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS8%2C/",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": "form_key=sJdGalUFR3eNYyvl&login%5Busername%5D=Bennie.Koepp74%40gmail.com&login%5Bpassword%5D=Jq62b7RurQ6qCgz",
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "include"
// });