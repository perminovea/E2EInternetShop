import { Locator } from "@playwright/test";

export interface IAccount {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface IAccountCreateComponentForm {
  firstName: Locator;
  lastName: Locator;
  email: Locator;
  password: Locator;
  passwordConfirm: Locator;
}

export interface IAccountSignInComponentForm {
  email: Locator;
  password: Locator;
}
