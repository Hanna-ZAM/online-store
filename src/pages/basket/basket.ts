import Page from '../../core/templates/page';
import productsList from '../../core/templates/product';
import { itemsInBasket, sumItemInBasket, uniqueItemsInBasket } from '../../pages/app/app';
import { changeBasket, changeQuantity } from '../../core/templates/function';

class BasketPage extends Page {
  static TextObject = {
    MainTitle: 'Basket',
  };

  constructor(id: string) {
    super(id);
  }

  createBasketItem(n: number) {
    const item = this.createElement('', 'li', 'basket-item');
    item.setAttribute('id', `${[...uniqueItemsInBasket][n]}`);
    const buttonDel = this.createElement('Delete X', 'p', 'basket-item__del');
    const itemContainer = this.createElement('', 'div', 'flex-container');
    itemContainer.classList.add('flex-container-space');
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

    itemContainer.appendChild(itemImg);
    itemContainer.appendChild(flexContainerName);
    itemContainer.appendChild(flexContainerPrice);

    item.appendChild(buttonDel);
    item.appendChild(itemContainer);

    return item;
  }

  createBasketList(basketList:HTMLElement, pageNum:number, itemsPerPage:HTMLElement, countPage:HTMLElement):HTMLElement{
    let start=(pageNum - 1) * Number((itemsPerPage as HTMLInputElement).value);
    let end= start+Number((itemsPerPage as HTMLInputElement).value);
    if (end>uniqueItemsInBasket.size) {
      end =uniqueItemsInBasket.size;
    }
    let pageCount = Math.ceil(uniqueItemsInBasket.size / Number((itemsPerPage as HTMLInputElement).value));
    countPage.innerHTML=` Page ${pageNum} from ${pageCount} `

    for (let i =start; i < end; i++) {
        const item = this.createBasketItem(i);
        basketList.appendChild(item);
        const btnMinus = item.children[1].children[2].children[0].children[0];
        const btnPlus = item.children[1].children[2].children[0].children[2];

        btnMinus.addEventListener('click', (e) => {
          changeQuantity(item, 'down');
        });

        btnPlus.addEventListener('click', (e) => {
          changeQuantity(item, 'up');
        });
      }
 return basketList
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
    itemsPerPage.addEventListener('input', e=>{
      [...basketList.children].forEach(element => {
        basketList.removeChild(element)
      });
      this.createBasketList(basketList, pageNum, itemsPerPage, countPage)
    })
    const pageNum = 1;
    const pageCount = Math.ceil(uniqueItemsInBasket.size / Number((itemsPerPage as HTMLInputElement).value));
    const flexContainer3 = this.createElement('', 'div', 'flex-container');
    const arrowPlus = this.createElement(`<`, 'span', 'square');
    const countPage = this.createElement(` Page ${pageNum} from ${pageCount} `, 'p', 'p');
    const arrowMinus = this.createElement(`>`, 'span', 'square');
    const itemPerPageText = this.createElement('Item per page: ', 'p', 'p');
    itemPerPageText.appendChild(itemsPerPage);
    flexContainer3.appendChild(arrowPlus);
    flexContainer3.appendChild(countPage);
    flexContainer3.appendChild(arrowMinus);
    flexContainer1.appendChild(flexContainer3);
    flexContainer1.appendChild(itemPerPageText);
    this.container.append(flexContainer1);
    let countItem = 0;

    const basketList = this.createElement('', 'ul', 'basket-list');
    this.createBasketList(basketList, pageNum, itemsPerPage, countPage);
    this.container.append(basketList);

    const promocode = this.createElement('', 'input', 'promocode');
    promocode.setAttribute('placeholder', 'promocode');
    promocode.setAttribute('type', 'text');
    this.container.append(promocode);

    const flexContainer2 = this.createElement('', 'div', 'flex-container');
    flexContainer2.classList.add('page-end');
    const buttonCheckout = this.createElement('Proceed to checkout', 'button', 'button');
    const buttonContinue = this.createElement('Continue shopping', 'button', 'button');
    buttonContinue.classList.add('button-anti');
    flexContainer2.appendChild(buttonCheckout);
    flexContainer2.appendChild(buttonContinue);

    const discount = this.createElement('Discount: 0', 'p', 'discount');
    const total = this.createElement(`Total price: ${sumItemInBasket!.innerHTML}`, 'p', 'total');
    document.addEventListener('click', (e) => {
      total.innerHTML = `Total price: ${sumItemInBasket!.innerHTML}`;
    });

    this.container.append(discount);
    this.container.append(total);
    this.container.append(flexContainer2);

    return this.container;
  }
}

export default BasketPage;
