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

/*export const itemsInBasket: Array<number> = [1, 4, 2, 3, 1, 4, 5, 3];
export let uniqueItemsInBasket = new Set<number>();*/

export const countItemInBasket = document.querySelector('.item__text-count') as HTMLElement;
export const sumItemInBasket = document.querySelector('.item__text-sum') as HTMLElement;

const linkToCart = document.querySelector('#link_to_cart');
const linkToMain = document.querySelector('#link_to_main');
/*sumItemInBasket!.innerHTML=`${itemsInBasket.reduce((acc:number, el:number):number => (acc + productsList.products[el-1].price), 0).toString()} $`;*/

class App {
  private static container = document.getElementById('root') as HTMLElement;

  static renderNewPage(idPage: string) {
    console.log('new');
    App.container.innerHTML = '';
    let page: Page | null = null;

    if (idPage === PageIds.MainPage) {
      page = new MainPage(idPage);
    } else if (idPage === PageIds.GoodsPage) {
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
    return window.location.pathname.split('/').filter(Boolean)[0];
    // return window.location.pathname.slice(1);
  }

  private changeRoute(route: string) {
    history.pushState({}, '', `/${route}`);
    App.renderNewPage(route);
  }

  run() {
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
    console.log(countItemInBasket.innerHTML);
    sumItemInBasket.innerHTML = `${itemsInBasket
      .reduce((acc: number, el: number): number => acc + productsList.products[el - 1].price, 0)
      .toString()} $`;
  }
}

export default App;
