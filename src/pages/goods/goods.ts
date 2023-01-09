import './goods.css';
import Page from '../../core/templates/page';
import App from '../app/app';
import productsList from '../../core/templates/product';
import { itemsInBasket, uniqueItemsInBasket } from '../app/app';
import { changeBasket } from '../../core/templates/function';
import { createModalWindow } from '../../core/templates/modal';

class GoodsPage extends Page {
  constructor(id: string) {
    super(id);
  }

  getGoodsPage(item: string) {
    const id = +item;
    const arrId = productsList.products.map((item) => item.id);
    if (arrId.includes(id)) {
      const goodsContainer = this.createElement('', 'div', 'goods__container');
      const goodsTitleContainer = this.createElement('', 'div', 'goods__container_title');
      this.container.appendChild(goodsContainer);
      goodsContainer.appendChild(goodsTitleContainer);
      const goodsStore = this.createElement('Store  >', 'span', 'goods__store');
      goodsStore.addEventListener('click', () => {
        history.pushState({}, '', `/`);
        App.renderNewPage('');
      });
      const goodsCategory = this.createElement(
        `${productsList.products[id - 1].category}  >`,
        'span',
        'goods__category'
      );
      const goodsBrand = this.createElement(`${productsList.products[id - 1].brand}  >`, 'span', 'goods__brand');
      const goodsTitle = this.createElement(`${productsList.products[id - 1].title}`, 'span', 'goods__title');
      const hr = this.createElement('', 'hr', 'goods__hr');
      goodsTitleContainer.append(goodsStore, goodsCategory, goodsBrand, goodsTitle);
      goodsContainer.append(hr);

      const goodsMainContainer = this.createElement('', 'div', 'goods__container_main');
      goodsContainer.append(goodsMainContainer);
      const goodsImageWrapper = this.createElement('', 'div', 'goods__image_wrapper');
      const goodsActionWrapper = this.createElement('', 'div', 'goods__action_wrapper');
      goodsMainContainer.appendChild(goodsImageWrapper);
      goodsMainContainer.appendChild(goodsActionWrapper);
      const goodsImageMain = this.createElement('', 'img', 'goods__image_main');

      const dataSize: string[] = [];
      const index: number[] = [];
      for (let i = 0; i < productsList.products[id - 1].images.length; i += 1) {
        const url = productsList.products[id - 1].images[i];
        const req = new XMLHttpRequest();
        req.open('GET', url, false);
        req.send();
        const weight = req.getResponseHeader('content-length') || '';
        if (!dataSize.includes(weight)) {
          dataSize.push(weight);
          index.push(i);
        }
      }

      goodsImageMain.setAttribute('src', `${productsList.products[id - 1].images[0]}`);
      goodsImageMain.setAttribute('alt', `${productsList.products[id - 1].title}`);
      goodsImageWrapper.append(goodsImageMain);
      const goodsImageWrapperSmall = this.createElement('', 'div', 'goods__image_wrapper-small');
      goodsImageWrapper.appendChild(goodsImageWrapperSmall);
      for (let i = 0; i < productsList.products[id - 1].images.length; i += 1) {
        if (index.includes(i)) {
          const goodsImage = this.createElement('', 'img', 'goods__image');
          goodsImage.setAttribute('src', `${productsList.products[id - 1].images[i]}`);
          goodsImage.setAttribute('alt', `${productsList.products[id - 1].title}`);
          goodsImageWrapperSmall.append(goodsImage);
          goodsImage.addEventListener('click', () => {
            goodsImageMain.setAttribute('src', `${productsList.products[id - 1].images[i]}`);
            goodsImageMain.setAttribute('alt', `${productsList.products[id - 1].title}`);
          });
        }
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
      goodsBtnBuy.addEventListener('click', () => {
        if (!itemsInBasket.includes(id)) {
          changeBasket(id);
        }
        history.pushState({}, '', '/cart');
        const modal = createModalWindow();
        const header = document.querySelector('.header');
        header?.appendChild(modal);
        modal.addEventListener('click', (e: Event) => {
          if (e.target == modal && modal.children[0] !== e.target) {
            header?.removeChild(modal);
          }
        });
        App.renderNewPage('cart');
      });

      if (itemsInBasket.includes(id)) {
        goodsBtnAdd.classList.add('added_in_cart');
        goodsBtnAdd.innerText = 'drop from cart';
      } else {
        goodsBtnAdd.classList.remove('added_in_cart');
        goodsBtnAdd.innerText = 'add to cart';
      }
    } else {
      const title = this.createElement(`Product number ${item} not found`, 'div', 'goods__not_found');
      this.container.appendChild(title);
    }
  }

  render() {
    const url = window.location.pathname.split('/').filter(Boolean)[1];
    console.log('goods page: ' + url);

    this.getGoodsPage(url);

    return this.container;
  }
}

export default GoodsPage;
