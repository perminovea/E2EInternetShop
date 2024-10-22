import { Locator, Page } from "@playwright/test";
import { PlaywrightExp } from "./playwright_exp";
import { step } from "./step";
import { IAccountTestData, IElAccountNewForm } from "../models/account.model";

class ElAccountCreate {
  page: Page;
  form: IElAccountNewForm;
  formError: IElAccountNewForm;
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
    this.formError = {
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
  exp: PlaywrightExp;
  elForm: ElAccountCreate;

  constructor(page: Page) {
    this.page = page;
    this.exp = new PlaywrightExp();
    this.elForm = new ElAccountCreate(this.page);
  }

  @step
  async goto() {
    await this.page.goto("customer/account/create/");
  }

  @step
  async fillForm(data: IAccountTestData) {
    await this.elForm.form.firstName.fill(data.firstName);
    await this.elForm.form.lastName.fill(data.lastName);
    await this.elForm.form.email.fill(data.email);
    await this.elForm.form.password.fill(data.password);
    await this.elForm.form.passwordConfirm.fill(data.passwordConfirm);
    await this.elForm.create.click();
  }

  @step
  async checkCreateComplete() {
    await this.exp.toBeVisible(this.elForm.message.regThank);
  }

  @step
  async checkFormFieldError(fields: string[]) {
    const errorText = {
      firstName: "This is a required field.",
      lastName: "This is a required field.",
      email: "Please enter a valid email address (Ex: johndoe@domain.com).",
      password:
        "Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.",
      passwordConfirm: "Please enter the same value again.",
    };
    for (const field of fields) {
      await this.exp.toHaveText(this.elForm.formError[field], errorText[field]);
    }
  }

  @step
  async checkAlreadyAccount() {
    await this.exp.toBeVisible(this.elForm.message.alreadyAccount);
    await this.exp.toBeVisible(this.elForm.message.link);
  }
}

class ElAccountSignIn {
  page: Page;
  form: {
    email: Locator;
    password: Locator;
  };
  formError: {
    email: Locator;
    password: Locator;
  };
  signIn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.form = {
      email: this.page.getByTestId("email"),
      password: this.page.getByLabel("Password"),
    };
    this.formError = {
      email: this.page.getByTestId("email-error"),
      password: this.page.getByTestId("pass-error"),
    };
    this.signIn = this.page.getByRole("button", { name: "Sign In" });
  }
}

export class AccountSignInPage {
  page: Page;
  exp: PlaywrightExp;
  elForm: ElAccountSignIn;

  constructor(page: Page) {
    this.page = page;
    this.exp = new PlaywrightExp();
    this.elForm = new ElAccountSignIn(this.page);
  }

  @step
  async goto() {
    await this.page.goto("/customer/account/login/referer/");
  }

  @step
  async fillForm(data: IAccountTestData) {
    await this.elForm.form.email.fill(data.email);
    await this.elForm.form.password.fill(data.password);
    await this.elForm.signIn.click();
  }

  @step
  async checkWelcome(data: IAccountTestData) {
    await this.exp.toBeVisible(
      this.page
        .getByRole("banner")
        .getByText(`Welcome, ${data.firstName} ${data.lastName}!`)
    );
  }

  @step
  async checkFormFieldError(fields: string[]) {
    const errorText = {
      email: "Please enter a valid email address (Ex: johndoe@domain.com).",
      password: "This is a required field.",
    };
    for (const field of fields) {
      await this.exp.toHaveText(this.elForm.formError[field], errorText[field]);
    }
  }

  @step
  async checkPasswordError() {
    await this.exp.toBeVisible(this.page.getByText("The account sign-in was"));
  }
}
