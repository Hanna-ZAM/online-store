import Page from '../../core/templates/page';
import productsList from '../../core/templates/product';
import { itemsInBasket, sumItemInBasket, uniqueItemsInBasket } from '../../pages/app/app';

import { changeBasket, changeQuantity, deleteItemFromBasket } from '../../core/templates/function';

export const enum Promo {
  promo5 = '5',
  promo10 = '10',
  promo8 = '8',
}
const discountArr: Array<number> = [];
class BasketPage extends Page {
  static TextObject = {
    MainTitle: 'Basket',
  };

  constructor(id: string) {
    super(id);
  }

  createBasketItem(n: number): HTMLElement {
    const item = this.createElement('', 'li', 'basket-item');
    item.setAttribute('id', `${[...uniqueItemsInBasket][n]}`);
    const buttonDel = this.createElement('Delete X', 'p', 'basket-item__del');

    const itemContainer = this.createElement('', 'div', 'flex-container');
    itemContainer.classList.add('flex-container-space');
    const itemNumber = this.createElement(`${n + 1}`, 'p', 'basket-item__count');
    const itemImg = this.createElement('', 'img', 'basket-item__img');
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

    const pageCount = Math.ceil(uniqueItemsInBasket.size / Number((itemsPerPage as HTMLInputElement).value));
    if (pageNum > pageCount) {
      pageNum = pageCount;
    }
    const start = (pageNum - 1) * Number((itemsPerPage as HTMLInputElement).value);
    if (uniqueItemsInBasket.size === 0) {
      const item = this.createElement('Basket is empty', 'li', 'basket-item');
      basketList.appendChild(item);
    }

    let end = start + Number((itemsPerPage as HTMLInputElement).value);
    if (end > uniqueItemsInBasket.size) {
      end = uniqueItemsInBasket.size;
    }
    countPage.innerHTML = ` Page ${pageNum} from ${pageCount} `;

    for (let i = start; i < end; i++) {
      const item = this.createBasketItem(i);
      basketList.appendChild(item);
      const btnMinus = item.children[1].children[3].children[0].children[0];
      const btnPlus = item.children[1].children[3].children[0].children[2];
      const btnDel = item.children[0];
      console.log(btnDel);
      btnDel.addEventListener('click', (e) => {
        console.log(btnDel);
        uniqueItemsInBasket = deleteItemFromBasket(Number(item.id), [...uniqueItemsInBasket]);
        console.log(uniqueItemsInBasket);
        this.createBasketList(basketList, pageNum, itemsPerPage, countPage);
      });

      btnMinus.addEventListener('click', (e) => {
        if (item.children[1].children[3].children[0].children[1].innerHTML === '1') {
          console.log('deee' + item.id);
          uniqueItemsInBasket = deleteItemFromBasket(Number(item.id), [...uniqueItemsInBasket]);
          this.createBasketList(basketList, pageNum, itemsPerPage, countPage);
        } else {
          changeQuantity(item, 'down');
        }
      });

      btnPlus.addEventListener('click', (e) => {
        changeQuantity(item, 'up');
      });
    }
    return basketList;
  }

  render() {
    const title = this.createTitle(BasketPage.TextObject.MainTitle);
    title.classList.add('main__title');
    this.container.append(title);
    const flexContainer1 = this.createElement('', 'div', 'flex-container');
    flexContainer1.classList.add('flex-container-space');
    const itemsPerPage = this.createElement('Item per page: ', 'input', 'items-per-page');
    itemsPerPage.setAttribute('value', '3');
    itemsPerPage.setAttribute('type', 'number');
    itemsPerPage.addEventListener('input', (e) => {
      this.createBasketList(basketList, pageNum, itemsPerPage, countPage);
    });
    let pageNum = 1;
    const pageCount = Math.ceil(uniqueItemsInBasket.size / Number((itemsPerPage as HTMLInputElement).value));
    const flexContainer3 = this.createElement('', 'div', 'flex-container');
    const arrowMinus = this.createElement(`<`, 'span', 'square');
    arrowMinus.addEventListener('click', (e) => {
      if (pageNum > 1) {
        pageNum--;
        this.createBasketList(basketList, pageNum, itemsPerPage, countPage);
      }
    });
    const countPage = this.createElement(` Page ${pageNum} from ${pageCount} `, 'p', 'p');
    const arrowPlus = this.createElement(`>`, 'span', 'square');
    arrowPlus.addEventListener('click', (e) => {
      if (pageNum < Math.ceil(uniqueItemsInBasket.size / Number((itemsPerPage as HTMLInputElement).value))) {
        pageNum++;
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
    let countItem = 0;

    const basketList = this.createElement('', 'ul', 'basket-list');

    for (let i = (pageNum - 1) * Number((itemsPerPage as HTMLInputElement).value); i < itemsInBasket.length; i++) {
      if (!itemsInBasket.slice(0, i).includes(itemsInBasket[i])) {
        const item = this.createBasketItem(i);
        basketList.appendChild(item);
        countItem++;
        const btnMinus = item.children[1].children[3].children[0].children[0];
        const btnPlus = item.children[1].children[3].children[0].children[2];
        const btnDel = item.children[0];

        btnMinus.addEventListener('click', (e) => {
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
            const numEl = itemsInBasket.indexOf(+id);
            changeBasket(id, false);
            console.log(itemsInBasket);
          } else {
            uniqueItemsInBasket = deleteItemFromBasket(Number(item.id), [...uniqueItemsInBasket]);
            this.createBasketList(basketList, pageNum, itemsPerPage, countPage);
          }
        });

        btnPlus.addEventListener('click', (e) => {
          const count = item.children[1].children[3].children[0].children[1].innerHTML;
          const id = Number(item.id);
          const price = productsList.products[id - 1].price;
          if (Number(count) <= productsList.products[id - 1].stock) {
            item.children[1].children[3].children[0].children[1].innerHTML = (Number(count) + 1).toString();
            item.children[1].children[3].children[0].children[3].children[0].innerHTML = `${
              Number(item.children[1].children[3].children[0].children[1].innerHTML) * price
            } $`;
            console.log(itemsInBasket);
            const numEl = itemsInBasket.indexOf(+id);
            changeBasket(id, true);
            console.log(itemsInBasket);
          }
        });
        btnDel.addEventListener('click', (e) => {
          console.log(btnDel);
          uniqueItemsInBasket = deleteItemFromBasket(Number(item.id), [...uniqueItemsInBasket]);
          console.log(uniqueItemsInBasket);
          this.createBasketList(basketList, pageNum, itemsPerPage, countPage);
        });
      }
      if (countItem === Number((itemsPerPage as HTMLInputElement).value)) {
        i = itemsInBasket.length;
      }
    }

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
    buttonContinue.classList.add('button-anti');
    flexContainer2.appendChild(buttonCheckout);
    flexContainer2.appendChild(buttonContinue);

    const discount = this.createElement('Discount: 0', 'p', 'discount');
    const quantity = this.createElement(`Total  ${itemsInBasket.length} items`, 'p', 'discount');
    const totalWithoutDiscont = this.createElement(
      `Total price: ${sumItemInBasket!.innerHTML}`,
      'p',
      'basket-item__price'
    );
    totalWithoutDiscont.classList.add('no-visible');
    const total = this.createElement(`Total price: ${sumItemInBasket!.innerHTML}`, 'p', 'total');
    document.addEventListener('click', (e) => {
      if (promoDiscount === 0) {
        total.innerHTML = `Total price: ${sumItemInBasket!.innerHTML}`;
      } else {
        totalWithoutDiscont.innerHTML = `Total price: ${sumItemInBasket!.innerHTML}`;
        total.innerHTML = `Total price: ${Math.ceil(
          (Number(sumItemInBasket!.innerHTML.split(' ')[0]) * (100 - Number(promoDiscount))) / 100
        ).toString()} $`;
        discount.innerHTML=`Discount: ${Number(sumItemInBasket!.innerHTML.split(' ')[0])-Math.ceil(
          (Number(sumItemInBasket!.innerHTML.split(' ')[0]) * (100 - promoDiscount)) / 100
        )} $`;
      }
    });

    promocode.addEventListener('input', (e) => {
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
          promoBtnAdd.addEventListener('click', (e) => {
            discountArr.push(d);
            promoDiscount = discountArr.reduce((sum: number, cur: number) => sum + cur, 0);
            totalWithoutDiscont.classList.remove('no-visible');
            totalWithoutDiscont.innerHTML = `Total price: ${sumItemInBasket!.innerHTML}`;
            total.innerHTML = `Total price: ${Math.ceil(
              (Number(sumItemInBasket!.innerHTML.split(' ')[0]) * (100 - promoDiscount)) / 100
            ).toString()} $`;
            discount.innerHTML=`Discount: ${Number(sumItemInBasket!.innerHTML.split(' ')[0])-Math.ceil(
              (Number(sumItemInBasket!.innerHTML.split(' ')[0]) * (100 - promoDiscount)) / 100
            )} $`;
            const promoItem = this.createElement(`promo${d} is used, discount ${d}%`, 'p', 'promoitem');
            promoContainer.appendChild(promoItem);
            const promoBtn = this.createElement(`del`, 'button', 'button-small');
            promoItem.appendChild(promoBtn);
            promoBtn.addEventListener('click', e=>{
              promoContainer.removeChild(promoItem);
              discountArr.splice(discountArr.indexOf(d), 1);
              if (discountArr.length===0) {
                totalWithoutDiscont.classList.add('no-visible');
              }
              promoDiscount = discountArr.reduce((sum: number, cur: number) => sum + cur, 0);
              total.innerHTML = `Total price: ${Math.ceil(
                (Number(sumItemInBasket!.innerHTML.split(' ')[0]) * (100 - promoDiscount)) / 100
              ).toString()} $`;
              discount.innerHTML=`Discount: ${Number(sumItemInBasket!.innerHTML.split(' ')[0])-Math.ceil(
                (Number(sumItemInBasket!.innerHTML.split(' ')[0]) * (100 - promoDiscount)) / 100
                )} $`;
              })
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
