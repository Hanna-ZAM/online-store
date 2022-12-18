import Page from '../../core/templates/page';
import productsList from '../../core/templates/product';
import {itemsInBasket} from '../../pages/app/app';

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

    const itemImg=this.createElement('', 'img', 'basket-item__img');
    /*itemImg.setAttribute('src', `${productsList.products[itemsInBasket[n]-1].thumbnail}`);*/
    /*console.log(productsList);*/
    itemImg.setAttribute('alt', 'photo');

    /*const flexContainerName=this.createElement('', 'div', 'flex-container');
    flexContainerName.classList.add('flex-container-colomn');
    const titleItem=this.createElement(`${productsList.products[itemsInBasket[n]-1].title}`, 'h2', 'basket-item__title');
    const categoryItem=this.createElement(`${productsList.products[itemsInBasket[n]-1].category}`, 'p', 'basket-item__catagory');
    flexContainerName.appendChild(titleItem);
    flexContainerName.appendChild(categoryItem);

    const flexContainerPrice=this.createElement('', 'div', 'flex-container');
    flexContainerPrice.classList.add('flex-container-colomn');
    const flexContainerCount=this.createElement('', 'div', 'flex-container');
    flexContainerCount.classList.add('flex-container-space');

    const buttonPlus=this.createElement(`+`, 'span', 'square');
    const countItem=this.createElement('1', 'p', 'basket-item__count');
    const buttonMinus=this.createElement(`-`, 'span', 'square');
    flexContainerCount.appendChild(buttonPlus);
    flexContainerCount.appendChild(countItem);
    flexContainerCount.appendChild(buttonMinus);

    const categoryStock=this.createElement(`Stock: ${productsList.products[itemsInBasket[n]-1].stock}`, 'p', 'basket-item__stock');
    flexContainerPrice.appendChild(flexContainerCount);
    flexContainerPrice.appendChild(categoryStock);*/

    itemContainer.appendChild(itemImg);
   /*itemContainer.appendChild(flexContainerName);
    itemContainer.appendChild(flexContainerPrice);*/

    item.appendChild(buttonDel);
    item.appendChild(itemContainer);

    return item
  }

  render() {
    const title = this.createPage(BasketPage.TextObject.MainTitle);
    this.container.append(title);
    const flexContainer1=this.createElement('', 'div', 'flex-container');
    flexContainer1.classList.add('flex-container-space');
    const countPage=this.createElement('Page 1 from 2', 'p', 'p');
    const itemPerPageText=this.createElement('Item per page: ', 'p', 'p');
    const itemsPerPage=this.createElement('Item per page: ', 'input', 'items-per-page');
    itemsPerPage.setAttribute('value', '3');
    itemsPerPage.setAttribute('type', 'number');
    itemPerPageText.appendChild(itemsPerPage);
    flexContainer1.appendChild(countPage);
    flexContainer1.appendChild(itemPerPageText);
    this.container.append(flexContainer1);

    const basketList=this.createElement('', 'ul', 'basket-list');
    for (let i=0; i<itemsInBasket.length; i++) {
      const item = this.createBasketItem(i);
      basketList.appendChild(item);
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

    return this.container;
  }
}

export default BasketPage;
