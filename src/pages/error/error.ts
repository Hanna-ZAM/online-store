import Page from '../../core/templates/page';

export enum ErrorTypes {
  Error_404 = 404,
}

class ErrorPage extends Page {
  private errorType: ErrorTypes | string;

  static TextObject: { [prop: string]: string } = {
    '404': 'Страница не найдена',
  };

  constructor(id: string, errorType: ErrorTypes | string) {
    super(id);
    this.errorType = errorType;
  }

  render() {
    const page = this.createPage(ErrorPage.TextObject[this.errorType]);
    this.container.append(page);
    return this.container;
  }
}

export default ErrorPage;
