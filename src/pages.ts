import { faker } from "@faker-js/faker";
import accountData from "./account.json";
import { IAccountData } from "./account.model";
import test, { expect, Locator, Page } from "@playwright/test";

function step(target: Function, context: ClassMethodDecoratorContext) {
  return function replacementMethod(...args: any) {
    const name = this.constructor.name + "." + (context.name as string);
    return test.step(name, async () => {
      return await target.call(this, ...args);
    });
  };
}

export class AccountData {
  account: IAccountData;

  initAccount(conf?: { isNew: boolean }) {
    const account: IAccountData = { ...accountData };
    if (conf != undefined && conf.isNew === true) {
      account.firstName = faker.person.firstName();
      account.lastName = faker.person.lastName();
      account.email = faker.internet.email();
      account.password = faker.internet.password();
    }
    this.account = account;
  }
}
///customer/account/create/
// https://magento.softwaretestingboard.com/customer/account/index/

export class AccountPage {
  dataAccount: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirm: string;
  };
  readonly page: Page;
  readonly elAccount: {
    firstName: Locator;
    lastName: Locator;
    email: Locator;
    password: Locator;
    passwordConfirm: Locator;
    btnCreate: Locator;
  };
  readonly elAccountError: {
    firstName: Locator;
    lastName: Locator;
    email: Locator;
    password: Locator;
    passwordConfirm: Locator;
  };
  constructor(page: Page) {
    this.page = page;
    this.elAccount = {
      firstName: this.page.getByTestId("firstname"),
      lastName: this.page.getByTestId("lastname"),
      email: this.page.getByTestId("email_address"),
      password: this.page.getByTestId("password"),
      passwordConfirm: this.page.getByTestId("password-confirmation"),
      btnCreate: this.page.getByRole("button", { name: "Create an Account" }),
    };
    this.elAccountError = {
      firstName: this.page.locator("#firstname-error"),
      lastName: this.page.locator("#lastname-error"),
      email: this.page.locator("#email_address-error"),
      password: this.page.locator("#password-error"),
      passwordConfirm: this.page.locator("#password-confirmation-error"),
    };
  }
  @step
  async goto() {
    await this.page.goto("customer/account/create/");
  }

  @step
  initDataAccount(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirm?: string;
  }) {
    const dataAccount = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      passwordConfirm: data.password,
    };
    if (data.passwordConfirm)
      dataAccount.passwordConfirm = data.passwordConfirm;
    this.dataAccount = dataAccount;
  }

  @step
  async fillAccount() {
    const arrElForm = Object.entries(this.dataAccount);
    for (let index = 0; index < arrElForm.length; index++) {
      const el = arrElForm[index][0];
      const key = arrElForm[index][1];
      console.log("el", el);
      console.log("key", key);
      console.log("this.elAccount[el]", this.elAccount[el]);

      await this.elAccount[el].fill(key);
    }
    await this.elAccount.btnCreate.click();
  }

  @step
  async checkSuccess() {
    await expect(
      this.page.getByRole("heading", {
        name: "Thanks for getting in touch",
      })
    ).toHaveText("Thanks for getting in touch ${this.dataAccount.lastName}!");
  }

  @step
  async checkAlert(elemnts: string[]) {
    const alerts = {
      firstName: "This is a required field.",
      lastName: "This is a required field.",
      email: "Please enter a valid email address (Ex: johndoe@domain.com).",
      password:
        "Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.",
      passwordConfirm: "Please enter the same value again.",
    };
    for (const el of elemnts) {
      let textAlert: string;
      console.log(el);
      console.log(this.elAccountError[el]);
      console.log(alerts[el]);
      if (el.length === 0) {
        textAlert = "This is a required field.";
      } else {
        textAlert = alerts[el];
      }
      await expect(this.elAccountError[el]).toHaveText(alerts[el]);
    }
  }
}

// await page.goto('https://magento.softwaretestingboard.com/customer/account/create/');
// await page.locator('#password-error').click();
// await page.locator('#password-confirmation-error').click();
// await page.locator('body').press('F12');
// await page.locator('body').press('F12')
