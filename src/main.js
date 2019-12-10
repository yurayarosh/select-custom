import './polyfill';
import { offset, BEMblock } from './helpers';
import constants from './constants';
import defaultParams from './defaultParameters';
import _createElements from './components/_createElements';
import _open from './components/_open';
import _close from './components/_close';
import _change from './components/_change';
import _trigerCustomEvents from './components/_triggerCustomEvents';
import _destroy from './components/_destroy';

export default class Select {
  constructor(el, options) {
    this.el = el;
    this.options = {...defaultParams, ...options};
    this.constants = constants;
  };

  init() {
    _createElements.call(this);
    _open.call(this);
    _close.call(this);
    _change.call(this);
    _trigerCustomEvents.call(this);
  };

  destroy() {
    _destroy.call(this);
  };

  get select() {
    return this.el.parentNode;
  };

  get opener() {
    return this.select.querySelector('.'+this.constants.opener);
  };

  get panel() {
    return this.select.querySelector('.'+this.constants.panel);
  };

  dispatchEvent(el) {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('change', true, false);
    el.dispatchEvent(event);
  };

  triggerCheckbox(customOption) {
    const checkbox = customOption.querySelector('input[type="checkbox"]');
    const condition = BEMblock(customOption, this.constants.option).containsMod(this.constants.IS_SELECTED);

    if (checkbox && condition) checkbox.checked = true;
    if(checkbox && !condition) checkbox.checked = false;
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

    const allOpenSelects = document.querySelectorAll(`.${this.constants.wrap}--${this.constants.IS_OPEN}`);

    BEMblock(this.select, this.constants.wrap).toggleMod(this.constants.IS_OPEN);
    for (let i = 0; i < allOpenSelects.length; i++) {
      BEMblock(allOpenSelects[i], this.constants.wrap).removeMod(this.constants.IS_OPEN);
    };

    this.setPanelPosition();
  };  

  closeSelect(e) {
    if(document.documentElement.classList.contains(this.constants.HAS_UNUSED_CLOSE_FUNCTION)) {
      console.warn('You have unused `closeSelect` function, triggering on document click and `Esc` button. You shoud remove it, by using `destroy()` method to the first select element.');
    };

    if(e.type && e.type === 'keydown' && e.keyCode && e.keyCode !== 27) return;    

    if (!document.documentElement.classList.contains(this.constants.HAS_CUSTOM_SELECT)) {
      return;
    };

    if (e.target.closest(`[${this.constants.DATA_LABEL_INDEX}]`)) {
      return;
    };

    
    const allOpenSelects = document.querySelectorAll(`.${this.constants.wrap}--${this.constants.IS_OPEN}`);
    if (!allOpenSelects.length) return;


    if (e.type && e.type === 'click' && e.target.closest(`.${this.constants.wrap}--${this.constants.IS_DISABLED}`)) return;

    if (e.type && e.type === 'click' && e.target.closest(`.${this.constants.option}--${this.constants.IS_DISABLED}`)) return;

    if (e.type && e.type === 'click' && e.target.hasAttribute(this.constants.DATA_LABEL)) return;
    
    if (e.type && e.type === 'click' && e.target.closest('.'+this.constants.wrap)) {
      const elem = e.target.closest('.'+this.constants.wrap).querySelector('select');
     
      if (elem.multiple) {
        if (e.type && e.type === 'click' && e.target.closest('.'+this.constants.panel)) return;
      };

      if (elem.hasAttribute(this.constants.DATA_ALLOW_PANEL_CLICK)) {
        if (e.type && e.type === 'click' && e.target.closest('.'+this.constants.panel)) return;
      };

      if (elem.hasAttribute(this.constants.DATA_HAS_PANEL_ITEM)) {
        if (e.type && e.type === 'click' && e.target.closest('.'+this.constants.panelItemClassName)) return;
      };       
    };
    if (e.target.className.indexOf(this.constants.opener) === -1) {
      for (let i = 0; i < allOpenSelects.length; i++) {
        BEMblock(allOpenSelects[i], this.constants.wrap).removeMod(this.constants.IS_OPEN);
      };
    };
  };

  setSelectedOptionsMultiple({clickedCustomOption, nativeOptionsList, item}) {
    if (nativeOptionsList[item].selected) {      
      nativeOptionsList[item].selected = false;
      BEMblock(clickedCustomOption, this.constants.option).removeMod(this.constants.IS_SELECTED);
    } else {
      nativeOptionsList[item].selected = true;
      BEMblock(clickedCustomOption, this.constants.option).addMod(this.constants.IS_SELECTED);
    };
  };

  setSelectedOptionsDefault({clickedCustomOption, nativeOptionsList, customOptionsList, item}) {
    for (let i = 0; i < nativeOptionsList.length; i++) {
      const checkbox = customOptionsList[i].querySelector('input[type="checkbox"]');

      nativeOptionsList[i].selected = false;
      BEMblock(customOptionsList[i], this.constants.option).removeMod(this.constants.IS_SELECTED);
      if (checkbox) checkbox.checked = false;
    };
    const checkbox = clickedCustomOption.querySelector('input[type="checkbox"]');
    BEMblock(clickedCustomOption, this.constants.option).addMod(this.constants.IS_SELECTED);
    nativeOptionsList[item].selected = true;
    if (checkbox) checkbox.checked = true;
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
    const panelBottom = offset(this.panel).top + this.panel.offsetHeight;

    if (panelBottom >= window.innerHeight) {
      BEMblock(this.panel, this.constants.panel).addMod(this.constants.IS_ABOVE)
    } else {
      BEMblock(this.panel, this.constants.panel).removeMod(this.constants.IS_ABOVE)
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

    if (BEMblock(customOption, this.constants.option).containsMod(this.constants.IS_SELECTED)) {
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
      const targetOptions = [].slice.call(this.select.querySelectorAll(`[${this.constants.DATA_LABEL_INDEX}="${name}"]`));
      const targetCustomOptionArr = targetOptions.filter(el => {
        if(el.classList.contains(this.constants.option)) return el;
      });
      const targetCustomOption = targetCustomOptionArr[0];


      targetOptions.forEach((option) => {
        if (option.selected) {
          option.selected = false;
        };
        if (BEMblock(option, this.constants.option).containsMod(this.constants.IS_SELECTED)) {
          BEMblock(option, this.constants.option).removeMod(this.constants.IS_SELECTED);
        };
      });

      this.dispatchEvent(this.el);
      
      this.triggerCheckbox(targetCustomOption);
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
};
