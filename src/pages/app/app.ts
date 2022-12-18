import Page from '../../core/templates/page';
import MainPage from '../main/main';
import GoodsPage from '../goods/goods';
import BasketPage from '../basket/basket';
import ErrorPage, { ErrorTypes } from '../error/error';
import {productsList} from '../../core/templates/product';

export const enum PageIds {
  MainPage = 'main-page',
  GoodsPage = 'goods-page',
  BasketPage = 'basket-page',
}

export const itemsInBasket:Array<number>=[]; //- здесь будут Id товаров, которые добавлены в корзину

export const countItemInBasket= document.querySelector('.item__text-count');
countItemInBasket.innerHTML=itemsInBasket.length;
export const sumItemInBasket= document.querySelector('.item__text-sum');


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
      const pageHTML = page.render();
      App.container.append(pageHTML);
    }
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
  }

  run() {
    this.enableRouteChange();
    App.renderNewPage('main-page');
  }
}

export default App;
