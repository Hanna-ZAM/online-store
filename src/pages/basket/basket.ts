import Page from '../../core/templates/page';

class BasketPage extends Page {
  static TextObject = {
    MainTitle: 'Корзина',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createTitle(BasketPage.TextObject.MainTitle);
    title.classList.add('main__title');
    this.container.append(title);
    return this.container;
  }
}

export default BasketPage;
