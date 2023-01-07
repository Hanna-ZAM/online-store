import './goods.css';
import Page from '../../core/templates/page';
import App from '../app/app';
import productsList from '../../core/templates/product';
import { itemsInBasket, uniqueItemsInBasket } from '../app/app';
import { changeBasket } from '../../core/templates/function';

class GoodsPage extends Page {
  constructor(id: string) {
    super(id);
  }

  getGoodsPage(id: number) {
    // history.pushState({}, '', `/goods/${id}`);
    const goodsContainer = this.createElement('', 'div', 'goods__container');
    const goodsTitleContainer = this.createElement('', 'div', 'goods__container_title');
    this.container.appendChild(goodsContainer);
    goodsContainer.appendChild(goodsTitleContainer);
    const goodsStore = this.createElement('Store', 'span', 'goods__store');
    goodsStore.addEventListener('click', () => {
      history.pushState({}, '', `/main`);
      App.renderNewPage('main');
    });
    const goodsCategory = this.createElement(`${productsList.products[id - 1].category}`, 'span', 'goods__category');
    const goodsBrand = this.createElement(`${productsList.products[id - 1].brand}`, 'span', 'goods__brand');
    const goodsTitle = this.createElement(`${productsList.products[id - 1].title}`, 'span', 'goods__title');
    const hr = this.createElement('', 'hr', 'goods__hr');
    const sing1 = this.createElement('>', 'span', 'sing');
    const sing2 = this.createElement('>', 'span', 'sing');
    const sing3 = this.createElement('>', 'span', 'sing');
    goodsTitleContainer.append(goodsStore, sing1, goodsCategory, sing2, goodsBrand, sing3, goodsTitle);
    goodsContainer.append(hr);

    const goodsMainContainer = this.createElement('', 'div', 'goods__container_main');
    goodsContainer.append(goodsMainContainer);
    const goodsImageWrapper = this.createElement('', 'div', 'goods__image_wrapper');
    const goodsActionWrapper = this.createElement('', 'div', 'goods__action_wrapper');
    goodsMainContainer.appendChild(goodsImageWrapper);
    goodsMainContainer.appendChild(goodsActionWrapper);
    const goodsImageMain = this.createElement('', 'img', 'goods__image_main');
    goodsImageMain.setAttribute('src', `${productsList.products[id - 1].images[0]}`);
    goodsImageMain.setAttribute('alt', `${productsList.products[id - 1].title}`);
    goodsImageWrapper.append(goodsImageMain);
    for (let i = 0; i < productsList.products[id - 1].images.length; i += 1) {
      const goodsImage = this.createElement('', 'img', 'goods__image');
      goodsImage.setAttribute('src', `${productsList.products[id - 1].images[i]}`);
      goodsImage.setAttribute('alt', `${productsList.products[id - 1].title}`);
      goodsImageWrapper.append(goodsImage);
      goodsImage.addEventListener('click', () => {
        goodsImageMain.setAttribute('src', `${productsList.products[id - 1].images[i]}`);
        goodsImageMain.setAttribute('alt', `${productsList.products[id - 1].title}`);
      });
    }
    const ActionTitle = this.createElement(`${productsList.products[id - 1].title}`, 'div', 'action__title');
    const ActionDescription = this.createElement(
      `${productsList.products[id - 1].description}`,
      'p',
      'action__description'
    );
    const ActionDiscount = this.createElement(
      `Discount Percentage: ${productsList.products[id - 1].discountPercentage}`,
      'div',
      'action__description'
    );
    const ActionRating = this.createElement(
      `Rating: ${productsList.products[id - 1].rating}`,
      'div',
      'action__description'
    );
    const ActionStock = this.createElement(
      `Stock: ${productsList.products[id - 1].stock}`,
      'div',
      'action__description'
    );
    const ActionBrand = this.createElement(
      `Brand: ${productsList.products[id - 1].brand}`,
      'div',
      'action__description'
    );
    const ActionCategory = this.createElement(
      `Category: ${productsList.products[id - 1].category}`,
      'div',
      'action__description'
    );
    const ActionPrice = this.createElement(`Price: ${productsList.products[id - 1].price} $`, 'div', 'action__price');
    goodsActionWrapper.append(
      ActionTitle,
      ActionDescription,
      ActionDiscount,
      ActionRating,
      ActionStock,
      ActionBrand,
      ActionCategory,
      ActionPrice
    );

    const goodsBtnWrapper = this.createElement('', 'div', 'goods__btn_wrapper');
    const goodsBtnAdd = this.createElement('add to cart', 'button', 'goods__btn_add');
    const goodsBtnBuy = this.createElement('buy now', 'button', 'goods__btn_buy');
    goodsActionWrapper.appendChild(goodsBtnWrapper);
    goodsBtnWrapper.append(goodsBtnBuy, goodsBtnAdd);
    goodsBtnAdd.addEventListener('click', () => {
      if (!goodsBtnAdd.classList.contains('added_in_cart')) {
        goodsBtnAdd.classList.add('added_in_cart');
        goodsBtnAdd.innerText = 'drop from cart';

        changeBasket(id);
      } else {
        goodsBtnAdd.classList.remove('added_in_cart');
        goodsBtnAdd.innerText = 'add to cart';
        const indexArr: number[] = [];

        itemsInBasket.forEach((item, index) => {
          if (item === id) {
            indexArr.push(index);
          }
        });
        for (let i = indexArr.length - 1; i >= 0; i -= 1) {
          itemsInBasket.splice(indexArr[i], 1);
        }
        uniqueItemsInBasket.delete(id);
        changeBasket(id, false);
      }
    });
    goodsBtnBuy.addEventListener('click', () => {});

    if (itemsInBasket.includes(id)) {
      goodsBtnAdd.classList.add('added_in_cart');
      goodsBtnAdd.innerText = 'drop from cart';
    } else {
      goodsBtnAdd.classList.remove('added_in_cart');
      goodsBtnAdd.innerText = 'add to cart';
    }
  }

  render() {
    const url = window.location.pathname.split('/').filter(Boolean)[1];
    this.getGoodsPage(+url);

    return this.container;
  }
}

export default GoodsPage;
