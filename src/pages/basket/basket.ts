import Page from '../../core/templates/page';
import productsList from '../../core/templates/product';
import {itemsInBasket, sumItemInBasket, countItemInBasket, uniqueItemsInBasket} from '../../pages/app/app';
import {createUniqueItemsInBasket} from '../../core/templates/function';



class BasketPage extends Page {
  static TextObject = {
    MainTitle: 'Basket Page',
  };

  constructor(id: string) {
    super(id);
  }

  createBasketItem (n:number) {
    const item=this.createElement('', 'li', 'basket-item');
    const buttonDel=this.createElement('Delete X', 'p', 'basket-item__del');
    const itemContainer=this.createElement('', 'div', 'flex-container');
   itemContainer.classList.add('flex-container-space');
    const itemImg=this.createElement('', 'img', 'basket-item__img');
    itemImg.setAttribute('src',`${productsList.products[itemsInBasket[n]-1].thumbnail}`);
    itemImg.setAttribute('alt', 'photo');

    const flexContainerName=this.createElement('', 'div', 'flex-container');
    flexContainerName.classList.add('flex-container-colomn');
    const titleItem=this.createElement(`${productsList.products[itemsInBasket[n]-1].title}`, 'h2', 'basket-item__title');
    const categoryItem=this.createElement(`${productsList.products[itemsInBasket[n]-1].category}`, 'p', 'basket-item__catagory');
    flexContainerName.appendChild(titleItem);
    flexContainerName.appendChild(categoryItem);
    let count=itemsInBasket.filter(el=>el===itemsInBasket[n]).length;

    const flexContainerPrice=this.createElement('', 'div', 'flex-container');
    flexContainerPrice.classList.add('flex-container-colomn');
    const flexContainerCount=this.createElement('', 'div', 'flex-container');
    flexContainerCount.classList.add('flex-container-space');

    const buttonPlus=this.createElement(`+`, 'span', 'square');
    const countItem=this.createElement(`${count}`, 'p', 'basket-item__count');
    const buttonMinus=this.createElement(`-`, 'span', 'square');
    flexContainerCount.appendChild(buttonPlus);
    flexContainerCount.appendChild(countItem);
    flexContainerCount.appendChild(buttonMinus);

    const flexContainerTotal=this.createElement('', 'div', 'flex-container');
    flexContainerTotal.classList.add('flex-container-colomn');

    const priceTotal=this.createElement(`${productsList.products[itemsInBasket[n]-1].price* Number(countItem.innerHTML)} $`, 'p', 'basket-item__total');
    flexContainerTotal.appendChild(priceTotal);
    flexContainerCount.appendChild(flexContainerTotal);

    const categoryStock=this.createElement(`Stock: ${productsList.products[itemsInBasket[n]-1].stock}`, 'p', 'basket-item__stock');
    flexContainerPrice.appendChild(flexContainerCount);
    flexContainerPrice.appendChild(categoryStock);

    itemContainer.appendChild(itemImg);
    itemContainer.appendChild(flexContainerName);
    itemContainer.appendChild(flexContainerPrice);

    item.appendChild(buttonDel);
    item.appendChild(itemContainer);

    return item
  }

  render() {

    console.log(uniqueItemsInBasket);
    const title = this.createPage(BasketPage.TextObject.MainTitle);
    this.container.append(title);
    const flexContainer1=this.createElement('', 'div', 'flex-container');
    flexContainer1.classList.add('flex-container-space');
    const itemsPerPage=this.createElement('Item per page: ', 'input', 'items-per-page');
    itemsPerPage.setAttribute('value', '3');
    itemsPerPage.setAttribute('type', 'number');
    let pageNum=1;
    let pageCount=Math.ceil(uniqueItemsInBasket.size/Number(itemsPerPage.value));
    const flexContainer3=this.createElement('', 'div', 'flex-container');
    const arrowPlus=this.createElement(`<`, 'span', 'square');
    const countPage=this.createElement(` Page ${pageNum} from ${pageCount} `, 'p', 'p');
    const arrowMinus=this.createElement(`>`, 'span', 'square');
    const itemPerPageText=this.createElement('Item per page: ', 'p', 'p');
    itemPerPageText.appendChild(itemsPerPage);
    flexContainer3.appendChild(arrowPlus);
    flexContainer3.appendChild(countPage);
    flexContainer3.appendChild(arrowMinus);
    flexContainer1.appendChild(flexContainer3);
    flexContainer1.appendChild(itemPerPageText);
    this.container.append(flexContainer1);
    let countItem=0;

    const basketList=this.createElement('', 'ul', 'basket-list');
    for (let i=(pageNum-1)*itemsPerPage.value; i<itemsInBasket.length; i++) {
      if (!itemsInBasket.slice(0, i).includes(itemsInBasket[i])){
        const item = this.createBasketItem(i);
        basketList.appendChild(item);
        countItem++;
      }
      if (countItem===Number(itemsPerPage.value)){
        i=itemsInBasket.length;
      }
    }
    this.container.append(basketList);

    const promocode=this.createElement('', 'input', 'promocode');
    promocode.setAttribute('placeholder', 'promocode');
    promocode.setAttribute('type', 'text');
    this.container.append(promocode);

    const flexContainer2=this.createElement('', 'div', 'flex-container');
    const buttonCheckout=this.createElement('Proceed to checkout', 'button', 'button');
    const buttonContinue=this.createElement('Continue shopping', 'button', 'button');
    buttonContinue.classList.add('button-anti');
    flexContainer2.appendChild(buttonCheckout);
    flexContainer2.appendChild(buttonContinue);
    this.container.append(flexContainer2);

    const discount=this.createElement('Discount: 0', 'p', 'discount');
    const total=this.createElement(`Total price: ${sumItemInBasket.innerHTML}`, 'p', 'total');

    this.container.append(discount);
    this.container.append(total);

    return this.container;
  }
}

export default BasketPage;
