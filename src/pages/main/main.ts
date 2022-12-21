import './main.css';
import Page from '../../core/templates/page';
import productsList, { ProductType } from '../../core/templates/product';
import { itemsInBasket, uniqueItemsInBasket } from '../app/app';
import { sorting } from '../../core/templates/sortFunctions';

class MainPage extends Page {
  sortArray: ProductType[];
  tempArray: string[];
  static TextObject = {
    MainTitle: 'Catalog',
  };

  constructor(id: string) {
    super(id);
    this.sortArray = [];
    this.tempArray = [];
  }

  filterProduct(key: string): string[] {
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

  createCard(i: number, arr: ProductType[]) {
    const cardContainer = this.createElement('', 'div', 'card__container');
    const btnOpenCard = this.createElement('', 'button', 'card__open-card_btn');
    const imgCard = this.createElement('', 'img', 'card__image');
    imgCard.setAttribute('src', `${arr[i].thumbnail}`);
    const btnAddBasket = this.createElement('add to cart', 'button', 'card__add-basket_btn');
    const cardName = this.createElement(`${arr[i].title}`, 'div', 'card__name');
    const cardPrice = this.createElement(`${arr[i].price} $`, 'div', 'card__price');

    cardContainer.appendChild(btnOpenCard);
    btnOpenCard.append(imgCard);
    cardContainer.append(btnAddBasket);
    cardContainer.append(cardName);
    cardContainer.append(cardPrice);

    btnAddBasket.addEventListener('click', () => {
      itemsInBasket.push(arr[i].id);
      uniqueItemsInBasket.add(arr[i].id);
      console.log(itemsInBasket);
      console.log(uniqueItemsInBasket);
    });

    return cardContainer;
  }

  showCards(arrItem: ProductType[], htmlElement: HTMLElement) {
    htmlElement.innerHTML = '';

    for (let i = 0; i < arrItem.length; i += 1) {
      htmlElement.appendChild(this.createCard(i, arrItem));
    }
  }

  render() {
    this.sortArray = JSON.parse(JSON.stringify(productsList.products));

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

    const arrCategory = this.filterProduct('category');

    for (let i = 0; i < arrCategory.length; i += 1) {
      const elementLabel = this.createElement('', 'label', 'checkbox');
      const elementInput = document.createElement('input');
      const elementSpan = this.createElement(`${arrCategory[i]}`, 'span', `${arrCategory[i]}`);

      filterGroupForm1.appendChild(elementLabel);

      elementLabel.appendChild(elementInput);
      elementInput.setAttribute('type', 'checkbox');
      elementInput.id = `${arrCategory[i]}`;
      elementLabel.appendChild(elementSpan);

      elementSpan.addEventListener('click', () => {
        if (!elementSpan.classList.contains('add')) {
          this.tempArray.push(elementSpan.className);
          elementSpan.classList.add('add');
        } else {
          elementSpan.classList.remove('add');
          const index = this.tempArray.indexOf(elementSpan.className);
          this.tempArray.splice(index, 1);
        }

        console.log(this.tempArray);
      });
    }

    const filterGroupCategory2 = this.createElement('', 'div', 'filter__group_category');
    filterGroup.appendChild(filterGroupCategory2);

    const filterTitleCategory2 = this.createElement('Select a brand', 'h3', 'filter__group_title');
    const filterGroupForm2 = this.createElement('', 'form', 'filter__group_form');

    filterGroupCategory2.appendChild(filterTitleCategory2);
    filterGroupCategory2.appendChild(filterGroupForm2);

    const arrBrand = this.filterProduct('brand');

    for (let i = 0; i < arrBrand.length; i += 1) {
      const elementLabel = this.createElement('', 'label', 'checkbox');
      const elementInput = document.createElement('input');
      const elementSpan = this.createElementId(`${arrBrand[i]}`, 'span', `${arrBrand[i]}`);

      filterGroupForm2.appendChild(elementLabel);

      elementLabel.appendChild(elementInput);
      elementInput.setAttribute('type', 'checkbox');
      elementInput.id = `${arrBrand[i]}`;
      elementLabel.appendChild(elementSpan);

      elementSpan.addEventListener('click', () => {
        // if (!elementSpan.classList.contains('add')) {
        //   elementSpan.classList.add('add');
        //   this.sortArray.push(elementSpan.id);
        // } else {
        //   elementSpan.classList.remove('add');
        //   let index = this.sortArray.indexOf(elementSpan.id);
        //   this.sortArray.splice(index, 1);
        // }
      });
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

    const sortSelect = this.createElement('', 'select', 'sort__select') as HTMLInputElement;
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
      const sortOption = this.createElementId(`${arrOptions[i]}`, 'option', `${arrOptions[i].split(' ').join('_')}`);
      sortOption.setAttribute('value', `${i}`);

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
    this.showCards(productsList.products, productContainer);

    sortSelect.addEventListener('change', () => {
      this.sortArray = sorting(this.sortArray, sortSelect.value);
      this.showCards(this.sortArray, productContainer);
    });

    return this.container;
  }
}

export default MainPage;
