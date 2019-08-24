export default function _trigerCustomEvents() {
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