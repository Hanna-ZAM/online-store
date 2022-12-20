import './main.css';
import Page from '../../core/templates/page';
import productsList from '../../core/templates/product';

class MainPage extends Page {
  static TextObject = {
    MainTitle: 'Catalog',
  };

  constructor(id: string) {
    super(id);
  }

  filterCategory(key: string): string[] {
    const arr: string[] = [];

    if (key === 'category') {
      productsList.products.filter((item) => {
        if (!arr.includes(item.category)) {
          arr.push(item.category);
        }
      });
    } else if (key === 'brand') {
      productsList.products.filter((item) => {
        if (!arr.includes(item.brand)) {
          arr.push(item.brand);
        }
      });
    }

    return arr;
  }

  createCard(i: number) {
    const cardContainer = this.createElement('', 'div', 'card__container');
    const btnOpenCard = this.createElement('', 'button', 'card__open-card_btn');
    const imgCard = this.createElement('', 'img', 'card__image');
    imgCard.setAttribute('src', `${productsList.products[i].thumbnail}`);
    const btnAddBasket = this.createElement('add to cart', 'button', 'card__add-basket_btn');
    const cardName = this.createElement(`${productsList.products[i].title}`, 'div', 'card__name');
    const cardPrice = this.createElement(`${productsList.products[i].price} $`, 'div', 'card__price');

    cardContainer.appendChild(btnOpenCard);
    btnOpenCard.append(imgCard);
    cardContainer.append(btnAddBasket);
    cardContainer.append(cardName);
    cardContainer.append(cardPrice);

    return cardContainer;
  }

  render() {
    const title = this.createTitle(MainPage.TextObject.MainTitle);
    title.classList.add('main__title');
    this.container.append(title);

    const filterMain = this.createElement('', 'div', 'main__filter');
    filterMain.classList.add('filter__container');
    this.container.appendChild(filterMain);

    const filterHeader = this.createElement('', 'div', 'filter__header');
    filterMain.appendChild(filterHeader);

    const filterHeaderTitle = this.createElement('Filter', 'div', 'filter__header_title');
    const filterHeaderAmount = this.createElement(
      `Found: ${productsList.products.length}`,
      'div',
      'filter__header_amount'
    );

    filterHeader.appendChild(filterHeaderTitle);
    filterHeader.appendChild(filterHeaderAmount);

    const filterGroup = this.createElement('', 'div', 'filer__group');
    filterMain.appendChild(filterGroup);

    const filterGroupCategory1 = this.createElement('', 'div', 'filter__group_category');
    filterGroup.appendChild(filterGroupCategory1);

    const filterTitleCategory1 = this.createElement('Select a category', 'h3', 'filter__group_title');
    const filterGroupForm1 = this.createElement('', 'form', 'filter__group_form');

    filterGroupCategory1.appendChild(filterTitleCategory1);
    filterGroupCategory1.appendChild(filterGroupForm1);

    const arrCategory = this.filterCategory('category');

    for (let i = 0; i < arrCategory.length; i += 1) {
      const elementLabel = this.createElement('', 'label', 'checkbox');
      const elementInput = document.createElement('input');

      filterGroupForm1.appendChild(elementLabel);

      elementLabel.appendChild(elementInput);
      elementInput.setAttribute('type', 'checkbox');
      elementInput.id = `${arrCategory[i]}`;
      elementLabel.appendChild(this.createElementId(`${arrCategory[i]}`, 'span', `${arrCategory[i]}`));
    }

    const filterGroupCategory2 = this.createElement('', 'div', 'filter__group_category');
    filterGroup.appendChild(filterGroupCategory2);

    const filterTitleCategory2 = this.createElement('Select a brand', 'h3', 'filter__group_title');
    const filterGroupForm2 = this.createElement('', 'form', 'filter__group_form');

    filterGroupCategory2.appendChild(filterTitleCategory2);
    filterGroupCategory2.appendChild(filterGroupForm2);

    const arrBrand = this.filterCategory('brand');

    for (let i = 0; i < arrBrand.length; i += 1) {
      const elementLabel = this.createElement('', 'label', 'checkbox');
      const elementInput = document.createElement('input');

      filterGroupForm2.appendChild(elementLabel);

      elementLabel.appendChild(elementInput);
      elementInput.setAttribute('type', 'checkbox');
      elementInput.id = `${arrBrand[i]}`;
      elementLabel.appendChild(this.createElementId(`${arrBrand[i]}`, 'span', `${arrBrand[i]}`));
    }

    const filterGroupCategory3 = this.createElement('', 'div', 'filter__group_category');
    filterGroup.appendChild(filterGroupCategory3);

    const filterTitleCategory3 = this.createElement('Choose a criterion', 'h3', 'filter__group_title');
    const filterTitlePrice = this.createElement('Price $', 'h4', 'filterTitlePrice');

    filterGroupCategory3.appendChild(filterTitleCategory3);
    filterGroupCategory3.appendChild(filterTitlePrice);
    const priceControl = this.createElement('', 'div', 'price__control');
    filterGroupCategory3.appendChild(priceControl);
    const inputPriceFrom = this.createElementId('', 'input', 'fromPrice');
    inputPriceFrom.setAttribute('type', 'range');
    inputPriceFrom.setAttribute('value', '0');
    inputPriceFrom.setAttribute('min', '0');
    inputPriceFrom.setAttribute('max', '100');
    const inputPriceTo = this.createElementId('', 'input', 'toPrice');
    inputPriceTo.setAttribute('type', 'range');
    inputPriceTo.setAttribute('value', '100');
    inputPriceTo.setAttribute('min', '0');
    inputPriceTo.setAttribute('max', '100');
    priceControl.appendChild(inputPriceFrom);
    priceControl.appendChild(inputPriceTo);
    const priceControlValue = this.createElement('', 'div', 'price__control_value');
    priceControl.appendChild(priceControlValue);
    const priceControlValueFrom = this.createElement('0', 'div', 'price__control_from-value');
    const priceControlValueTo = this.createElement('100', 'div', 'price__control_to-value');
    priceControlValue.appendChild(priceControlValueFrom);
    priceControlValue.appendChild(priceControlValueTo);

    const filterTitleAmount = this.createElement('Amount', 'h4', 'filterTitleBalance');
    filterGroupCategory3.appendChild(filterTitleAmount);
    const amountControl = this.createElement('', 'div', 'amount__control');
    filterGroupCategory3.appendChild(amountControl);
    const inputAmountFrom = this.createElementId('', 'input', 'fromAmount');
    inputAmountFrom.setAttribute('type', 'range');
    inputAmountFrom.setAttribute('value', '0');
    inputAmountFrom.setAttribute('min', '0');
    inputAmountFrom.setAttribute('max', '100');
    const inputAmountTo = this.createElementId('', 'input', 'toAmount');
    inputAmountTo.setAttribute('type', 'range');
    inputAmountTo.setAttribute('value', '100');
    inputAmountTo.setAttribute('min', '0');
    inputAmountTo.setAttribute('max', '100');
    amountControl.appendChild(inputAmountFrom);
    amountControl.appendChild(inputAmountTo);
    const amountControlValue = this.createElement('', 'div', 'amount__control_value');
    amountControl.appendChild(amountControlValue);
    const amountControlValueFrom = this.createElement('0', 'div', 'amount__control_from-value');
    const amountControlValueTo = this.createElement('100', 'div', 'amount__control_to-value');
    amountControlValue.appendChild(amountControlValueFrom);
    amountControlValue.appendChild(amountControlValueTo);

    const sortContainer = this.createElement('', 'div', 'sort__container');
    this.container.appendChild(sortContainer);

    const sortSelect = this.createElement('', 'select', 'sort__select');
    sortContainer.appendChild(sortSelect);

    const arrOptions = [
      'Sorting',
      'Price ascending',
      'Price descending',
      'Rating ascending',
      'Rating descending',
      'Discount ascending',
      'Discount descending',
    ];

    for (let i = 0; i < arrOptions.length; i += 1) {
      const sortOption = this.createElement(`${arrOptions[i]}`, 'option', `${arrOptions[i].split(' ').join('_')}`);

      if (i === 0) {
        sortOption.setAttribute('disabled', 'true');
        sortOption.setAttribute('selected', 'true');
      }
      sortSelect.appendChild(sortOption);
    }

    const sortSearch = this.createElement('', 'input', 'sort__search');
    sortSearch.setAttribute('type', 'search');
    sortSearch.setAttribute('placeholder', 'Search');
    sortContainer.appendChild(sortSearch);

    const productContainer = this.createElement('', 'div', 'product__container');
    this.container.appendChild(productContainer);

    for (let i = 0; i < productsList.products.length; i += 1) {
      productContainer.appendChild(this.createCard(i));
    }

    return this.container;
  }
}

export default MainPage;
