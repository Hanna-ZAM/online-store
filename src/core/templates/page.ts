abstract class Page {
  protected container: HTMLElement;
  static TextObject = {};

  constructor(id: string) {
    this.container = document.createElement('div');
    this.container.id = id;
  }

  protected createPage(text: string) {
    const page = document.createElement('h1');
    page.classList.add('h1');
    page.innerText = text;
    return page;
  }

  protected createElement(text: string, type:string, style:string) {
    const element = document.createElement(type);
    element.classList.add(style);
    element.innerText = text;
    return element;
  }

  createBasketItem? (n:number) {
    const item=this.createElement('', 'li', 'basket-item');
    return  item

  }

  render() {
    return this.container;
  }
}

export default Page;
