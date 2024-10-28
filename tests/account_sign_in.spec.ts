import test from "@playwright/test";
import { DataTest } from "../src/page_object/test_data";
import { AccountSignInPage } from "../src/page_object/account_sign_in";
import { IAccount } from "../src/models/account.model";

test.describe("account_sign_in", function () {
  let account: IAccount;

  test.beforeEach(async function () {
    const mDataTest = new DataTest();
    mDataTest.initDataAccount({ isNew: false });
    account = mDataTest.account;
  });

  test(
    "account_sign_in_complete",
    {
      annotation: {
        type: "task",
        description: "Успешная авторизация",
      },
    },
    async ({ page }) => {
      const mAccount = new AccountSignInPage(page);
      await mAccount.gotoSignIn();
      await mAccount.fillSignInForm(account);
      await mAccount.checkSignInWelcome(account);
    }
  );

  test(
    "account_sign_in_form_error",
    {
      annotation: {
        type: "task",
        description: "Проверка подсказок при авторизации",
      },
    },
    async ({ page }) => {
      const mAccount = new AccountSignInPage(page);
      account.email = "1";
      account.password = "";
      await mAccount.gotoSignIn();
      await mAccount.fillSignInForm(account);
      await mAccount.checkSignInFormHelp(["email", "password"]);
    }
  );

  test(
    "account_sign_in_password_error",
    {
      annotation: {
        type: "task",
        description: "Неверно указан пароль",
      },
    },
    async ({ page }) => {
      const mAccount = new AccountSignInPage(page);
      account.password = "123";
      await mAccount.gotoSignIn();
      await mAccount.fillSignInForm(account);
      await mAccount.checkSignInPasswordError();
    }
  );
});
