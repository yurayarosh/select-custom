// commands
// rollup -c -w watch files
// rollup -c - bundle files

import Select from './main.js';

const selects = [...document.querySelectorAll('.js-select')];

selects.forEach((selectEl) => {
  const name = selectEl.getAttribute('data-type');
  const options = {
    multiple: {
      multipleSelectOpenerText: { labels: true }
    }
  };
  const select = new Select(selectEl, options[name]);
  select.init();

  selectEl.addEventListener('change', (e) => {
    console.log(e.currentTarget.value);
  });


});