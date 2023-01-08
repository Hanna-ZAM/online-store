import Page from '../../core/templates/page';
import MainPage from '../main/main';
import GoodsPage from '../goods/goods';
import BasketPage from '../basket/basket';
import ErrorPage, { ErrorTypes } from '../error/error';
import productsList from '../../core/templates/product';
import { createUniqueItemsInBasket } from '../../core/templates/function';

export const enum PageIds {
  MainPage = 'main',
  GoodsPage = 'goods',
  BasketPage = 'cart',
}

export const itemsInBasket: Array<number> = localStorage.getItem('itemsInBasket')
  ? JSON.parse(localStorage.getItem('itemsInBasket') || '')
  : [];
export let uniqueItemsInBasket = new Set(itemsInBasket);

export const countItemInBasket = document.querySelector('.item__text-count') as HTMLElement;
export const sumItemInBasket = document.querySelector('.item__text-sum') as HTMLElement;

const linkToCart = document.querySelector('#link_to_cart');
const linkToMain = document.querySelector('#link_to_main');

class App {
  private static container = document.getElementById('root') as HTMLElement;

  static renderNewPage(idPage: string) {
    App.container.innerHTML = '';
    let page: Page | null = null;

    if (idPage === PageIds.MainPage) {
      page = new MainPage(idPage);
    } else if (idPage.includes(PageIds.GoodsPage) && idPage.split('/').filter(Boolean).length === 2) {
      page = new GoodsPage(idPage);
    } else if (idPage === PageIds.BasketPage) {
      page = new BasketPage(idPage);
    } else {
      page = new ErrorPage(idPage, ErrorTypes.Error_404);
    }

    if (page) {
      const pageHTML = page.render();
      App.container.append(pageHTML);
    }
  }

  private getCurrentRoute() {
    return window.location.pathname.replace(/^\//, '');
  }

  private changeRoute(route: string) {
    history.pushState({}, '', `/${route}`);
    App.renderNewPage(route);
  }

  private normalizePathName() {
    const pathname = window.location.pathname.replace(/\/$/, '');
    history.pushState({}, '', pathname);
  }

  run() {
    this.normalizePathName();

    window.addEventListener('popstate', () => {
      App.renderNewPage(this.getCurrentRoute());
    });
    if (window.location.pathname === '/') {
      history.pushState({}, '', `/main`);
    }
    linkToCart?.addEventListener('click', () => {
      this.changeRoute('cart');
    });
    linkToMain?.addEventListener('click', () => {
      this.changeRoute('main');
    });

    App.renderNewPage(this.getCurrentRoute());

    uniqueItemsInBasket = createUniqueItemsInBasket(itemsInBasket);
    countItemInBasket.innerHTML = itemsInBasket.length.toString();
    sumItemInBasket.innerHTML = `${itemsInBasket
      .reduce((acc: number, el: number): number => acc + productsList.products[el - 1].price, 0)
      .toString()} $`;
  }
}

export default App;
