import './error.css';
import Page from '../../core/templates/page';
import App from '../app/app';

export enum ErrorTypes {
  Error_404 = 404,
}

class ErrorPage extends Page {
  private errorType: ErrorTypes | string;

  static TextObject: { [prop: string]: string } = {
    '404': 'Page not found',
  };

  constructor(id: string, errorType: ErrorTypes | string) {
    super(id);
    this.errorType = errorType;
  }

  render() {
    // const title = this.createTitle(ErrorPage.TextObject[this.errorType]);
    const title = this.createElement('', 'div', 'error__container');
    this.container.appendChild(title);

    const errorPage = this.createElement('Page not found', 'span', 'error__page');
    const errorNumber = this.createElement(
      'Sorry, but the page you were looking for could not be found.',
      'span',
      'error__number'
    );
    const errorBtn = this.createElement('Homepage', 'div', 'error__btn');
    // errorBtn.setAttribute('href', '/#main');
    errorBtn.addEventListener('click', () => {
      history.pushState({}, '', `/main`);
      App.renderNewPage('main');
    });
    title.append(errorPage);
    title.append(errorNumber);
    title.append(errorBtn);
    return this.container;
  }
}

export default ErrorPage;
