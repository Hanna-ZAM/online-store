import './main.css';
import Page from '../../core/templates/page';
import { createFilter } from '../../core/components/filter';
import { createSort } from '../../core/components/sort';

class MainPage extends Page {
  static TextObject = {
    MainTitle: 'Каталог',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createTitle(MainPage.TextObject.MainTitle);
    title.classList.add('main__title');
    this.container.append(title, createFilter(), createSort());
    return this.container;
  }
}

export default MainPage;
