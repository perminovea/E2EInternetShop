import { Locator, Page } from "@playwright/test";
import { IAccount, IAccountSignInComponentForm } from "../models/account.model";
import { PlaywrightExp, step } from "../main";

class AccountSignInComponent {
  page: Page;
  form: IAccountSignInComponentForm;
  formHelp: IAccountSignInComponentForm;
  signIn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.form = {
      email: this.page.getByTestId("email"),
      password: this.page.getByLabel("Password"),
    };
    this.formHelp = {
      email: this.page.getByTestId("email-error"),
      password: this.page.getByTestId("pass-error"),
    };
    this.signIn = this.page.getByRole("button", { name: "Sign In" });
  }
}

export class AccountSignInPage {
  page: Page;
  el: AccountSignInComponent;
  exp: PlaywrightExp;

  constructor(page: Page) {
    this.page = page;
    this.exp = new PlaywrightExp();
    this.el = new AccountSignInComponent(this.page);
  }

  @step
  async gotoSignIn() {
    await this.page.goto("/customer/account/login/referer/");
  }

  @step
  async fillSignInForm(data: IAccount) {
    await this.el.form.email.fill(data.email);
    await this.el.form.password.fill(data.password);
    await this.el.signIn.click();
  }

  @step
  async checkSignInWelcome(data: IAccount) {
    await this.exp.toBeVisible(
      this.page
        .getByRole("banner")
        .getByText(`Welcome, ${data.firstName} ${data.lastName}!`)
    );
  }

  @step
  async checkSignInFormHelp(fields: string[]) {
    const errorText = {
      email: "Please enter a valid email address (Ex: johndoe@domain.com).",
      password: "This is a required field.",
    };

    for (const field of fields) {
      await this.exp.toHaveText(this.el.formHelp[field], errorText[field]);
    }
  }

  @step
  async checkSignInPasswordError() {
    await this.exp.toBeVisible(this.page.getByText("The account sign-in was"));
  }
}
