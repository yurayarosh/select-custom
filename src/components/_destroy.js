import { unwrap } from '../helpers';

export default function _destroy() {
    const selects = document.querySelectorAll(`.${this.constants.wrap}`) ;
    if(!selects.length
        && !document.documentElement.classList.contains(this.constants.HAS_UNUSED_CLOSE_FUNCTION)) {
      return;
    }        
    
    if(this.select.classList.contains(this.constants.wrap)) {
      this.opener.parentNode.removeChild(this.opener);
      this.panel.parentNode.removeChild(this.panel);
      unwrap(this.select);
      this.el.removeAttribute(this.constants.DATA_HAS_PANEL_ITEM);
      this.el.removeAttribute(this.constants.DATA_ALLOW_PANEL_CLICK);
    };    

    const elseSelects = document.querySelectorAll(`.${this.constants.wrap}`);

    if(!elseSelects.length) {
      document.documentElement.classList.remove(this.constants.HAS_CUSTOM_SELECT);

      if (this.closeSelectListenersAdded) {
        document.removeEventListener('click', this.closeSelectBind);
        document.removeEventListener('keydown', this.closeSelectBind);
        document.documentElement.classList.remove(this.constants.HAS_UNUSED_CLOSE_FUNCTION);

        this.closeSelectListenersAdded = false;
      } else {
        document.documentElement.classList.add(this.constants.HAS_UNUSED_CLOSE_FUNCTION);
      }
    };
  };