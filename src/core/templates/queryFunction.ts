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
  if (obj.category?.length) {
    filter.category = obj.category?.split(',');
  }
  if (obj.brand?.length) {
    filter.brand = obj.brand?.split(',');
  }
  if (obj.priceFrom?.length) {
    filter.price.min = +obj.priceFrom;
  }
  if (obj.priceTo?.length) {
    filter.price.max = +obj.priceTo;
  }
  if (obj.stockFrom?.length) {
    filter.stock.min = +obj.stockFrom;
  }
  if (obj.stockTo?.length) {
    filter.stock.max = +obj.stockTo;
  }

  return filter;
}
