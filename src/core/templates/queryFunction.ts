type Query = {
  category?: string;
  brand?: string;
  priceFrom?: string;
  priceTo?: string;
  stockFrom?: string;
  stockTo?: string;
  search?: string;
  sort?: string;
};

export const params: Query = {};

export function syncURL(query: Query) {
  console.log(query);

  const baseURL = window.location.href;
  const url = new URL(baseURL);
  const params = new URLSearchParams(query);

  if (!query.category?.length) {
    params.delete('category');
  }
  if (!query.brand?.length) {
    params.delete('brand');
  }
  if (!query.search?.length) {
    params.delete('search');
  }
  if (!query.priceFrom?.length) {
    params.delete('priceFrom');
  }
  if (!query.priceTo?.length) {
    params.delete('priceTo');
  }
  if (!query.stockFrom?.length) {
    params.delete('stockFrom');
  }
  if (!query.stockTo?.length) {
    params.delete('stockTo');
  }
  if (!query.sort?.length) {
    params.delete('sort');
  }

  url.search = params.toString();

  window.history.pushState(query, '', url);
}
