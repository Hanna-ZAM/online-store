import { itemsInBasket, countItemInBasket, sumItemInBasket, uniqueItemsInBasket } from '../../pages/app/app';
import productsList from '../../core/templates/product';

export function changeBasket(Id: number, add = true): Array<number> {
  if (add) {
    itemsInBasket.push(Id);
  } else if (itemsInBasket.includes(Id) && !add) {
    itemsInBasket.splice(itemsInBasket.indexOf(Id), 1);
  }
  countItemInBasket.innerHTML = itemsInBasket.length.toString();
  sumItemInBasket.innerHTML = `${itemsInBasket
    .reduce((acc: number, el: number): number => acc + productsList.products[el - 1].price, 0)
    .toString()} $`;
  return itemsInBasket;
}
export function createUniqueItemsInBasket(arr: Array<number>): Set<number> {
  arr.forEach((el) => {
    uniqueItemsInBasket.add(el);
  });
  return uniqueItemsInBasket;
}

export function changeQuantity(item: HTMLElement, direction: string): HTMLElement {
  const count = item.children[1].children[3].children[0].children[1].innerHTML;
  const id = Number(item.id);
  const price = productsList.products[id - 1].price;
  let rules;
  if (count !== '1' && direction === 'down') {
    rules = true;
  } else if (Number(count) < productsList.products[id - 1].stock && direction === 'up') {
    rules = true;
  } else {
    rules = false;
  }
  if (rules) {
    if (direction === 'down') {
      item.children[1].children[3].children[0].children[1].innerHTML = (Number(count) - 1).toString();
      changeBasket(id, false);
    } else {
      item.children[1].children[3].children[0].children[1].innerHTML = (Number(count) + 1).toString();
      changeBasket(id, true);
    }
    item.children[1].children[3].children[0].children[3].children[0].innerHTML = `${
      Number(item.children[1].children[3].children[0].children[1].innerHTML) * price
    } $`;
    const numEl = itemsInBasket.indexOf(+id);
  }
  return item;
}

export function deleteItemFromBasket(id: number, arr: Array<number>): Set<number> {
  const n = arr.indexOf(id);
  arr.splice(n, 1);
  console.log('вошли');
  const result = new Set(arr);
  while (itemsInBasket.includes(id)) {
    changeBasket(id, false);
  }
  return result;
}
