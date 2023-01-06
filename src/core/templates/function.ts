import { itemsInBasket, countItemInBasket, sumItemInBasket, uniqueItemsInBasket } from '../../pages/app/app';
import productsList from '../../core/templates/product';
// let itemsInBasket: Array<number> = JSON.parse(localStorage.getItem('itemsInBasket')!);
// let uniqueItemsInBasket = new Set(itemsInBasket);

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
  uniqueItemsInBasket.clear();
  createUniqueItemsInBasket(itemsInBasket);
  console.log('uniqueItemsInBasket: ' + uniqueItemsInBasket.size);
  console.log();

  return itemsInBasket;
}
export function createUniqueItemsInBasket(arr: Array<number>): Set<number> {
  localStorage.setItem('itemsInBasket', JSON.stringify(itemsInBasket));
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
  const result = new Set(arr);
  while (itemsInBasket.includes(id)) {
    changeBasket(id, false);
  }
  return result;
}

export function checkCorrectInput(
  input: HTMLInputElement,
  lengthString: number,
  lengthWord: number,
  start?: string
): boolean {
  const inputValue = input.value.split(' ');
  let correct =
    inputValue.length > lengthString - 1 &&
    inputValue.length === inputValue.filter((el) => el.length > lengthWord - 1).length;
  if (start) {
    const startInput = input.value[0];
    correct = correct && startInput === start && inputValue.length === lengthString;
  }
  return correct;
}

export function confirm(arr: Array<boolean>, element: HTMLElement) {
  const arr1 = arr.filter((el) => el === true);
  if ((arr.length = arr1.length)) {
    const thanks = document.createElement('div');
    thanks.innerHTML = 'Congratulations, your order has been placed.';
    thanks.classList.add('modal-window');
    thanks.classList.add('thanks-window');
    element.replaceWith(thanks);
    const timeReload: ReturnType<typeof setTimeout> = setTimeout(function () {
      window.location.href = '';
      console.log('111111111');
    }, 5000);
    itemsInBasket.length = 0;
    localStorage.setItem('itemsInBasket', JSON.stringify(itemsInBasket));
    uniqueItemsInBasket.clear();
    return element;
  }
}
