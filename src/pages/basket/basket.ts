import Page from '../../core/templates/page';

class BasketPage extends Page {
  static TextObject = {
    MainTitle: 'Basket Page',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const page = this.createPage(BasketPage.TextObject.MainTitle);
    this.container.append(page);
    return this.container;
  }
}

export default BasketPage;
