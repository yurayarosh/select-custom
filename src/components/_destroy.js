import * as helpers from '../helpers';

export default function _destroy() {
    if(this.select.classList.contains(this.constants.wrap)) {
      this.opener.parentNode.removeChild(this.opener);
      this.panel.parentNode.removeChild(this.panel);
      helpers.unwrap(this.select);
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