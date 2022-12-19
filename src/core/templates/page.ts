abstract class Page {
  protected container: HTMLElement;
  static TextObject = {};

  constructor(id: string) {
    this.container = document.createElement('div');
    this.container.id = id;
  }



  protected createTitle(text: string) {
    const title = document.createElement('h1');
    title.innerText = text;
    return title;
  }

  protected createElement(text: string, type:string, style:string){
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
