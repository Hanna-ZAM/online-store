import { filter } from './filterFunctions';

export type Query = {
  category?: string;
  brand?: string;
  priceFrom?: string;
  priceTo?: string;
  stockFrom?: string;
  stockTo?: string;
  search?: string;
  sort?: string;
  view?: string;
};

type T = keyof Query;

export function syncURL(query: Query) {
  const baseURL = window.location.href;
  const url = new URL(baseURL);
  const params = new URLSearchParams(query);

  for (const key in query) {
    if (!query[key as T]?.length) {
      params.delete(`${key}`);
    }
  }

  url.search = params.toString();
  history.pushState(query, '', url);
}

export function transformToURLParams() {
  const queryString = window.location.search;
  const params = queryString.slice(1).split('&');

  const query: Query = {};

  for (let i = 0; i < params.length; i += 1) {
    const param: string[] = params[i].split('=');
    if (param.length === 2) {
      query[param[0] as T] = `${param[1].replace(/\+/g, ' ').split('%2C')}`;
    }
  }
  return query;
}

export function filterParam(obj: Query) {
  obj.category ? (filter.category = obj.category?.split(',')) : (filter.category = []);
  // if (obj.category) {
  //   filter.category = obj.category?.split(',');
  // } else {
  //   filter.category = [];
  // }
  if (obj.brand) {
    filter.brand = obj.brand?.split(',');
  } else {
    filter.brand = [];
  }
  if (obj.priceFrom) {
    filter.price.min = +obj.priceFrom;
  } else {
    filter.price.min = 10;
  }
  if (obj.priceTo) {
    filter.price.max = +obj.priceTo;
  } else {
    filter.price.max = 1749;
  }
  if (obj.stockFrom) {
    filter.stock.min = +obj.stockFrom;
  } else {
    filter.stock.min = 2;
  }
  if (obj.stockTo) {
    filter.stock.max = +obj.stockTo;
  } else {
    filter.stock.max = 150;
  }

  return filter;
}
