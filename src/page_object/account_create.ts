import { Locator, Page } from "@playwright/test";
import { IAccount, IAccountCreateComponentForm } from "../models/account.model";
import { PlaywrightExp, step } from "../main";

class AccountCreateComponent {
  page: Page;
  form: IAccountCreateComponentForm;
  formHelp: IAccountCreateComponentForm;
  create: Locator;
  message: {
    regThank: Locator;
    alreadyAccount: Locator;
    link: Locator;
  };

  constructor(page: Page) {
    this.page = page;
    this.form = {
      firstName: this.page.getByTestId("firstname"),
      lastName: this.page.getByTestId("lastname"),
      email: this.page.getByTestId("email_address"),
      password: this.page.getByTestId("password"),
      passwordConfirm: this.page.getByTestId("password-confirmation"),
    };
    this.formHelp = {
      firstName: this.page.getByTestId("firstname-error"),
      lastName: this.page.getByTestId("lastname-error"),
      email: this.page.getByTestId("email_address-error"),
      password: this.page.getByTestId("password-error"),
      passwordConfirm: this.page.getByTestId("password-confirmation-error"),
    };
    this.create = this.page.getByRole("button", {
      name: "Create an Account",
    });
    this.message = {
      regThank: this.page.getByText("Thank you for registering"),
      alreadyAccount: this.page.getByText("There is already an account"),
      link: this.page.getByRole("link", { name: "click here" }),
    };
  }
}

export class AccountCreatePage {
  page: Page;
  el: AccountCreateComponent;
  exp: PlaywrightExp;

  constructor(page: Page) {
    this.page = page;
    this.el = new AccountCreateComponent(this.page);
    this.exp = new PlaywrightExp();
  }

  @step
  async gotoAccountCreate() {
    await this.page.goto("customer/account/create/");
  }

  @step
  async fillAccountCreateForm(data: IAccount) {
    await this.el.form.firstName.fill(data.firstName);
    await this.el.form.lastName.fill(data.lastName);
    await this.el.form.email.fill(data.email);
    await this.el.form.password.fill(data.password);
    await this.el.form.passwordConfirm.fill(data.passwordConfirm);
  }

  @step
  async createAccount() {
    await this.el.create.click();
  }

  @step
  async checkAccountCreateComplete() {
    await this.exp.toBeVisible(this.el.message.regThank);
  }

  @step
  async checkAccountCreateFormHelp(fields: string[]) {
    const errorText = {
      firstName: "This is a required field.",
      lastName: "This is a required field.",
      email: "Please enter a valid email address (Ex: johndoe@domain.com).",
      password:
        "Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.",
      passwordConfirm: "Please enter the same value again.",
    };

    for (const field of fields) {
      await this.exp.toHaveText(this.el.formHelp[field], errorText[field]);
    }
  }

  @step
  async checkAccountCreateAlready() {
    await this.exp.toBeVisible(this.el.message.alreadyAccount);
    await this.exp.toBeVisible(this.el.message.link);
  }
}
