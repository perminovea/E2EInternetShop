import { faker } from "@faker-js/faker";
import { IAccount } from "../models/account.model";
import dataAccount from "../test_data/account.json";
import dataCart from "../test_data/cart.json";
import { step } from "../main";
import { ICart } from "../models/cart.model";

function getAccountData(): IAccount {
  const password = faker.internet.password();
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: password,
    passwordConfirm: password,
  };
}

export class DataTest {
  account: IAccount;
  cart: ICart;

  @step
  initDataAccount(conf: { isNew: boolean }) {
    if (conf.isNew === false) {
      this.account = { ...dataAccount };
    } else {
      this.account = getAccountData();
    }
  }

  @step
  initDataCart() {
    this.cart = { ...dataCart };
  }
}
