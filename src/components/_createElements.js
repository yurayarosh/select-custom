import { wrapElements }  from '../helpers';
import { BEMblock} from '../helpers'

export default function _createElements() {
  const wrap = document.createElement('div');
  const panel = document.createElement('div');
  const opener = document.createElement('div');
  
  const options = this.el.options;
  const optgroups = this.el.querySelectorAll('optgroup');
  let panelItem;
  let panelItemWrap;
  let optionsWrap;
  let openerLabel;

  if (this.options.openerLabel) {
    openerLabel = document.createElement('span');
    openerLabel.className = this.constants.openerLabel;
  } 

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
        this.addOptionItem(optionsInGroup[j], customOption);

        if (optionsInGroup[j].selected) {
          BEMblock(customOption, this.constants.option).addMod(this.constants.IS_SELECTED);
          if (openerLabel) {
            openerLabel.innerHTML = optionsInGroup[j].innerHTML;
          } else {
            opener.innerHTML = optionsInGroup[j].innerHTML;
          }          

          const checkbox = customOption.querySelector('input[type="checkbox"]');
          if (checkbox) checkbox.checked = true;
        };
        if (optionsInGroup[j].disabled) {
          BEMblock(customOption, this.constants.option).addMod(this.constants.IS_DISABLED);
        };
        
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
      this.addOptionItem(options[i], customOption);
      const checkbox = customOption.querySelector('input[type="checkbox"]');

      if (this.el.multiple) {
        if (options[i].selected) {
          BEMblock(customOption, this.constants.option).addMod(this.constants.IS_SELECTED);
          selectedOptions.push(customOption);
          if (openerLabel) {
            openerLabel.innerHTML = options[i].innerHTML;
          } else {
            opener.innerHTML = options[i].innerHTML;
          } 

          if(checkbox) checkbox.checked = true;
        };
      } else {
        if (options[i].selected) {
          BEMblock(customOption, this.constants.option).addMod(this.constants.IS_SELECTED);
          if (openerLabel) {
            openerLabel.innerHTML = options[i].innerHTML;
          } else {
            opener.innerHTML = options[i].innerHTML;
          } 
          
          if(checkbox) checkbox.checked = true;
        };
      };
      
      if (options[i].disabled) {
        BEMblock(customOption, this.constants.option).addMod(this.constants.IS_DISABLED);
      };
      

      if (optionsWrap) {
        optionsWrap.appendChild(customOption);
      } else {
        panel.appendChild(customOption);
      };
    };

    if(this.options.multipleSelectOpenerText.labels && this.options.openerLabel) {
      console.warn(
        'You set `multipleSelectOpenerText: { labels: true }` and `openerLabel: true` options to this select',
        this.el,
        "It doesn't work that way. You should change one of the options."
      );
    }

    if (selectedOptions.length > 0) {
      const texts = selectedOptions.map(option => {
        return option.innerText;
      });

      if (this.options.multipleSelectOpenerText.array) {
        if (openerLabel) {
          openerLabel.innerHTML = texts;
        } else {
          opener.innerHTML = texts;
        }        
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

  const addWrapClassName = (condition, mod) => {
    if (condition) BEMblock(wrap, this.constants.wrap).addMod(mod);
  };
  addWrapClassName(this.el.disabled, this.constants.IS_DISABLED);
  addWrapClassName(this.el.multiple, this.constants.IS_MULTIPLE);
  
  panel.classList.add(this.constants.panel);
  opener.classList.add(this.constants.opener);
  if (openerLabel) {
    opener.appendChild(openerLabel);
  }
  wrapElements(this.el, wrap);
  wrap.appendChild(opener);
  wrap.appendChild(panel);
}; 