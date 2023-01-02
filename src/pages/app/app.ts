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

export const itemsInBasket: Array<number> = [1, 4, 2, 3, 1, 4, 5, 3]; //- здесь будут Id товаров, которые добавлены в корзину
export let uniqueItemsInBasket = new Set<number>(); //- здесь будут Id товаров, которые добавлены в корзину

export const countItemInBasket = document.querySelector('.item__text-count');
export const sumItemInBasket = document.querySelector('.item__text-sum');

const linkToCart = document.querySelector('#link_to_cart');
const linkToMain = document.querySelector('#link_to_main');
/*sumItemInBasket!.innerHTML=`${itemsInBasket.reduce((acc:number, el:number):number => (acc + productsList.products[el-1].price), 0).toString()} $`;*/

class App {
  private static container = document.getElementById('root') as HTMLElement;

  static renderNewPage(idPage: string) {
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
      // window.location.hash = `#${idPage}`;
      const pageHTML = page.render();
      App.container.append(pageHTML);
    }
  }

  // private enableRouteChange() {
  //   window.addEventListener('hashchange', () => {
  //     const hash = window.location.hash.slice(1);
  //     App.renderNewPage(hash);
  //   });
  // }

  private getCurrentRoute() {
    return window.location.pathname.split('/').filter(Boolean)[0];
  }

  private changeRoute(route: string) {
    history.pushState({}, '', `/${route}`);
    App.renderNewPage(route);
  }

  run() {
    console.log(itemsInBasket);

    if (window.location.pathname === '/') {
      history.pushState({}, '', `/main`);
    }

    linkToCart?.addEventListener('click', () => {
      this.changeRoute('cart');
    });
    linkToMain?.addEventListener('click', () => {
      this.changeRoute('main');
    });

    // this.enableRouteChange();
    App.renderNewPage(this.getCurrentRoute());
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1);
    uniqueItemsInBasket = createUniqueItemsInBasket(itemsInBasket);
    countItemInBasket!.innerHTML = itemsInBasket.length.toString();
    console.log(countItemInBasket!.innerHTML);
    sumItemInBasket!.innerHTML = `${itemsInBasket
      .reduce((acc: number, el: number): number => acc + productsList.products[el - 1].price, 0)
      .toString()} $`;
  }
}

export default App;
