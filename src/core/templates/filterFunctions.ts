import productsList, { ProductType } from './product';

type Filter = {
  category: string[];
  brand: string[];
  price: {
    min: number;
    max: number;
  };
  stock: {
    min: number;
    max: number;
  };
  sort: boolean;
};

export const filter: Filter = {
  category: [],
  brand: [],
  price: {
    min: 10,
    max: 1749,
  },
  stock: {
    min: 2,
    max: 150,
  },
  sort: true,
};

export function filteredItems(productItem: ProductType[], filter: Filter, val: string) {
  if (val != '') {
    productItem = productItem.filter(
      (elem) =>
        elem.title.toLowerCase().search(val.toLowerCase()) !== -1 ||
        elem.description.toLowerCase().search(val.toLowerCase()) !== -1 ||
        elem.price.toString().search(val) !== -1 ||
        elem.discountPercentage.toString().search(val) !== -1 ||
        elem.rating.toString().search(val) !== -1 ||
        elem.stock.toString().search(val) !== -1 ||
        elem.brand.toLowerCase().search(val.toLowerCase()) !== -1 ||
        elem.category.toLowerCase().search(val.toLowerCase()) !== -1
    );
  }

  if (filter.category.length && !filter.brand.length) {
    const temp = productItem.filter((item) => filter.category.includes(item.category));
    return temp.filter(
      (item) =>
        item.price >= filter.price.min &&
        item.price <= filter.price.max &&
        item.stock >= filter.stock.min &&
        item.stock <= filter.stock.max
    );
  }
  if (filter.brand.length && !filter.category.length) {
    const temp = productItem.filter((item) => filter.brand.includes(item.brand));
    return temp.filter(
      (item) =>
        item.price >= filter.price.min &&
        item.price <= filter.price.max &&
        item.stock >= filter.stock.min &&
        item.stock <= filter.stock.max
    );
  }
  if (filter.brand.length && filter.category.length) {
    const arr = productItem.filter((item) => filter.category.includes(item.category));
    const temp = arr.filter((item) => filter.brand.includes(item.brand));
    return temp.filter(
      (item) =>
        item.price >= filter.price.min &&
        item.price <= filter.price.max &&
        item.stock >= filter.stock.min &&
        item.stock <= filter.stock.max
    );
  }

  return productItem.filter(
    (item) =>
      item.price >= filter.price.min &&
      item.price <= filter.price.max &&
      item.stock >= filter.stock.min &&
      item.stock <= filter.stock.max
  );
}

export function sorting(arr: ProductType[], value: string) {
  switch (value) {
    case '1':
      arr.sort((a: ProductType, b: ProductType) => (a.price > b.price ? 1 : -1));
      break;
    case '2':
      arr.sort((a: ProductType, b: ProductType) => (a.price < b.price ? 1 : -1));
      break;
    case '3':
      arr.sort((a: ProductType, b: ProductType) => (a.rating > b.rating ? 1 : -1));
      break;
    case '4':
      arr.sort((a: ProductType, b: ProductType) => (a.rating < b.rating ? 1 : -1));
      break;
    case '5':
      arr.sort((a: ProductType, b: ProductType) => (a.discountPercentage > b.discountPercentage ? 1 : -1));
      break;
    case '6':
      arr.sort((a: ProductType, b: ProductType) => (a.discountPercentage < b.discountPercentage ? 1 : -1));
      break;
    case '0':
      arr = [...productsList.products];
      break;
  }

  return arr;
}
