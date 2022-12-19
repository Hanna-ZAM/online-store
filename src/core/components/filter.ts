import productsList from '../templates/product';

export function createFilter() {
  const filter = document.createElement('div');
  filter.classList.add('main__filter');
  filter.innerHTML = `<div class="filter__container">
                        <div class="filter__header">
                          <div class="filter__header_title">Фильтр</div>
                          <div class="filter__header_amount">Найдено: ${productsList.products.length}</div>
                        </div>
                        <div class="filer__group">
                          <div class="filter__group_category">
                            <h3 class="filter__group_title">Выберите категорию:</h3>
                            <form class="filter__group_form">
                              ${categoryFilter()}
                            </form>
                          </div>
                          <div class="filter__group_category">
                            <h3 class="filter__group_title">Выберите производителя:</h3>
                            <form class="filter__group_form">
                              ${brandFilter()}
                            </form>
                          </div>
                          <div class="filter__group_category">
                            <h3 class="filter__group_title">Выберите критерий:</h3>
                            <h4>Цена, руб</h4>
                            <div class="price__control">
                              <input type="range" id="fromPrice" value="0" min="0" max="100">
                              <input type="range" id="toPrice" value="100" min="0" max="100">
                              <div class="price__control_value">
                                <div class="price__control_from-value">0</div>
                                <div class="price__control_to-value">100</div>
                              </div>
                            </div>
                            <h4>Остаток, руб</h4>
                            <div class="amount__control">
                              <input type="range" id="fromAmount" value="0" min="0" max="100">
                              <input type="range" id="toAmount" value="100" min="0" max="100">
                              <div class="amount__control_value">
                                <div class="amount__control_from-value">0</div>
                                <div class="amount__control_to-value">100</div>
                              </div>
                            </div>
                          </div>
                        </div>
    </div>`;
  return filter;
}

function categoryFilter() {
  const element = document.createElement('label');
  const arr: string[] = [];
  productsList.products.filter((item) => {
    if (!arr.includes(item.category)) {
      arr.push(item.category);
    }
  });
  return arr
    .map((item) => {
      return (element.innerHTML = `<label class="checkbox">
                                  <input type="checkbox" id="${item}">
                                  <span>${item}</span>
                                </label>`);
    })
    .join('');
}

function brandFilter() {
  const element = document.createElement('label');
  const arr: string[] = [];
  productsList.products.filter((item) => {
    if (!arr.includes(item.brand)) {
      arr.push(item.brand);
    }
  });
  return arr
    .map((item) => {
      return (element.innerHTML = `<label class="checkbox">
                                  <input type="checkbox" id=${item}>
                                  <span>${item}</span>
                                </label>`);
    })
    .join('');
}
