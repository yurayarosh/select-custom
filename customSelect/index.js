import './polyfill';
import * as helpFunctions from './helpFunctions';

class Select {

  constructor(el, options) {
    this.el = el;
    this.defaultParams = {
      optionItem: false,
      panelItem: false,
      changeOpenerText: true,
      multipleSelectionOnSingleClick: false,
      multipleSelectOpenerText: false,
      allowPanelClick: false
    };
    options = Object.assign({}, this.defaultParams, options);
    this.options = {
      optionItem: options.optionItem,
      panelItem: options.panelItem,
      changeOpenerText: options.changeOpenerText,
      multipleSelectionOnSingleClick: options.multipleSelectionOnSingleClick,
      multipleSelectOpenerText: options.multipleSelectOpenerText,
      allowPanelClick: options.allowPanelClick
    };
    this.constants = {
      wrap: 'custom-select',
      opener: 'custom-select__opener',
      panel: 'custom-select__panel',
      option: 'custom-select__option',
      optgroup: 'custom-select__optgroup',
      panelItemClassName: 'custom-select__panel-item',
      IS_OPEN: 'is-open',
      IS_DISABLED: 'is-disabled',
      IS_SELECTED: 'is-selected',
      IS_ABOVE: 'is-above',
      HAS_CUSTOM_SELECT: 'has-custom-select',
      DATA_ALLOW_PANEL_CLICK: 'data-allow-panel-click',
      DATA_LABEL: 'data-label',
      DATA_VALUE: 'data-value',
      DATA_HAS_PANEL_ITEM: 'data-has-panel-item'
    };
  };

  init() {    
    this._createElements();
    this._open();
    this._close();
    this._change();
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

  addOptionItem(container) {
    if (this.constants.optionItem) {
      const item = this.constants.optionItem.cloneNode(true);
      container.appendChild(item);
    };
  };
  

  closeSelect(e) {
    const allOpenSelects = document.querySelectorAll('.'+this.constants.wrap+'.'+this.constants.IS_OPEN);
    if (!allOpenSelects.length) return;

    function checkTarget(e, className) {
      if (e.target.classList && e.target.classList.contains(className) || e.target.closest('.'+className)) {
        return true;
      };
    };
    const target = e.target.classList.contains(this.constants.panelItemClassName) || e.target.closest('.'+this.constants.panelItemClassName);

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
    const options = select && select.options;
    let result = [];
    let opt;

    for (let i = 0; i < options.length; i++) {
      opt = options[i];

      if (opt.selected) {
        result.push(opt.text);
      };
    };
    return result;
  };

  _createElements() {
    const wrap = document.createElement('div');
    const panel = document.createElement('div');
    const opener = document.createElement('div');
    const options = this.el.options;
    const optgroups = this.el.querySelectorAll('optgroup');
    let panelItem;
    if (this.options.panelItem.item) {
      this.el.setAttribute(this.constants.DATA_HAS_PANEL_ITEM, '');
      panelItem = this.options.panelItem.item.cloneNode(true);
      panelItem.classList.add(this.constants.panelItemClassName);
    };

    if (this.options.panelItem.position === 'top') {
      panel.appendChild(panelItem);
    };

    if (optgroups.length) {
      for (let i = 0; i < optgroups.length; i++) {
        const title = optgroups[i].label;
        const optionsInGroup = optgroups[i].querySelectorAll('option');
        const customOptgroup = document.createElement('div');
        
        for (let j = 0; j < optionsInGroup.length; j++) {
          const customOption = document.createElement('div');
          customOption.classList.add(this.constants.option);
          customOption.setAttribute(this.constants.DATA_VALUE, optionsInGroup[j].value);
          customOption.innerHTML = optionsInGroup[j].innerHTML;
          this.addOptionItem(customOption);
          customOptgroup.appendChild(customOption);
        }; 

        customOptgroup.classList.add(this.constants.optgroup);
        customOptgroup.setAttribute(this.constants.DATA_LABEL, title);
        
        panel.appendChild(customOptgroup);
      };
    } else {
      for (let i = 0; i < options.length; i++) {
        const customOption = document.createElement('div');
        customOption.classList.add(this.constants.option);
        customOption.innerHTML = options[i].innerHTML;
        customOption.setAttribute(this.constants.DATA_VALUE, options[i].value);
        if (options[i].selected) {
          customOption.classList.add(this.constants.IS_SELECTED);
        };
        this.addOptionItem(customOption);
        panel.appendChild(customOption);
      };
    };

    if (this.options.panelItem.position === 'bottom') {
      panel.appendChild(panelItem);
    };

    if (this.options.allowPanelClick) {
      this.el.setAttribute(this.constants.DATA_ALLOW_PANEL_CLICK, '');
    };   

    wrap.classList.add(this.constants.wrap);
    if (this.el.disabled) {
      wrap.classList.add(this.constants.IS_DISABLED);
    };
    panel.classList.add(this.constants.panel);
    opener.classList.add(this.constants.opener);
    opener.innerHTML = options[0].innerHTML;
    helpFunctions.wrap(this.el, wrap);
    wrap.appendChild(opener);
    wrap.appendChild(panel);
  };  

  _open() {    
    this.opener().addEventListener('click', (e) => {
      if (this.el.disabled) return;
      
      const allOpenSelects = document.querySelectorAll('.'+this.constants.wrap+'.'+this.constants.IS_OPEN);

      this.select().classList.toggle(this.constants.IS_OPEN);
      for (let i = 0; i < allOpenSelects.length; i++) {
        allOpenSelects[i].classList.remove(this.constants.IS_OPEN);
      };
      this.setPanelPosition();

    });    

  };

  _close() {    
    if (document.documentElement.classList.contains(this.constants.HAS_CUSTOM_SELECT)) return;

    this.closeSelectBind = this.closeSelect.bind(this);
    document.addEventListener('click', this.closeSelectBind);
    document.documentElement.classList.add(this.constants.HAS_CUSTOM_SELECT);
  };

  _change() {
    const options = this.el.options;
    const customOptions = this.select().querySelectorAll('.'+this.constants.option);
    for (let i = 0; i < customOptions.length; i++) {
      customOptions[i].addEventListener('click', (e) => {
        if (this.options.changeOpenerText) {
          this.opener().innerHTML = e.currentTarget.innerHTML;
        };       

        this.setSelectedOptions({
          e,
          clickedCustomOption: e.currentTarget,
          nativeOptionsList: options,
          customOptionsList: customOptions,
          item: i
        });
   
        const event = document.createEvent('HTMLEvents');
        event.initEvent('change', true, false);
        this.el.dispatchEvent(event);

        if (this.options.changeOpenerText) {
          if (this.el.multiple && this.options.multipleSelectOpenerText === 'array') {
            this.opener().innerHTML = this.getSelectOptionsText(this.el);
          } else if (this.el.multiple && !this.options.multipleSelectOpenerText) {
            this.opener().innerHTML = this.opener().innerHTML;
          } else {
            this.opener().innerHTML = e.currentTarget.innerHTML;
          };          
        };        

      });
    };
  };

  _destroy() {
    document.removeEventListener('click', this.closeSelectBind);
    document.documentElement.classList.remove(this.constants.HAS_CUSTOM_SELECT);
    if (this.panel() && this.opener()) {
      this.opener().parentNode.removeChild(this.opener());
      this.panel().parentNode.removeChild(this.panel());
      helpFunctions.unwrap(this.select());
    };
  };

};

module.exports = Select;
