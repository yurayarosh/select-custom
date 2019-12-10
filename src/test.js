import  Select  from './main';
import addOptionIcons from './test-components/addOptionIcons';
import addSelectsPlaceholder from './test-components/addSelectsPlaceholder';
import filterSearch from './test-components/filterSearch';

class CustomSelect extends Select {
  constructor(select, params) {
    super(select, params);
    this.name = select.dataset.type;    
  }

  getElements() {
    this.panelOptions = [
      ...this.select.querySelectorAll('.custom-select__option')
    ];
    this.input = this.select.querySelector('.js-search');
  }

  onOpen() {
    console.log('open');
    
  }

  onClose() {
    console.log('close');
    
  }

  init() {
    if (
      this.select.classList &&
      this.select.classList.contains('custom-select')
    ) {
      return;
    }
    super.init();

    // ================ custom function ======================
    this.getElements();
    addSelectsPlaceholder.call(this);
    filterSearch.call(this);
    // ================ custom function ======================
  }
}

function setSelects() {
  const selects = [...document.querySelectorAll('.js-select')];
  if (!selects.length) return;

  const customSelectObjects = [];

  const params = {
    default: {},
    multiple: {
      multipleSelectOpenerText: { labels: true },
      optionBuilder: (option, customOption) => {
        const inner = customOption.innerHTML;
        if (customOption.dataset.value === 'placeholder') {
          customOption.innerHTML = inner;
        } else {
          customOption.innerHTML = `<input type="checkbox" /> ${inner}`;
        }
      }
    },
    with_input: {
      panelItem: {
        position: 'top',
        item:
          '<input type="text" class="js-search" placeholder="This is search input" />'
      }
    },
    whith_icons: {
      optionBuilder: addOptionIcons
    }
  };

  selects.forEach(select => {
    const name = select.dataset.type;
    const customSelect = new CustomSelect(select, params[name]);
    customSelect.init();
    customSelectObjects.push(customSelect);
  });

  // ================ example of destroy and reinit methods ======================
  const destroyFirst = document.querySelector('.js-destroy-first');
  const destroyAll = document.querySelector('.js-destroy-all');
  const initAll = document.querySelector('.js-init-all');

  destroyFirst.addEventListener('click', e => {
    e.preventDefault();
    customSelectObjects[0].destroy();
  });

  destroyAll.addEventListener('click', e => {
    e.preventDefault();
    customSelectObjects.forEach(select => {
      select.destroy();
    });
    // to remove close function, triggering on document click
    customSelectObjects[0].destroy();
  });

  initAll.addEventListener('click', e => {
    e.preventDefault();
    customSelectObjects.forEach(customSelect => {
      customSelect.init();
    });
  });
}
setSelects();
