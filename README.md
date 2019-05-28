# select-custom

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
  closeOnMouseleave: false
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