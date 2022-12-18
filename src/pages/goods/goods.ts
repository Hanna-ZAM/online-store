import Page from '../../core/templates/page';

class GoodsPage extends Page {
  static TextObject = {
    MainTitle: 'Goods Page',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createTitle(GoodsPage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}

export default GoodsPage;
