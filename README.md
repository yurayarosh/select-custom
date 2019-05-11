# customSelect

### Установка

```html
npm i yurayarosh/customSelect -D
```

```html
<select class="js-select">
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</select>
```

```js
import Select from 'customSelect';

const selects = [].slice.call(document.querySelectorAll('.js-select'));

selects.forEach(function(el) {
  const select = new Select(el, {options});
  select.init();

  //destroy
  if (!select) return;
  select.destroy();
  select = null;

  //refresh
  if (!select) return;
  select.refresh();
});
```

### Опции

Стандартные опции
```js
{
  optionBuilder: false,
  panelItem: false,
  changeOpenerText: true,
  multipleSelectionOnSingleClick: false,
  multipleSelectOpenerText: false,
  allowPanelClick: false,
  openOnHover: false,
  closeOnMouseleave: false
}
```

`optionBuilder` - функция с аргументами `option, customOption` для добавления елементов в кастомную опцию.

`panelItem` - варианты: `{ item: element or string, position: 'top', className: '' }`, `{ item: element or string, position: 'bottom', className: '' }`- добавляет елемент в кастомную панель поверх остальных или вниз соответственно.

`changeOpenerText` - если установлено `false` - при выборе опции текст в верхней панели меняться не будет.

Если нативному селекту установлен аттрибут `multiple` селект позволяет множественный выбор.

`multipleSelectionOnSingleClick` - если установлено `true` - позволяет множественный выбор без зажатой клавиши CTRL.

`multipleSelectOpenerText` - если установлено `'array'` - в верхнюю панель при выборе опций будет добавляться масив с их текстом.

`allowPanelClick` - если установлено `true` - при клике на панель с опциями она будет оставаться открытой.

`openOnHover` - если установлено `true` - открытие происходит по наведнию.

`closeOnMouseleave` - если установлено `true` - закрытие происходит по наведнию.

Поддерживает стандартные аттрибуты `multiple`, `disabled`, `disabled` для `option`.

### События

На нативный селект
```js
const select = new Select(el, {options});
select.init();

el.addEventListener('change', (e) => {
  // some function
});

```

На открытие и закрытие соответственно
```js
const select = new Select(el, {options});

select.onOpen = (select) => {
  // some function
};

select.onClose = (select) => {
  // some function
};

select.init();

```

### Пример использования

```js
const selects = [...document.querySelectorAll('.js-select')];

// приер создания инпута для вставки в панель
const panelInput = document.createElement('input');
panelInput.type = 'text';

// пример вставки иконки в елемент опции
function addOptionItem(option, customOption) {
  const color = option.dataset.color;
  if (!color) return;
  const inner = customOption.innerHTML;
  customOption.innerHTML = `<span style="background-color: ${color};"></span>` + inner;
};

const params = {
  multiple: {
    multipleSelectOpenerText: true,
    multipleSelectionOnSingleClick: true
  },
  withInput: {
    panelItem: {
      item: panelInput,
      position: 'top',
      className: 'js-search'
    }
  },
  withInputScnd: {
    panelItem: {
      item: '<input type="text" class="js-search"/>',
      position: 'top'
    }
  },
  default: {
    optionBuilder: addOptionItem
  }
};

selects.forEach((selectEl) => {
  const selectType = selectEl.dataset.type;
  const select = new Select(selectEl, params[selectType]);
  select.init();

  // пример добавления плейсхолдера
  if (selectEl.classList.contains('has-placeholder')) {
    selectEl.parentNode.classList.add('has-placeholder');
  };

  selectEl.addEventListener('change', (e) => {
    const currSelect = e.currentTarget;
    const selectType = select.dataset.type;

    if (currSelect.value !== 'placeholder') {
      currSelect.classList.add('has-placeholder-hidden');
      currSelect.parentNode.classList.add('has-placeholder-hidden');
    } else {
      currSelect.classList.remove('has-placeholder');
      currSelect.parentNode.classList.remove('has-placeholder-hidden');
    };
  });
});
```