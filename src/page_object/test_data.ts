import { faker } from "@faker-js/faker";
import { IAccountTestData } from "../models/account.model";
import dataAccount from "../test_data/account.json";
import { step } from "./step";

function getAccountData(): IAccountTestData {
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
  account: IAccountTestData;

  @step
  initDataAccount(conf: { isNew: boolean }) {
    if (conf.isNew === false) {
      this.account = { ...dataAccount };
    } else {
      this.account = getAccountData();
    }
  }
}
