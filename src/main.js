import './polyfill';
import * as helpFunctions from './helpFunctions';

export default class Select {
  constructor(el, options) {
    this.el = el;
    this.defaultParams = {
      optionBuilder: false,
      panelItem: { position: '', item: '', className: '' },
      changeOpenerText: true,
      multipleSelectionOnSingleClick: true,
      multipleSelectOpenerText: { labels: false, array: false },
      allowPanelClick: false,
      openOnHover: false,
      closeOnMouseleave: false,
      wrapDataAttributes: false
    };
    options = Object.assign({}, this.defaultParams, options);
    this.options = {
      optionBuilder: options.optionBuilder,
      panelItem: options.panelItem,
      changeOpenerText: options.changeOpenerText,
      multipleSelectionOnSingleClick: options.multipleSelectionOnSingleClick,
      multipleSelectOpenerText: options.multipleSelectOpenerText,
      allowPanelClick: options.allowPanelClick,
      openOnHover: options.openOnHover,
      closeOnMouseleave: options.closeOnMouseleave,
      wrapDataAttributes: options.wrapDataAttributes,
    };
    this.constants = {
      wrap: 'custom-select',
      opener: 'custom-select__opener',
      panel: 'custom-select__panel',
      option: 'custom-select__option',
      optionsWrap: 'custom-select__options',
      optgroup: 'custom-select__optgroup',
      panelItemClassName: 'custom-select__panel-item',
      openerLabel: 'custom-select__opener-label',
      IS_OPEN: 'is-open',
      IS_DISABLED: 'is-disabled',
      IS_MULTIPLE: 'is-multiple',
      IS_SELECTED: 'is-selected',
      IS_ABOVE: 'is-above',
      HAS_CUSTOM_SELECT: 'has-custom-select',
      HAS_UNUSED_CLOSE_FUNCTION: 'has-unused-close-custom-select-function',
      DATA_ALLOW_PANEL_CLICK: 'data-allow-panel-click',
      DATA_LABEL: 'data-label',
      DATA_VALUE: 'data-value',
      DATA_HAS_PANEL_ITEM: 'data-has-panel-item',
      DATA_LABEL_INDEX: 'data-label-index'
    };
    this.isTouch = helpFunctions.detectTouch();
  };

  init() {
    this._createElements();
    this._open();
    this._close();
    this._change();
    this._trigerCustomEvents();
  };

  destroy() {
    this._destroy();
  };

  select() {
    return this.el.parentNode;
  };

  opener() {
    return this.select().querySelector('.'+this.constants.opener);
  };

  panel() {
    return this.select().querySelector('.'+this.constants.panel);
  };

  dispatchEvent(el) {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('change', true, false);
    this.el.dispatchEvent(event);
  };

  addOptionItem(option, customOption) {
    if (this.options.optionBuilder) {
      this.options.optionBuilder(option, customOption);
    };
  };

  openSelect(e) {
    if (this.el.disabled) return;

    if (e.target.closest(`[${this.constants.DATA_LABEL_INDEX}]`)) {
      return;
    };

    const allOpenSelects = document.querySelectorAll('.'+this.constants.wrap+'.'+this.constants.IS_OPEN);

    this.select().classList.toggle(this.constants.IS_OPEN);
    for (let i = 0; i < allOpenSelects.length; i++) {
      allOpenSelects[i].classList.remove(this.constants.IS_OPEN);
    };

    this.setPanelPosition();
  };  

  closeSelect(e) {
    if(document.documentElement.classList.contains(this.constants.HAS_UNUSED_CLOSE_FUNCTION)) {
      console.warn('You have unused `closeSelect` function, triggering on document click. You shoud remove it, by using `destroy()` method to the first select element.');
    };
    if (!document.documentElement.classList.contains(this.constants.HAS_CUSTOM_SELECT)) {
      return;
    };

    if (e.target.closest(`[${this.constants.DATA_LABEL_INDEX}]`)) {
      return;
    };

    const allOpenSelects = document.querySelectorAll('.'+this.constants.wrap+'.'+this.constants.IS_OPEN);
    if (!allOpenSelects.length) return;   

    function checkTarget(e, className) {
      if (e.target.classList && e.target.classList.contains(className) || e.target.closest('.'+className)) {
        return true;
      };
    };    

    if (e.target.closest('.'+this.constants.IS_DISABLED)) return;

    if (e.target.hasAttribute(this.constants.DATA_LABEL)) return;
    
    if (e.target.closest('.'+this.constants.wrap)) {
      const elem = e.target.closest('.'+this.constants.wrap).querySelector('select');
     
      if (elem.multiple) {
        if(checkTarget(e, this.constants.panel)) return;
      };

      if (elem.hasAttribute(this.constants.DATA_ALLOW_PANEL_CLICK)) {
        if (checkTarget(e, this.constants.panel)) return;
      };

      if (elem.hasAttribute(this.constants.DATA_HAS_PANEL_ITEM)) {
        if (checkTarget(e, this.constants.panelItemClassName)) return;
      };       
    };
    if (e.target.className.indexOf(this.constants.opener) === -1) {
      for (let i = 0; i < allOpenSelects.length; i++) {
        allOpenSelects[i].classList.remove(this.constants.IS_OPEN);
      };
    };    
  };

  setSelectedOptionsMultiple({clickedCustomOption, nativeOptionsList, item}) {
    if (nativeOptionsList[item].selected) {
      nativeOptionsList[item].selected = false;
      clickedCustomOption.classList.remove(this.constants.IS_SELECTED);
    } else {
      nativeOptionsList[item].selected = true;
      clickedCustomOption.classList.add(this.constants.IS_SELECTED);
    };
  };

  setSelectedOptionsDefault({clickedCustomOption, nativeOptionsList, customOptionsList, item}) {
    for (let i = 0; i < nativeOptionsList.length; i++) {
      nativeOptionsList[i].selected = false;
      customOptionsList[i].classList.remove(this.constants.IS_SELECTED);
    };
    clickedCustomOption.classList.add(this.constants.IS_SELECTED);
    nativeOptionsList[item].selected = true;
  };

  setSelectedOptions({e, clickedCustomOption ,nativeOptionsList, customOptionsList, item}) {
    if (this.el.multiple) {
      if (this.options.multipleSelectionOnSingleClick || e.ctrlKey) {
        this.setSelectedOptionsMultiple({
          clickedCustomOption,
          nativeOptionsList,
          item
        });
      } else {
        this.setSelectedOptionsDefault({
          clickedCustomOption,
          nativeOptionsList,
          customOptionsList,
          item
        });
      };
    } else {
      this.setSelectedOptionsDefault({
        clickedCustomOption,
        nativeOptionsList,
        customOptionsList,
        item
      });
    };
  };

  setPanelPosition() {
    const panelBottom = helpFunctions.offset(this.panel()).top + this.panel().offsetHeight;

    if (panelBottom >= window.innerHeight) {
      this.panel().classList.add(this.constants.IS_ABOVE);
    } else {
      this.panel().classList.remove(this.constants.IS_ABOVE);
    };
  };

  getSelectOptionsText(select) {    
    const options = [].slice.call(select.options);
    const result = [];

    options.forEach((option) => {
      if (option.selected) {
        result.push(option.innerText);
      };
    });
    
    return result.join(', ');
  };

  setSelectOptionsItems(customOption, select, opener) {
    const customOptions = [].slice.call(customOption.parentNode.children);
    const options = [].slice.call(select.options);

    const labels = customOptions.map((option, i) => {
      const label = document.createElement('span');
      label.className = this.constants.openerLabel;
      label.setAttribute(this.constants.DATA_LABEL_INDEX, i);
      label.innerHTML = `${option.innerText}<button></button>`;

      return label;
    });

    customOptions.forEach((option, i) => {
      option.setAttribute(this.constants.DATA_LABEL_INDEX, i);
    });

    options.forEach((option, i) => {
      option.setAttribute(this.constants.DATA_LABEL_INDEX, i);
    });

    const index = +customOption.getAttribute(this.constants.DATA_LABEL_INDEX);
    const currentLabel = opener.querySelector(`[${this.constants.DATA_LABEL_INDEX}="${index}"]`);

    if (customOption.classList.contains(this.constants.IS_SELECTED)) {
      if (!opener.children.length) {
        opener.innerHTML = '';
      };
      opener.appendChild(labels[index]);
    } else {
      if (currentLabel) {
        opener.removeChild(currentLabel);
      };      
    };

    function removeLabel(e) {
      e.preventDefault();
      const label = e.currentTarget.parentNode;
      const name = label.getAttribute(this.constants.DATA_LABEL_INDEX);
      const targetOptions = [].slice.call(this.select().querySelectorAll(`[${this.constants.DATA_LABEL_INDEX}="${name}"]`));

      targetOptions.forEach((option) => {
        if (option.selected) {
          option.selected = false;
        };
        if (option.classList.contains(this.constants.IS_SELECTED)) {
          option.classList.remove(this.constants.IS_SELECTED)
        };
      });

      this.dispatchEvent(this.el);
      if (label.parentNode) {
        label.parentNode.removeChild(label);
      };            
    };

    labels.forEach((label) => {
      label.querySelector('button').addEventListener('click', removeLabel.bind(this));
    });
  };

  addDataAttributes(el, targetEl) {
    const dataAttributes = [].filter.call(el.attributes, (at) => {
      return /^data-/.test(at.name);
    });

    if (dataAttributes.length) {
      dataAttributes.forEach((attribute) => {
        targetEl.setAttribute(attribute.name, attribute.value);
      });          
    };
  };

  _trigerCustomEvents() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.target.classList.contains(this.constants.IS_OPEN)) {
          if (mutation.oldValue.indexOf(this.constants.IS_OPEN) === -1) {
            if (this.onOpen) {
              this.onOpen(mutation.target);
            };
          };          
        } else if (mutation.oldValue.indexOf(this.constants.IS_OPEN) > 0) {
          this.panel().classList.remove(this.constants.IS_ABOVE);
          if (this.onClose) {
            this.onClose(mutation.target);
          };
        };
        
      });
    });
    observer.observe(this.select(), { attributes: true, attributeOldValue: true, attributeFilter: ['class'] });
  };

  _createElements() {
    const wrap = document.createElement('div');
    const panel = document.createElement('div');
    const opener = document.createElement('div');
    const options = this.el.options;
    const optgroups = this.el.querySelectorAll('optgroup');
    let panelItem;
    let panelItemWrap;
    let optionsWrap;

    if (this.options.panelItem.item) {
      panelItemWrap = document.createElement('div');
      optionsWrap = document.createElement('div');
      optionsWrap.className = this.constants.optionsWrap;
      panelItemWrap.className = this.constants.panelItemClassName;

      this.el.setAttribute(this.constants.DATA_HAS_PANEL_ITEM, '');
      
      if (typeof this.options.panelItem.item === 'object') {
        panelItem = this.options.panelItem.item.cloneNode(true);
        panelItem.className = this.options.panelItem.className ? this.options.panelItem.className : '';
        panelItemWrap.appendChild(panelItem);
      };
      if (typeof this.options.panelItem.item === 'string') {
        panelItemWrap.innerHTML = this.options.panelItem.item;
      };      
    };

    if (panelItemWrap && this.options.panelItem.position === 'top') {
      panel.appendChild(panelItemWrap);
    };

    if (optgroups.length > 0) {
      for (let i = 0; i < optgroups.length; i++) {
        const title = optgroups[i].label;
        const optionsInGroup = optgroups[i].querySelectorAll('option');
        const customOptgroup = document.createElement('div');
        
        for (let j = 0; j < optionsInGroup.length; j++) {
          const customOption = document.createElement('div');
          customOption.classList.add(this.constants.option);
          customOption.setAttribute(this.constants.DATA_VALUE, optionsInGroup[j].value);
          customOption.innerHTML = optionsInGroup[j].innerHTML;

          this.addDataAttributes(optionsInGroup[j], customOption);

          if (optionsInGroup[j].selected) {
            customOption.classList.add(this.constants.IS_SELECTED);
            opener.innerHTML = optionsInGroup[j].innerHTML;
          };
          if (optionsInGroup[j].disabled) {
            customOption.classList.add(this.constants.IS_DISABLED);
          };
          this.addOptionItem(optionsInGroup[j], customOption);
          customOptgroup.appendChild(customOption);
        }; 

        customOptgroup.classList.add(this.constants.optgroup);
        customOptgroup.setAttribute(this.constants.DATA_LABEL, title);

        this.addDataAttributes(optgroups[i], customOptgroup);

        if (optionsWrap) {
          optionsWrap.appendChild(customOptgroup);
          
        } else {
          panel.appendChild(customOptgroup);
        };
      };

      if (optionsWrap) {
        panel.appendChild(optionsWrap);
      };
    } else {
      const selectedOptions = [];

      for (let i = 0; i < options.length; i++) {
        const customOption = document.createElement('div');
        customOption.classList.add(this.constants.option);
        customOption.innerHTML = options[i].innerHTML;
        customOption.setAttribute(this.constants.DATA_VALUE, options[i].value);

        this.addDataAttributes(options[i], customOption);

        if (this.el.multiple) {
          if (options[i].selected) {
            customOption.classList.add(this.constants.IS_SELECTED);
            selectedOptions.push(customOption);            
          };
        } else {
          if (options[i].selected) {
            customOption.classList.add(this.constants.IS_SELECTED);
            opener.innerHTML = options[i].innerHTML;
          };
        };
        
        if (options[i].disabled) {
          customOption.classList.add(this.constants.IS_DISABLED);
        };
        this.addOptionItem(options[i], customOption);

        if (optionsWrap) {
          optionsWrap.appendChild(customOption);
        } else {
          panel.appendChild(customOption);
        };
      };

      if (selectedOptions.length > 0) {
        const texts = selectedOptions.map(option => {
          return option.innerText;
        });

        if (this.options.multipleSelectOpenerText.array) {
          opener.innerHTML = texts;
        };

        if (this.options.multipleSelectOpenerText.labels) {
          selectedOptions.forEach(option => {
            this.setSelectOptionsItems(option, this.el, opener);
          });
        };
      };

      if (optionsWrap) {
        panel.appendChild(optionsWrap);
      };
    };

    if (panelItemWrap && this.options.panelItem.position === 'bottom') {
      panel.appendChild(panelItemWrap);
    };

    if (this.options.allowPanelClick) {
      this.el.setAttribute(this.constants.DATA_ALLOW_PANEL_CLICK, '');
    };   

    wrap.classList.add(this.constants.wrap);
    if (this.options.wrapDataAttributes) {
      this.addDataAttributes(this.el, wrap);
    };    

    function addWrapClassName(condition, className) {
      if (condition) {
        wrap.classList.add(className);
      };
    };
    addWrapClassName(this.el.disabled, this.constants.IS_DISABLED);
    addWrapClassName(this.el.multiple, this.constants.IS_MULTIPLE);
    
    panel.classList.add(this.constants.panel);
    opener.classList.add(this.constants.opener);
    helpFunctions.wrap(this.el, wrap);
    wrap.appendChild(opener);
    wrap.appendChild(panel);
  };  

  _open() {
    const openEvent = this.options.openOnHover && !this.isTouch ? 'mouseenter' : 'click';
    this.openSelectBind = this.openSelect.bind(this);

    this.opener().addEventListener(openEvent, this.openSelectBind);
  };

  _close() {
    if (this.options.closeOnMouseleave && !this.isTouch) {
      this.select().addEventListener('mouseleave', (e) => {
        document.body.click();
      });
    };

    if (document.documentElement.classList.contains(this.constants.HAS_CUSTOM_SELECT)) return;

    this.closeSelectBind = this.closeSelect.bind(this);
    document.addEventListener('click', this.closeSelectBind);
    document.documentElement.classList.add(this.constants.HAS_CUSTOM_SELECT);

    this.closeSelectAdded = true;
  };

  _change() {
    const options = this.el.options;
    const customOptions = this.select().querySelectorAll('.'+this.constants.option);

    for (let i = 0; i < customOptions.length; i++) {
      customOptions[i].addEventListener('click', (e) => {
        if (this.el.disabled) return;
        
        const clickedCustomOption = e.currentTarget;
        if (clickedCustomOption.classList.contains(this.constants.IS_DISABLED)) return;

        this.setSelectedOptions({
          e,
          clickedCustomOption,
          nativeOptionsList: options,
          customOptionsList: customOptions,
          item: i
        });

        this.dispatchEvent(this.el);

        if (this.options.changeOpenerText) {
          if (this.el.multiple && this.options.multipleSelectOpenerText.array) {
            if (this.getSelectOptionsText(this.el)) {
              this.opener().innerHTML = this.getSelectOptionsText(this.el);
            };
          } else if (this.el.multiple && this.options.multipleSelectOpenerText.labels) {
            this.setSelectOptionsItems(clickedCustomOption, this.el, this.opener());
          } else if (this.el.multiple && !this.options.multipleSelectOpenerText) {
            this.opener().innerHTML = this.opener().innerHTML;
          } else {
            this.opener().innerHTML = clickedCustomOption.innerText;
          };
        };
      });
    };
  };

  _destroy() {
    if(this.select().classList.contains(this.constants.wrap)) {
      this.opener().parentNode.removeChild(this.opener());
      this.panel().parentNode.removeChild(this.panel());
      helpFunctions.unwrap(this.select());
      this.el.removeAttribute(this.constants.DATA_HAS_PANEL_ITEM);
      this.el.removeAttribute(this.constants.DATA_ALLOW_PANEL_CLICK);
    };    

    const elseSelects = document.querySelectorAll(`.${this.constants.wrap}`);

    if(!elseSelects.length) {      
      document.documentElement.classList.remove(this.constants.HAS_CUSTOM_SELECT);

      if (this.closeSelectAdded) {
        document.removeEventListener('click', this.closeSelectBind);
        document.documentElement.classList.remove(this.constants.HAS_UNUSED_CLOSE_FUNCTION);
      } else {
        document.documentElement.classList.add(this.constants.HAS_UNUSED_CLOSE_FUNCTION);
      }
    };
  };
};
