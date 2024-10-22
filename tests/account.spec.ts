import { test } from "@playwright/test";
import { DataTest } from "../src/page_object/test_data";
import {
  AccountCreatePage,
  AccountSignInPage,
} from "../src/page_object/account";

test("create_account_complete", async ({ page }) => {
  const mDataTest = new DataTest();
  const mAccount = new AccountCreatePage(page);
  mDataTest.initDataAccount({ isNew: true });
  await mAccount.goto();
  await mAccount.fillForm(mDataTest.account);
  await mAccount.checkCreateComplete();
});

test("create_account_form_error", async ({ page }) => {
  const mDataTest = new DataTest();
  const mAccount = new AccountCreatePage(page);
  mDataTest.initDataAccount({ isNew: true });
  const data = mDataTest.account;
  data.firstName = "";
  data.lastName = "";
  data.email = "123";
  data.password = "123";
  data.passwordConfirm = "12";
  await mAccount.goto();
  await mAccount.fillForm(data);
  await mAccount.checkFormFieldError([
    "firstName",
    "lastName",
    "email",
    "password",
    "passwordConfirm",
  ]);
});

test("create_account_already_email", async ({ page }) => {
  const mDataTest = new DataTest();
  const mAccount = new AccountCreatePage(page);
  mDataTest.initDataAccount({ isNew: false });
  await mAccount.goto();
  await mAccount.fillForm(mDataTest.account);
  await mAccount.checkAlreadyAccount();
});

test("account_sign_in_complete", async ({ page }) => {
  const mDataTest = new DataTest();
  const mAccount = new AccountSignInPage(page);
  mDataTest.initDataAccount({ isNew: false });
  await mAccount.goto();
  await mAccount.fillForm(mDataTest.account);
  await mAccount.checkWelcome(mDataTest.account);
});

test("account_sign_in_form_error", async ({ page }) => {
  const mDataTest = new DataTest();
  const mAccount = new AccountSignInPage(page);
  mDataTest.initDataAccount({ isNew: false });
  const data = mDataTest.account;
  data.email = "1";
  data.password = "";
  await mAccount.goto();
  await mAccount.fillForm(mDataTest.account);
  await mAccount.checkFormFieldError(["email", "password"]);
});

test("account_sign_in_password_error", async ({ page }) => {
  const mDataTest = new DataTest();
  const mAccount = new AccountSignInPage(page);
  mDataTest.initDataAccount({ isNew: false });
  const data = mDataTest.account;
  data.password = "123";
  await mAccount.goto();
  await mAccount.fillForm(mDataTest.account);
  await mAccount.checkPasswordError();
});
