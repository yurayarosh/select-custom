# customSelect

```html
<select class="js-select">
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</select>
```

```js
import Select from './lib/customSelect';

const selects = [].slice.call(document.querySelectorAll('.js-select'));

selects.forEach(function(el) {
  let select = new Select(el, {options});
  select.init();

  //destroy
  if (select) {
    select.destroy();
    select = null;
  };
});
```

### Опции

Стандартные опции
```js
{
  optionItem: false,
  panelItem: false,
  changeOpenerText: true,
  multipleSelectionOnSingleClick: false,
  multipleSelectOpenerText: false,
  allowPanelClick: false
}
```

`optionItem` - если передан дом елемент - добавляет его в кастомный елемент опции.

`panelItem` - варианты: `{element, 'top'}`, `{element, 'bottom'}`- добавляет елемент в кастомную панель поверх остальных или вниз соответственно.

`changeOpenerText` - если установлено `false` - при выборе опции текст в верхней панели меняться не будет.

Если нативному селекту установлен аттрибут `multiple` селект позволяет множественный выбор.

`multipleSelectionOnSingleClick` - если установлено `true` - позволяет множественный выбор без зажатой клавиши CTRL.

`multipleSelectOpenerText` - если установлено `'array'` - в верхнюю панель при выборе опций будет добавляться масив с их текстом, если установлено `false` - текст меняться не будет.

`allowPanelClick` - если установлено `true` - при клике на панель с опциями она будет оставаться открытой.

Поддерживает стандартные аттрибуты `multiple`, `disabled`.
