import * as helpers from '../helpers';

export default function _createElements() {
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

    if (this.options.panelItem.item.classList) {
      panelItem = this.options.panelItem.item.cloneNode(true);
      panelItem.className = this.options.panelItem.className ? this.options.panelItem.className : '';
      panelItemWrap.appendChild(panelItem);
    } else if (typeof this.options.panelItem.item === 'string') {
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
  helpers.wrap(this.el, wrap);
  wrap.appendChild(opener);
  wrap.appendChild(panel);
}; 