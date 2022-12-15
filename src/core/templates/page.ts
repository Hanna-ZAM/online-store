abstract class Page {
  protected container: HTMLElement;
  static TextObject = {};

  constructor(id: string) {
    this.container = document.createElement('div');
    this.container.id = id;
  }

  protected createPage(text: string) {
    const page = document.createElement('h1');
    page.innerText = text;
    return page;
  }

  render() {
    return this.container;
  }
}

export default Page;
