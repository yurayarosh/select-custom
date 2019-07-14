// commands
// rollup -c -w watch files
// rollup -c - bundle files

import Select from './main.js';

const selects = [...document.querySelectorAll('.js-select')];

let select;

const selectObjects = [];

selects.forEach((selectEl) => {
  const name = selectEl.getAttribute('data-type');
  const options = {
    multiple: {
      multipleSelectOpenerText: { labels: true }
    },
    default: {
      allowPanelClick: false,
      wrapDataAttributes: true,
      panelItem: {
        position: 'top',
        item: '<input type="text" />'
      }
    }
  };
  select = new Select(selectEl, options[name]);
  select.init();
  selectObjects.push(select);

  selectEl.addEventListener('change', (e) => {
    // console.log(e.currentTarget.value);
  });

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

// buttons
  const btns = {
    init: document.querySelector('.js-init'),
    refresh: document.querySelector('.js-refresh'),
    destroy: document.querySelector('.js-destroy')
  };

  const events = Object.keys(btns);

  Object.values(btns).forEach((btn, i) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (events[i] === 'destroy') {
          selectObjects.forEach(select => {
            select.destroy();
          });
        
      } else if (events[i] === 'refresh') {
        select.refresh();
      } else if (events[i] === 'init') {
        
        selectObjects.forEach((select) => {
          select.init();
        })
      }
    });
  });

