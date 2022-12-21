import { ProductType } from './product';

export function sorting(arr: ProductType[], value: string) {
  if (value === '1') {
    arr.sort((a: ProductType, b: ProductType) => (a.price > b.price ? 1 : -1));
  }
  if (value === '2') {
    arr.sort((a: ProductType, b: ProductType) => (a.price < b.price ? 1 : -1));
  }
  if (value === '3') {
    arr.sort((a: ProductType, b: ProductType) => (a.rating > b.rating ? 1 : -1));
  }
  if (value === '4') {
    arr.sort((a: ProductType, b: ProductType) => (a.rating < b.rating ? 1 : -1));
  }
  if (value === '5') {
    arr.sort((a: ProductType, b: ProductType) => (a.discountPercentage > b.discountPercentage ? 1 : -1));
  }
  if (value === '6') {
    arr.sort((a: ProductType, b: ProductType) => (a.discountPercentage < b.discountPercentage ? 1 : -1));
  }

  return arr;
}
