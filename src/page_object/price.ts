export function getPriceInDollars(price: number) {
  return "$" + Number(price).toFixed(2);
}
