# select-custom

### Example

  * [Codesandbox](https://codesandbox.io/s/krcji)

### Install

```html
npm i select-custom -D
```

```html
<select class="js-select">
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</select>
```

```js
import Select from 'select-custom';

const selects = [].slice.call(document.querySelectorAll('.js-select'));

selects.forEach(function(el) {
  const select = new Select(el, { options });
  select.init();
});
```

### Options

Standart options
```js
{
  optionBuilder: false,
  panelItem: false,
  changeOpenerText: true,
  multipleSelectionOnSingleClick: true,
  multipleSelectOpenerText: { labels: false, array: false },
  allowPanelClick: false,
  openOnHover: false,
  closeOnMouseleave: false,
  wrapDataAttributes: false
}
```

`optionBuilder` - function with arguments `option, customOption` allows add elements to custom option.

`panelItem` - options: `{ item: element or string, position: 'top', className: '' }`, `{ item: element or string, position: 'bottom', className: '' }`- add element in custom panel above or under options.

`changeOpenerText` - if `false` - text in opener panel won't change.

If native select has attribute `multiple` - select allows multiple selection.

`multipleSelectionOnSingleClick` - if `true` - allows multiple selection witout CTRL button.

`multipleSelectOpenerText` - if `{ array: true }` - in opener pannel will be added array with selected options text, if `{ labels: true }` - in opener pannel will be added span elements with button and option text.

`allowPanelClick` - if `true` - option panel won't close on selection.

`openOnHover` - if `true` - allows open on hover.

`closeOnMouseleave` - if `true` - allows close on mouseleave.

`wrapDataAttributes` - if `true` - data attributes from native `select` element will be added to custom wrap.

Supports standart attributs `multiple`, `disabled`, `disabled` for `option`.

### Events

Native select
```js
const select = new Select(el, { options });
select.init();

el.addEventListener('change', (e) => {
  // some function
});

```

### Methods

On open and on close custom select
```js
const select = new Select(el, { options });

select.onOpen = (select) => {
  // some function
};

select.onClose = (select) => {
  // some function
};

select.init();

```
Destroy method (for proper using watch example on [Codesandbox](https://codesandbox.io/s/krcji))
```js
select.destroy();
```

### Example

```js
const selects = [].slice.call(document.querySelectorAll('.js-select'));

// create input to add in panel
const panelInput = document.createElement('input');
panelInput.type = 'text';

// adding colored square in option
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

  // adding placeholder
  const wrap = selectEl.parentNode;
  const opener = wrap.querySelector('.custom-select__opener');  

  const HAS_PLACEHOLDER = 'has-placeholder';
  let placeholder;

  [].slice.call(selectEl.options).forEach((option) => {
    if (option.value === 'placeholder') {
      placeholder = option.innerText;
      wrap.classList.add(HAS_PLACEHOLDER);
      if (selectEl.multiple) {
        opener.innerText = placeholder;
      };
    };
  });

  selectEl.addEventListener('change', (e) => {
    if (e.currentTarget.value !== 'placeholder') {
      wrap.classList.remove(HAS_PLACEHOLDER);
    };
    if (!e.currentTarget.value) {
      wrap.classList.add(HAS_PLACEHOLDER);
      opener.innerText = placeholder;
    };
  });
});
```