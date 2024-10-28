import { test } from "@playwright/test";
import { DataTest } from "../src/page_object/test_data";
import { AccountCreatePage } from "../src/page_object/account_create";

test.describe("account_create", function () {
  test(
    "account_create_complete",
    {
      annotation: {
        type: "task",
        description: "Успешно заведен новый пользователь",
      },
    },
    async ({ page }) => {
      const mDataTest = new DataTest();
      const mAccount = new AccountCreatePage(page);
      mDataTest.initDataAccount({ isNew: true });
      await mAccount.gotoAccountCreate();
      await mAccount.fillAccountCreateForm(mDataTest.account);
      await mAccount.createAccount();
      await mAccount.checkAccountCreateComplete();
    }
  );

  test(
    "account_create_form_help",
    {
      annotation: {
        type: "task",
        description: "Отображние подсказок при заведении пользователя",
      },
    },
    async ({ page }) => {
      const mDataTest = new DataTest();
      const mAccount = new AccountCreatePage(page);
      mDataTest.initDataAccount({ isNew: true });
      const data = mDataTest.account;
      data.firstName = "";
      data.lastName = "";
      data.email = "123";
      data.password = "123";
      data.passwordConfirm = "12";
      await mAccount.gotoAccountCreate();
      await mAccount.fillAccountCreateForm(data);
      await mAccount.createAccount();
      await mAccount.checkAccountCreateFormHelp([
        "firstName",
        "lastName",
        "email",
        "password",
        "passwordConfirm",
      ]);
    }
  );

  test(
    "account_create_already",
    {
      annotation: {
        type: "task",
        description: "Попытка завести аккаунт под существующим пользователем",
      },
    },
    async ({ page }) => {
      const mDataTest = new DataTest();
      const mAccount = new AccountCreatePage(page);
      mDataTest.initDataAccount({ isNew: false });
      await mAccount.gotoAccountCreate();
      await mAccount.fillAccountCreateForm(mDataTest.account);
      await mAccount.createAccount();
      await mAccount.checkAccountCreateAlready();
    }
  );
});
