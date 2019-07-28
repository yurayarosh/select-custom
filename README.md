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

selects.forEach((el) => {
  const select = new Select(el, {
    // some options
  });
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