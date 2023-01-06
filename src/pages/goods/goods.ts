import './goods.css';
import Page from '../../core/templates/page';
import App from '../app/app';
import productsList from '../../core/templates/product';

class GoodsPage extends Page {
  constructor(id: string) {
    super(id);
  }

  getGoodsPage(id: number) {
    // history.pushState({}, '', `/goods/${id}`);
    const goodsTitleContainer = this.createElement('', 'div', 'goods__container_title');
    this.container.appendChild(goodsTitleContainer);
    const goodsStore = this.createElement('Store', 'span', 'goods__store');
    goodsStore.addEventListener('click', () => {
      history.pushState({}, '', `/main`);
      App.renderNewPage('main');
    });
    const goodsCategory = this.createElement(`${productsList.products[id].category}`, 'span', 'goods__category');
    const goodsBrand = this.createElement(`${productsList.products[id].brand}`, 'span', 'goods__brand');
    const goodsTitle = this.createElement(`${productsList.products[id].title}`, 'span', 'goods__title');
    const sing1 = this.createElement('>', 'span', 'sing');
    const sing2 = this.createElement('>', 'span', 'sing');
    const sing3 = this.createElement('>', 'span', 'sing');
    goodsTitleContainer.append(goodsStore, sing1, goodsCategory, sing2, goodsBrand, sing3, goodsTitle);

    const goodsMainContainer = this.createElement('', 'div', 'goods__container_main');
    this.container.append(goodsMainContainer);
    const goodsImageWrapper = this.createElement('', 'div', 'goods__image_wrapper');
    const goodsActionWrapper = this.createElement('', 'div', 'goods__action_wrapper');
    goodsMainContainer.appendChild(goodsImageWrapper);
    goodsMainContainer.appendChild(goodsActionWrapper);
    for (let i = 0; i < productsList.products[id].images.length; i += 1) {
      const goodsImage = this.createElement('', 'img', 'goods__image');
      goodsImage.setAttribute('src', `${productsList.products[id].images[i]}`);
      goodsImage.setAttribute('alt', `${productsList.products[id].title}`);
      goodsImageWrapper.append(goodsImage);
    }
    const ActionTitle = this.createElement(`${productsList.products[id].title}`, 'div', 'action__title');
    const ActionDescription = this.createElement(
      `${productsList.products[id].description}`,
      'p',
      'action__description'
    );
    const ActionDiscount = this.createElement(
      `${productsList.products[id].discountPercentage}`,
      'div',
      'action__price'
    );
    const ActionRating = this.createElement(`${productsList.products[id].rating}`, 'div', 'action__price');
    const ActionStock = this.createElement(`${productsList.products[id].stock}`, 'div', 'action__price');
    const ActionBrand = this.createElement(`${productsList.products[id].brand}`, 'div', 'action__price');
    const ActionCategory = this.createElement(`${productsList.products[id].category}`, 'div', 'action__price');
    const ActionPrice = this.createElement(`${productsList.products[id].price} $`, 'div', 'action__price');
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
  }

  render() {
    this.getGoodsPage(1);

    return this.container;
  }
}

export default GoodsPage;
