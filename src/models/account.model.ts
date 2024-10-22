import { Locator } from "@playwright/test";

export interface IAccountTestData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface IElAccountNewForm {
  firstName: Locator;
  lastName: Locator;
  email: Locator;
  password: Locator;
  passwordConfirm: Locator;
}
