import test, { Locator, Page, expect } from "@playwright/test";

export class PlaywrightExp {
  async toBeVisible(element: Locator) {
    await expect(element).toBeVisible();
  }
  async toHaveText(element: Locator, value: string | string[]) {
    await expect(element).toHaveText(value);
  }
  async toHaveValue(element: Locator, value: string) {
    await expect(element).toHaveValue(value);
  }
  async toHaveTitle(page: Page, value: string) {
    await expect(page).toHaveTitle(value);
  }
}
/**
 * Преобразует число в стоимость $
 *
 * @export
 * @param {number} price
 * @return {*}
 */
export function getPriceInDollars(price: number) {
  return "$" + Number(price).toFixed(2);
}
/**
 * Декоратор для отображения метода класса как отделный блок в отчете
 *
 * @export
 * @param {Function} target
 * @param {ClassMethodDecoratorContext} context
 * @return {*}
 */
export function step(target: Function, context: ClassMethodDecoratorContext) {
  return function replacementMethod(...args: any) {
    const name = this.constructor.name + "." + (context.name as string);
    return test.step(name, async () => {
      return await target.call(this, ...args);
    });
  };
}
