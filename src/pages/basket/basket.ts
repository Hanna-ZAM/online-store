import Page from '../../core/templates/page';
import productsList from '../../core/templates/product';

import App, { itemsInBasket, sumItemInBasket, uniqueItemsInBasket } from '../../pages/app/app';
import { /* changeBasket,*/ changeQuantity, deleteItemFromBasket } from '../../core/templates/function';
import { createModalWindow } from '../../core/templates/modal';
import { Query, syncURL, transformToURLParams } from '../../core/templates/queryFunction';

export const enum Promo {
  promo5 = '5',
  promo10 = '10',
  promo8 = '8',
}
const discountArr: Array<number> = [];

class BasketPage extends Page {
  params: Query;
  static TextObject = {
    MainTitle: 'Cart',
  };

  constructor(id: string) {
    super(id);
    this.params = {};
  }
  private changeRoute(route: string) {
    history.pushState({}, '', `/${route}`);
    App.renderNewPage(route);
  }

  createBasketItem(n: number): HTMLElement {
    const item = this.createElement('', 'li', 'basket-item');
    item.setAttribute('id', `${[...uniqueItemsInBasket][n]}`);
    const buttonDel = this.createElement('Delete X', 'p', 'basket-item__del');

    const itemContainer = this.createElement('', 'div', 'flex-container');
    itemContainer.classList.add('flex-container-space');
    const itemNumber = this.createElement(`${n + 1}`, 'p', 'basket-item__count');
    const itemImg = this.createElement('', 'img', 'basket-item__img');
    console.log(productsList.products[[...uniqueItemsInBasket][n] - 1]);
    itemImg.setAttribute('src', `${productsList.products[[...uniqueItemsInBasket][n] - 1].thumbnail}`);
    itemImg.setAttribute('alt', 'photo');

    const flexContainerName = this.createElement('', 'div', 'flex-container');
    flexContainerName.classList.add('flex-container-colomn');
    const titleItem = this.createElement(
      `${productsList.products[[...uniqueItemsInBasket][n] - 1].title}`,
      'h2',
      'basket-item__title'
    );
    const categoryItem = this.createElement(
      `${productsList.products[[...uniqueItemsInBasket][n] - 1].category}`,
      'p',
      'basket-item__catagory'
    );
    flexContainerName.appendChild(titleItem);
    flexContainerName.appendChild(categoryItem);
    const count = itemsInBasket.filter((el) => el === [...uniqueItemsInBasket][n]).length;

    const flexContainerPrice = this.createElement('', 'div', 'flex-container');
    flexContainerPrice.classList.add('flex-container-colomn');
    const flexContainerCount = this.createElement('', 'div', 'flex-container');
    flexContainerCount.classList.add('flex-container-space');

    const buttonMinus = this.createElement(`-`, 'span', 'square');
    const countItem = this.createElement(`${count}`, 'p', 'basket-item__count');
    const buttonPlus = this.createElement(`+`, 'span', 'square');
    flexContainerCount.appendChild(buttonMinus);
    flexContainerCount.appendChild(countItem);
    flexContainerCount.appendChild(buttonPlus);

    const flexContainerTotal = this.createElement('', 'div', 'flex-container');
    flexContainerTotal.classList.add('flex-container-colomn');

    const priceTotal = this.createElement(
      `${productsList.products[itemsInBasket[n] - 1].price * Number(countItem.innerHTML)} $`,
      'p',
      'basket-item__total'
    );

    flexContainerTotal.appendChild(priceTotal);
    flexContainerCount.appendChild(flexContainerTotal);

    const categoryStock = this.createElement(
      `Stock: ${productsList.products[itemsInBasket[n] - 1].stock}`,
      'p',
      'basket-item__stock'
    );
    flexContainerPrice.appendChild(flexContainerCount);
    flexContainerPrice.appendChild(categoryStock);

    itemContainer.appendChild(itemNumber);
    itemContainer.appendChild(itemImg);
    itemContainer.appendChild(flexContainerName);
    itemContainer.appendChild(flexContainerPrice);

    item.appendChild(buttonDel);
    item.appendChild(itemContainer);

    return item;
  }

  createBasketList(
    basketList: HTMLElement,
    pageNum: number,
    itemsPerPage: HTMLElement,
    countPage: HTMLElement
  ): HTMLElement {
    if (basketList.children) {
      [...basketList.children].forEach((element) => {
        basketList.removeChild(element);
      });
    }

    let pageCount = Math.ceil(uniqueItemsInBasket.size / Number((itemsPerPage as HTMLInputElement).value));
    if (pageNum > pageCount) {
      pageNum = pageCount;
    }
    const start = (pageNum - 1) * Number((itemsPerPage as HTMLInputElement).value);
    if (uniqueItemsInBasket.size === 0) {
      const item = this.createElement('Basket is empty', 'li', 'basket-item');
      countPage.innerHTML = ` Page 1 from 1 `;
      basketList.appendChild(item);
    }

    let end = start + Number((itemsPerPage as HTMLInputElement).value);
    if (end > uniqueItemsInBasket.size) {
      end = uniqueItemsInBasket.size;
    }
    if (pageCount === 0) {
      pageCount = 1;
      pageNum = 1;
    }
    countPage.innerHTML = ` Page ${pageNum} from ${pageCount} `;
    if (!(uniqueItemsInBasket.size === 0)) {
      for (let i = start; i < end; i++) {
        const item = this.createBasketItem(i);
        basketList.appendChild(item);
        const btnMinus = item.children[1].children[3].children[0].children[0];
        const btnPlus = item.children[1].children[3].children[0].children[2];
        const btnDel = item.children[0];

        btnDel.addEventListener('click', () => {
          deleteItemFromBasket(Number(item.id), [...uniqueItemsInBasket]);
          console.log(uniqueItemsInBasket);
          this.createBasketList(basketList, pageNum, itemsPerPage, countPage);
          /* if (uniqueItemsInBasket.size === 0) {
            const item = this.createElement('Basket is empty', 'li', 'basket-item');
            countPage.innerHTML = ` Page 1 from 1 `;
            basketList.appendChild(item);
          }*/
        });

        btnMinus.addEventListener('click', () => {
          if (item.children[1].children[3].children[0].children[1].innerHTML === '1') {
            deleteItemFromBasket(Number(item.id), [...uniqueItemsInBasket]);
            this.createBasketList(basketList, pageNum, itemsPerPage, countPage);
          } else {
            changeQuantity(item, 'down');
          }
        });

        btnPlus.addEventListener('click', () => {
          changeQuantity(item, 'up');
        });
      }
    }
    return basketList;
  }

  render() {
    this.params = transformToURLParams();
    const title = this.createTitle(BasketPage.TextObject.MainTitle);
    title.classList.add('main__title');
    this.container.append(title);
    const flexContainer1 = this.createElement('', 'div', 'flex-container');
    flexContainer1.classList.add('flex-container-space');
    const itemsPerPage = this.createElement('Item per page: ', 'input', 'items-per-page') as HTMLInputElement;
    itemsPerPage.setAttribute('value', '3');
    itemsPerPage.setAttribute('min', '1');
    if (this.params.limit && Number(this.params.limit)) {
      itemsPerPage.value = this.params.limit;
    }
    itemsPerPage.setAttribute('type', 'number');
    itemsPerPage.addEventListener('input', () => {
      this.params.limit = itemsPerPage.value;
      syncURL(this.params);
      this.createBasketList(basketList, pageNum, itemsPerPage, countPage);
    });
    let pageNum = 1;

    if (Number(this.params.page)) {
      pageNum = Number(this.params.page);
    }
    const pageCount = Math.ceil(uniqueItemsInBasket.size / Number((itemsPerPage as HTMLInputElement).value));
    const flexContainer3 = this.createElement('', 'div', 'flex-container');
    const arrowMinus = this.createElement(`<`, 'span', 'square');
    arrowMinus.addEventListener('click', () => {
      if (pageNum > 1) {
        pageNum--;
        this.params.page = pageNum.toString();
        syncURL(this.params);
        this.createBasketList(basketList, pageNum, itemsPerPage, countPage);
      }
    });
    const countPage = this.createElement(` Page ${pageNum} from ${pageCount} `, 'p', 'p');
    const arrowPlus = this.createElement(`>`, 'span', 'square');
    arrowPlus.addEventListener('click', () => {
      if (pageNum < Math.ceil(uniqueItemsInBasket.size / Number((itemsPerPage as HTMLInputElement).value))) {
        pageNum++;
        this.params.page = pageNum.toString();
        syncURL(this.params);
        this.createBasketList(basketList, pageNum, itemsPerPage, countPage);
      }
    });
    const itemPerPageText = this.createElement('Item per page: ', 'p', 'p');
    itemPerPageText.appendChild(itemsPerPage);
    flexContainer3.appendChild(arrowMinus);
    flexContainer3.appendChild(countPage);
    flexContainer3.appendChild(arrowPlus);
    flexContainer1.appendChild(flexContainer3);
    flexContainer1.appendChild(itemPerPageText);
    this.container.append(flexContainer1);
    /*const countItem = 1;*/

    let basketList = this.createElement('', 'ul', 'basket-list');
    if (uniqueItemsInBasket.size === 0) {
      const item = this.createElement('Basket is empty', 'li', 'basket-item');
      countPage.innerHTML = ` Page 1 from 1 `;
      basketList.appendChild(item);
    }
    /*for (let i = (pageNum - 1) * Number((itemsPerPage as HTMLInputElement).value); i < itemsInBasket.length; i++) {
      if (!itemsInBasket.slice(0, i).includes(itemsInBasket[i])) {
        const item = this.createBasketItem(i);
        basketList.appendChild(item);
        countItem++;
        const btnMinus = item.children[1].children[3].children[0].children[0];
        const btnPlus = item.children[1].children[3].children[0].children[2];
        const btnDel = item.children[0];

        btnMinus.addEventListener('click', () => {
          const count = item.children[1].children[3].children[0].children[1].innerHTML;
          const id = Number(item.id);
          console.log(i);
          const price = productsList.products[id - 1].price;
          if (count !== '1') {
            item.children[1].children[3].children[0].children[1].innerHTML = (Number(count) - 1).toString();
            item.children[1].children[3].children[0].children[3].children[0].innerHTML = `${
              Number(item.children[1].children[3].children[0].children[1].innerHTML) * price
            } $`;
            console.log(itemsInBasket);
            // const numEl = itemsInBasket.indexOf(+id);
            changeBasket(id, false);
            console.log(itemsInBasket);
          } else {
            deleteItemFromBasket(Number(item.id), [...uniqueItemsInBasket]);
            this.createBasketList(basketList, pageNum, itemsPerPage, countPage);
          }
        });

        btnPlus.addEventListener('click', () => {
          const count = item.children[1].children[3].children[0].children[1].innerHTML;
          const id = Number(item.id);
          const price = productsList.products[id - 1].price;
          if (Number(count) <= productsList.products[id - 1].stock) {
            item.children[1].children[3].children[0].children[1].innerHTML = (Number(count) + 1).toString();
            item.children[1].children[3].children[0].children[3].children[0].innerHTML = `${
              Number(item.children[1].children[3].children[0].children[1].innerHTML) * price
            } $`;
            console.log(itemsInBasket);
            // const numEl = itemsInBasket.indexOf(+id);
            changeBasket(id, true);
            console.log(itemsInBasket);
          }
        });

        btnDel.addEventListener('click', () => {
          deleteItemFromBasket(Number(item.id), [...uniqueItemsInBasket]);
          console.log(uniqueItemsInBasket);
          this.createBasketList(basketList, pageNum, itemsPerPage, countPage);
        });
      }
      if (countItem === Number((itemsPerPage as HTMLInputElement).value)) {
        i = itemsInBasket.length;
      }
    }*/
    basketList = this.createBasketList(basketList, pageNum, itemsPerPage, countPage);

    this.container.append(basketList);

    const promocode = this.createElement('', 'input', 'promocode');
    promocode.setAttribute('placeholder', 'promocode');
    promocode.setAttribute('type', 'text');
    this.container.append(promocode);
    const promoContainer = this.createElement('', 'div', 'flex-container');
    this.container.append(promoContainer);
    const promoText = this.createElement('Try promo10, promo8, promo5', 'p', 'promotext');
    this.container.append(promoText);
    let promoDiscount = 0;
    const flexContainer2 = this.createElement('', 'div', 'flex-container');
    flexContainer2.classList.add('page-end');
    const buttonCheckout = this.createElement('Proceed to checkout', 'button', 'button');
    const buttonContinue = this.createElement('Continue shopping', 'button', 'button');
    buttonContinue.addEventListener('click', () => {
      this.changeRoute('');
    });
    buttonContinue.classList.add('button-anti');
    buttonContinue.addEventListener('click', () => {
      history.pushState({}, '', `/`);
      App.renderNewPage('');
    });
    flexContainer2.appendChild(buttonCheckout);
    flexContainer2.appendChild(buttonContinue);
    buttonCheckout.addEventListener('click', () => {
      const modal = createModalWindow();
      const header = document.querySelector('.header');
      header?.appendChild(modal);
      modal.addEventListener('click', (e: Event) => {
        if (e.target == modal && modal.children[0] !== e.target) {
          header?.removeChild(modal);
        }
      });
    });

    const discount = this.createElement('Discount: 0', 'p', 'discount');
    const quantity = this.createElement(`Total  ${itemsInBasket.length} items`, 'p', 'discount');
    const totalWithoutDiscont = this.createElement(
      `Total price: ${sumItemInBasket.innerHTML}`,
      'p',
      'basket-item__price'
    );
    totalWithoutDiscont.classList.add('no-visible');
    const total = this.createElement(`Total price: ${sumItemInBasket.innerHTML}`, 'p', 'total');
    document.addEventListener('click', () => {
      if (promoDiscount === 0) {
        total.innerHTML = `Total price: ${sumItemInBasket.innerHTML}`;
      } else {
        totalWithoutDiscont.innerHTML = `Total price: ${sumItemInBasket.innerHTML}`;
        total.innerHTML = `Total price: ${Math.ceil(
          (Number(sumItemInBasket.innerHTML.split(' ')[0]) * (100 - Number(promoDiscount))) / 100
        ).toString()} $`;
        discount.innerHTML = `Discount: ${
          Number(sumItemInBasket.innerHTML.split(' ')[0]) -
          Math.ceil((Number(sumItemInBasket.innerHTML.split(' ')[0]) * (100 - promoDiscount)) / 100)
        } $`;
      }
    });

    promocode.addEventListener('input', () => {
      let d = 0;
      if (discountArr.length < 2) {
        if ((promocode as HTMLInputElement).value === 'promo10') {
          d = Number(Promo.promo10);
        } else if ((promocode as HTMLInputElement).value === 'promo8') {
          d = Number(Promo.promo8);
        } else if ((promocode as HTMLInputElement).value === 'promo5') {
          d = Number(Promo.promo5);
        }
        promoDiscount = discountArr.reduce((sum: number, cur: number) => sum + cur, 0);
        if (d !== 0) {
          promoText.innerHTML = `promo${d}, discount ${d}%`;
          const promoBtnAdd = this.createElement(`add`, 'button', 'button-small');
          promoText.appendChild(promoBtnAdd);
          promoBtnAdd.addEventListener('click', () => {
            discountArr.push(d);
            promoDiscount = discountArr.reduce((sum: number, cur: number) => sum + cur, 0);
            totalWithoutDiscont.classList.remove('no-visible');
            totalWithoutDiscont.innerHTML = `Total price: ${sumItemInBasket.innerHTML}`;
            total.innerHTML = `Total price: ${Math.ceil(
              (Number(sumItemInBasket.innerHTML.split(' ')[0]) * (100 - promoDiscount)) / 100
            ).toString()} $`;
            discount.innerHTML = `Discount: ${
              Number(sumItemInBasket.innerHTML.split(' ')[0]) -
              Math.ceil((Number(sumItemInBasket.innerHTML.split(' ')[0]) * (100 - promoDiscount)) / 100)
            } $`;
            const promoItem = this.createElement(`promo${d} is used, discount ${d}%`, 'p', 'promoitem');
            promoContainer.appendChild(promoItem);
            const promoBtn = this.createElement(`del`, 'button', 'button-small');
            promoItem.appendChild(promoBtn);
            promoBtn.addEventListener('click', () => {
              promoContainer.removeChild(promoItem);
              discountArr.splice(discountArr.indexOf(d), 1);
              if (discountArr.length === 0) {
                totalWithoutDiscont.classList.add('no-visible');
              }
              promoDiscount = discountArr.reduce((sum: number, cur: number) => sum + cur, 0);
              total.innerHTML = `Total price: ${Math.ceil(
                (Number(sumItemInBasket.innerHTML.split(' ')[0]) * (100 - promoDiscount)) / 100
              ).toString()} $`;
              discount.innerHTML = `Discount: ${
                Number(sumItemInBasket.innerHTML.split(' ')[0]) -
                Math.ceil((Number(sumItemInBasket.innerHTML.split(' ')[0]) * (100 - promoDiscount)) / 100)
              } $`;
            });
            promoText.innerHTML = `Try promo10, promo8, promo5`;
          });
        }
      } else {
        promoText.innerHTML = `You can use only 2 promocode`;
      }
    });

    this.container.append(quantity);
    this.container.append(discount);

    this.container.append(totalWithoutDiscont);
    this.container.append(total);
    this.container.append(flexContainer2);

    return this.container;
  }
}

export default BasketPage;
