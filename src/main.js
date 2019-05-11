import './polyfill';
import * as helpFunctions from './helpFunctions';

class Select {
  constructor(el, options) {
    this.el = el;
    this.defaultParams = {
      optionBuilder: false,
      panelItem: false,
      changeOpenerText: true,
      multipleSelectionOnSingleClick: false,
      multipleSelectOpenerText: false,
      allowPanelClick: false,
      openOnHover: false,
      closeOnMouseleave: false
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
      closeOnMouseleave: options.closeOnMouseleave
    };
    this.constants = {
      wrap: 'custom-select',
      opener: 'custom-select__opener',
      panel: 'custom-select__panel',
      option: 'custom-select__option',
      optionsWrap: 'custom-select__options',
      optgroup: 'custom-select__optgroup',
      panelItemClassName: 'custom-select__panel-item',
      IS_OPEN: 'is-open',
      IS_DISABLED: 'is-disabled',
      IS_MULTIPLE: 'is-multiple',
      IS_SELECTED: 'is-selected',
      IS_ABOVE: 'is-above',
      HAS_CUSTOM_SELECT: 'has-custom-select',
      DATA_ALLOW_PANEL_CLICK: 'data-allow-panel-click',
      DATA_LABEL: 'data-label',
      DATA_VALUE: 'data-value',
      DATA_HAS_PANEL_ITEM: 'data-has-panel-item'
    };
    this.isTouch = helpFunctions.detectTouch();
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

  refresh() {
    this.destroy();
    this.init();
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

  addOptionItem(option, customOption) {
    if (this.options.optionBuilder) {
      this.options.optionBuilder(option, customOption);
    };
  };

  openSelect(e) {
    if (this.el.disabled) return;

    const allOpenSelects = document.querySelectorAll('.'+this.constants.wrap+'.'+this.constants.IS_OPEN);

    this.select().classList.toggle(this.constants.IS_OPEN);
    for (let i = 0; i < allOpenSelects.length; i++) {
      allOpenSelects[i].classList.remove(this.constants.IS_OPEN);
    };

    this.setPanelPosition();

    if (this.onOpen && this.select().classList.contains(this.constants.IS_OPEN)) {
      this.onOpen(this.el);
    } else {
      if (this.onClose) {
        this.onClose(this.el);
      };
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

    if (this.onClose && e.target.className.indexOf(this.constants.opener)) {
      let elem = allOpenSelects[0].querySelector('select');
      if (allOpenSelects.length > 1) {
        console.warn('`onClose()` function does not have an argument due to several selects are open.');
        return;
      };
      this.onClose(elem);
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
    const result = [];
    let opt;

    for (let i = 0; i < options.length; i++) {
      opt = options[i];
      if (opt.selected) {
        result.push(opt.text);
      };
    };
    return result.join(', ');
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

    if (this.options.panelItem.position === 'top') {
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
      for (let i = 0; i < options.length; i++) {
        const customOption = document.createElement('div');
        customOption.classList.add(this.constants.option);
        customOption.innerHTML = options[i].innerHTML;
        customOption.setAttribute(this.constants.DATA_VALUE, options[i].value);

        this.addDataAttributes(options[i], customOption);

        if (options[i].selected) {
          customOption.classList.add(this.constants.IS_SELECTED);
          opener.innerHTML = options[i].innerHTML;
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

      if (optionsWrap) {
        panel.appendChild(optionsWrap);
      };
    };

    if (this.options.panelItem.position === 'bottom') {
      panel.appendChild(panelItemWrap);
    };

    if (this.options.allowPanelClick) {
      this.el.setAttribute(this.constants.DATA_ALLOW_PANEL_CLICK, '');
    };   

    wrap.classList.add(this.constants.wrap);
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
   
        const event = document.createEvent('HTMLEvents');
        event.initEvent('change', true, false);
        this.el.dispatchEvent(event);

        if (this.options.changeOpenerText) {
          if (this.el.multiple && this.options.multipleSelectOpenerText) {
            if (this.getSelectOptionsText(this.el)) {
              this.opener().innerText = this.getSelectOptionsText(this.el);
            };            
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
