import Page from '../../core/templates/page';

class MainPage extends Page {
  static TextObject = {
    MainTitle: 'Main Page',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const page = this.createPage(MainPage.TextObject.MainTitle);
    this.container.append(page);
    return this.container;
  }
}

export default MainPage;
