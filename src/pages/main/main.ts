import './main.css';
import Page from '../../core/templates/page';
import productsList, { ProductType } from '../../core/templates/product';
import { itemsInBasket, uniqueItemsInBasket } from '../app/app';
import { filter, filteredItems, sorting } from '../../core/templates/filterFunctions';

class MainPage extends Page {
  copyProducts: ProductType[];
  tempProducts: ProductType[];
  priceMax: number;
  priceMin: number;
  amountMax: number;
  amountMin: number;
  static TextObject = {
    MainTitle: 'Catalog',
  };

  constructor(id: string) {
    super(id);
    this.copyProducts = JSON.parse(JSON.stringify(productsList.products));
    this.tempProducts = [];
    this.priceMax = 0;
    this.priceMin = 0;
    this.amountMax = 0;
    this.amountMin = 0;
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
    } else if (key === 'price') {
      const arr = JSON.parse(JSON.stringify(productsList.products));
      arr.sort((a: ProductType, b: ProductType) => a.price - b.price);
      this.priceMin = arr[0].price;
      this.priceMax = arr[arr.length - 1].price;
    } else if (key === 'stock') {
      const arr = JSON.parse(JSON.stringify(productsList.products));
      arr.sort((a: ProductType, b: ProductType) => a.stock - b.stock);
      this.amountMin = arr[0].stock;
      this.amountMax = arr[arr.length - 1].stock;
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

  showCards(arrItem: ProductType[], htmlElement: HTMLElement, foundProduct: HTMLElement) {
    htmlElement.innerHTML = '';
    foundProduct.innerText = `Found: ${arrItem.length}`;
    if (arrItem.length) {
      for (let i = 0; i < arrItem.length; i += 1) {
        htmlElement.appendChild(this.createCard(i, arrItem));
      }
    } else {
      foundProduct.innerText = `Found: 0`;
      return (htmlElement.innerHTML = 'Not found');
    }
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
    const filterHeaderAmount = this.createElement('', 'div', 'filter__header_amount');

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
      const elementSpan = this.createElementId(`${arrCategory[i]}`, 'span', `${arrCategory[i]}`);

      filterGroupForm1.appendChild(elementLabel);

      elementLabel.appendChild(elementInput);
      elementInput.setAttribute('type', 'checkbox');
      elementLabel.appendChild(elementSpan);

      elementSpan.addEventListener('click', () => {
        // let params = new URLSearchParams(window.location.search);
        // params.append('category', '1111');
        // console.log(params);
        // console.log(window.location.search);

        // window.location.search = `&category=${elementSpan.id}`
        const url = new URL(window.location.href);
        url.searchParams.set('category', `${elementSpan.id}`);
        window.history.pushState('main', '', url);

        console.log(window.location.search);

        if (!filter.category.includes(elementSpan.id)) {
          filter.category.push(elementSpan.id);
          this.tempProducts = filteredItems(this.copyProducts, filter, sortSearch.value);
          this.showCards(this.tempProducts, productContainer, filterHeaderAmount);
        } else {
          const index = filter.category.indexOf(elementSpan.id);
          filter.category.splice(index, 1);
          this.tempProducts = filteredItems(this.copyProducts, filter, sortSearch.value);
          this.showCards(this.tempProducts, productContainer, filterHeaderAmount);
        }
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
      elementLabel.appendChild(elementSpan);

      elementSpan.addEventListener('click', () => {
        if (!filter.brand.includes(elementSpan.id)) {
          filter.brand.push(elementSpan.id);
          this.tempProducts = filteredItems(this.copyProducts, filter, sortSearch.value);
          this.showCards(this.tempProducts, productContainer, filterHeaderAmount);
        } else {
          const index = filter.brand.indexOf(elementSpan.id);
          filter.brand.splice(index, 1);
          this.tempProducts = filteredItems(this.copyProducts, filter, sortSearch.value);
          this.showCards(this.tempProducts, productContainer, filterHeaderAmount);
        }
      });
    }

    const filterGroupCategory3 = this.createElement('', 'div', 'filter__group_category');
    filterGroup.appendChild(filterGroupCategory3);

    const filterTitleCategory3 = this.createElement('Choose a criterion', 'h3', 'filter__group_title');
    const filterTitlePrice = this.createElement('Price $', 'h4', 'filterTitlePrice');

    this.filterProduct('price');
    filterGroupCategory3.appendChild(filterTitleCategory3);
    filterGroupCategory3.appendChild(filterTitlePrice);
    const priceControl = this.createElement('', 'div', 'price__control');
    filterGroupCategory3.appendChild(priceControl);
    const inputPriceFrom = this.createElementId('', 'input', 'fromPrice') as HTMLInputElement;
    inputPriceFrom.setAttribute('type', 'range');
    inputPriceFrom.setAttribute('value', `${this.priceMin}`);
    inputPriceFrom.setAttribute('min', `${this.priceMin}`);
    inputPriceFrom.setAttribute('max', `${this.priceMax}`);
    const inputPriceTo = this.createElementId('', 'input', 'toPrice') as HTMLInputElement;
    inputPriceTo.setAttribute('type', 'range');
    inputPriceTo.setAttribute('value', '100');
    inputPriceTo.setAttribute('min', `${this.priceMin}`);
    inputPriceTo.setAttribute('max', `${this.priceMax}`);
    inputPriceTo.value = `${this.priceMax}`;
    priceControl.appendChild(inputPriceFrom);
    priceControl.appendChild(inputPriceTo);
    const priceControlValue = this.createElement('', 'div', 'price__control_value');
    priceControl.appendChild(priceControlValue);
    const priceControlValueFrom = this.createElement(`${this.priceMin}`, 'div', 'price__control_from-value');
    const priceControlValueTo = this.createElement(`${this.priceMax}`, 'div', 'price__control_to-value');
    priceControlValue.appendChild(priceControlValueFrom);
    priceControlValue.appendChild(priceControlValueTo);

    const minGap = 0;

    inputPriceFrom.addEventListener('input', () => {
      if (parseInt(inputPriceTo.value) - parseInt(inputPriceFrom.value) <= minGap) {
        inputPriceFrom.value = (parseInt(inputPriceTo.value) - minGap).toString();
      }
      priceControlValueFrom.textContent = inputPriceFrom.value;
      filter.price.min = +inputPriceFrom.value;
      this.tempProducts = filteredItems(this.copyProducts, filter, sortSearch.value);
      this.showCards(this.tempProducts, productContainer, filterHeaderAmount);
    });

    inputPriceTo.addEventListener('input', () => {
      if (parseInt(inputPriceTo.value) - parseInt(inputPriceFrom.value) <= minGap) {
        inputPriceTo.value = (parseInt(inputPriceFrom.value) + minGap).toString();
      }
      if (parseInt(inputPriceTo.value) <= this.priceMin + 12) {
        inputPriceTo.style.zIndex = '2';
      } else {
        inputPriceTo.style.zIndex = '0';
      }
      priceControlValueTo.textContent = inputPriceTo.value;
      filter.price.max = +inputPriceTo.value;
      this.tempProducts = filteredItems(this.copyProducts, filter, sortSearch.value);
      this.showCards(this.tempProducts, productContainer, filterHeaderAmount);
    });

    this.filterProduct('stock');
    const filterTitleAmount = this.createElement('Stock', 'h4', 'filterTitleBalance');
    filterGroupCategory3.appendChild(filterTitleAmount);
    const amountControl = this.createElement('', 'div', 'amount__control');
    filterGroupCategory3.appendChild(amountControl);
    const inputAmountFrom = this.createElementId('', 'input', 'fromAmount') as HTMLInputElement;
    inputAmountFrom.setAttribute('type', 'range');
    inputAmountFrom.setAttribute('value', `${this.amountMin}`);
    inputAmountFrom.setAttribute('min', `${this.amountMin}`);
    inputAmountFrom.setAttribute('max', `${this.amountMax}`);
    const inputAmountTo = this.createElementId('', 'input', 'toAmount') as HTMLInputElement;
    inputAmountTo.setAttribute('type', 'range');
    inputAmountTo.setAttribute('value', '100');
    inputAmountTo.setAttribute('min', `${this.amountMin}`);
    inputAmountTo.setAttribute('max', `${this.amountMax}`);
    inputAmountTo.value = `${this.amountMax}`;
    amountControl.appendChild(inputAmountFrom);
    amountControl.appendChild(inputAmountTo);
    const amountControlValue = this.createElement('', 'div', 'amount__control_value') as HTMLInputElement;
    amountControl.appendChild(amountControlValue);
    const amountControlValueFrom = this.createElement(`${this.amountMin}`, 'div', 'amount__control_from-value');
    const amountControlValueTo = this.createElement(`${this.amountMax}`, 'div', 'amount__control_to-value');
    amountControlValue.appendChild(amountControlValueFrom);
    amountControlValue.appendChild(amountControlValueTo);

    inputAmountFrom.addEventListener('input', () => {
      if (parseInt(inputAmountTo.value) - parseInt(inputAmountFrom.value) <= minGap) {
        inputAmountFrom.value = (parseInt(inputAmountTo.value) - minGap).toString();
      }
      amountControlValueFrom.textContent = inputAmountFrom.value;
      filter.stock.min = +inputAmountFrom.value;
      this.tempProducts = filteredItems(this.copyProducts, filter, sortSearch.value);
      this.showCards(this.tempProducts, productContainer, filterHeaderAmount);
    });

    inputAmountTo.addEventListener('input', () => {
      if (parseInt(inputAmountTo.value) - parseInt(inputAmountFrom.value) <= minGap) {
        inputAmountTo.value = (parseInt(inputAmountFrom.value) + minGap).toString();
      }
      if (parseInt(inputAmountTo.value) <= this.amountMin) {
        inputAmountTo.style.zIndex = '2';
      } else {
        inputAmountTo.style.zIndex = '0';
      }
      amountControlValueTo.textContent = inputAmountTo.value;
      filter.stock.max = +inputAmountTo.value;
      this.tempProducts = filteredItems(this.copyProducts, filter, sortSearch.value);
      this.showCards(this.tempProducts, productContainer, filterHeaderAmount);
    });

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

    const sortSearch = this.createElement('', 'input', 'sort__search') as HTMLInputElement;
    sortSearch.setAttribute('type', 'text');
    sortSearch.setAttribute('placeholder', 'Search');
    sortContainer.appendChild(sortSearch);

    sortSearch.addEventListener('input', () => {
      this.tempProducts = filteredItems(this.copyProducts, filter, sortSearch.value);
      this.showCards(this.tempProducts, productContainer, filterHeaderAmount);
    });

    const copyLink = this.createElement('Copy link', 'button', 'sort__copy_link');
    sortContainer.appendChild(copyLink);

    const sortReset = this.createElement('Reset filters', 'button', 'sort__reset');
    sortContainer.appendChild(sortReset);

    sortReset.addEventListener('click', () => {
      this.showCards(productsList.products, productContainer, filterHeaderAmount);
      this.copyProducts = JSON.parse(JSON.stringify(productsList.products));
      this.tempProducts = [];
      sortSelect.value = '0';
      sortSearch.value = '';
      inputPriceFrom.value = `${this.priceMin}`;
      inputPriceTo.value = `${this.priceMax}`;
      priceControlValueFrom.textContent = inputPriceFrom.value;
      priceControlValueTo.textContent = inputPriceTo.value;
      filter.price.min = +inputPriceFrom.value;
      filter.price.max = +inputPriceTo.value;
      inputAmountFrom.value = `${this.amountMin}`;
      inputAmountTo.value = `${this.amountMax}`;
      filter.stock.min = +inputAmountFrom.value;
      filter.stock.max = +inputAmountTo.value;
      amountControlValueFrom.textContent = inputAmountFrom.value;
      amountControlValueTo.textContent = inputAmountTo.value;
      filter.category = [];
      filter.brand = [];

      const arrCategory = this.filterProduct('category');
      const arrBrand = this.filterProduct('brand');

      for (let i = 0; i < arrCategory.length; i += 1) {
        const category = filterGroupCategory1.children[1].children[i].children[0] as HTMLInputElement;
        if (category.checked) {
          category.checked = false;
        }
      }

      for (let i = 0; i < arrBrand.length; i += 1) {
        const brand = filterGroupCategory2.children[1].children[i].children[0] as HTMLInputElement;
        if (brand.checked) {
          brand.checked = false;
        }
      }
    });

    const productContainer = this.createElement('', 'div', 'product__container');
    this.container.appendChild(productContainer);
    this.showCards(this.copyProducts, productContainer, filterHeaderAmount);

    sortSelect.addEventListener('change', () => {
      this.copyProducts = sorting(this.copyProducts, sortSelect.value);
      this.tempProducts = sorting(this.tempProducts, sortSelect.value);
      filter.category.length || filter.brand.length ? (filter.sort = false) : (filter.sort = true);
      if (!this.tempProducts.length && filter.sort) {
        this.showCards(this.copyProducts, productContainer, filterHeaderAmount);
      } else {
        this.showCards(this.tempProducts, productContainer, filterHeaderAmount);
      }
    });

    return this.container;
  }
}

export default MainPage;
