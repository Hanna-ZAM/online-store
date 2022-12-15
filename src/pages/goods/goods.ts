import Page from '../../core/templates/page';

class GoodsPage extends Page {
  static TextObject = {
    MainTitle: 'Goods Page',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const page = this.createPage(GoodsPage.TextObject.MainTitle);
    this.container.append(page);
    return this.container;
  }
}

export default GoodsPage;
