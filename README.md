# select-custom

### Example

  * [Codesandbox](https://codesandbox.io/s/krcji)

### Install

```html
npm i select-custom
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

const selects = [...document.querySelectorAll('.js-select')];

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
  optionBuilder: undefined,
  panelItem: { position: '', item: '', className: '' },
  changeOpenerText: true,
  multipleSelectionOnSingleClick: true,
  multipleSelectOpenerText: { labels: false, array: false },
  allowPanelClick: false,
  openOnHover: false,
  closeOnMouseleave: false,
  wrapDataAttributes: false,
  openerLabel: false,
}
```

`optionBuilder` - `function`  arguments `option, customOption` allows add elements to custom option.

`panelItem` - `object` options: `{ item: element or string, position: 'top', className: '' }`, `{ item: element or string, position: 'bottom', className: '' }`- add element in custom panel above or under options.

`changeOpenerText` - `boolean` if `false` - text in opener panel won't change.

If native select has attribute `multiple` - select allows multiple selection.

`multipleSelectionOnSingleClick` - `boolean` if `true` - allows multiple selection witout CTRL button.

`multipleSelectOpenerText` - if `{ array: true }` - in opener pannel will be added array with selected options text, if `{ labels: true }` - in opener pannel will be added span elements with button and option text.

`allowPanelClick` - `boolean` if `true` - option panel won't close on selection.

`openOnHover` - `boolean` if `true` - allows open on hover.

`closeOnMouseleave` - `boolean` if `true` - allows close on mouseleave.

`wrapDataAttributes` - `boolean` if `true` - data attributes from native `select` element will be added to custom wrap.

`openerLabel` - `boolean` add span inner to custom opener.

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