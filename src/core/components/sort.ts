export function createSort() {
  const sort = document.createElement('div');
  sort.classList.add('sort__container');
  sort.innerHTML = `<select class="sort__select">
                      <option value="" disabled selected>Сортировка</option>
                      <option value="">Цена по возрастанию</option>
                      <option value="">Цена по убыванию</option>
                      <option value="">Рейтинг по возрастанию</option>
                      <option value="">Рейтинг по убыванию</option>
                      <option value="">Скидка по возрастанию</option>
                      <option value="">Скидка по убыванию</option>
                    </select>
                    <input class="sort__search" type="search" class="sort__search" placeholder="Поиск">`;
  return sort;
}
