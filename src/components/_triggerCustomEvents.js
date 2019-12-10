import { BEMblock } from '../helpers'

export default function _trigerCustomEvents() {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (BEMblock(mutation.target, this.constants.wrap).containsMod(this.constants.IS_OPEN)) {
        if (mutation.oldValue.indexOf(`${this.constants.wrap}--${this.constants.IS_OPEN}`) === -1) {
          if (this.onOpen) {
            this.onOpen(mutation.target);
          };
        };
      } else if (mutation.oldValue.indexOf(`${this.constants.wrap}--${this.constants.IS_OPEN}`) > 0) {
        BEMblock(this.panel, this.constants.panel).removeMod(this.constants.IS_ABOVE);
        if (this.onClose) {
          this.onClose(mutation.target);
        };
      };
    });
  });
  observer.observe(this.select, { attributes: true, attributeOldValue: true, attributeFilter: ['class'] });
};
