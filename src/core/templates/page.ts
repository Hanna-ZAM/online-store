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

  render() {
    return this.container;
  }
}

export default Page;
