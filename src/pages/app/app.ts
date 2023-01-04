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

export const itemsInBasket: Array<number> = [1, 4, 2, 3, 1, 4, 5, 3];
export let uniqueItemsInBasket = new Set<number>();

export const countItemInBasket = document.querySelector('.item__text-count');
export const sumItemInBasket = document.querySelector('.item__text-sum');

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
      history.pushState({}, '', `/main`);
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

  private enableRouteChange() {
    //   window.addEventListener('hashchange', () => {
    //     const hash = window.location.hash.slice(1);
    //     App.renderNewPage(hash);
    //   });
    /*window.addEventListener('beforeunload', () => {
      console.log('rrrrr');
      this.changeRoute(``);
    });*/
  }

  private getCurrentRoute() {
    return window.location.pathname.split('/').filter(Boolean)[0];
  }

  private changeRoute(route: string) {
    history.pushState({}, '', `/${route}`);
    App.renderNewPage(this.getCurrentRoute());
  }

  run() {
    console.log(itemsInBasket);

    if (window.location.pathname === '/') {
      history.pushState({}, '', `/main`);
    }

    window.addEventListener('popstate', (event) => {
      this.changeRoute(`${document.location.pathname.slice(1)}`);
    });
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault();
      console.log('rrrrr');
      this.changeRoute(``);
    });
    /* window.addEventListener('unload', () => {
        this.changeRoute(`${document.location.pathname.slice(1)}`);
        console.log('rrrrr');
        console.log("the location href is changed!");
          });

      /*window.addEventListener("beforeunload", function () {
        let oldHref = document.location.href,
          bodyDOM = document.querySelector("body");
        function checkModifiedBody() {
          let tmp = document.querySelector("body");
          if (tmp != bodyDOM) {
            bodyDOM = tmp;
            observer.observe(bodyDOM!, config);
          }
        }
        const observer = new MutationObserver(function (mutations) {
          if (oldHref != document.location.href) {
            oldHref = document.location.href;
            console.log("the location href is changed!");
            window.requestAnimationFrame(checkModifiedBody)
          }
        });
        const config = {
          childList: true,
          subtree: true
        };
        observer.observe(bodyDOM!, config);
      }, false);*/

    linkToCart?.addEventListener('click', () => {
      this.changeRoute('cart');
    });
    linkToMain?.addEventListener('click', () => {
      this.changeRoute('main');
    });

    this.enableRouteChange();
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
