export default function _change() {
  const options = this.el.options;
  const customOptions = this.select.querySelectorAll('.'+this.constants.option);  

  for (let i = 0; i < customOptions.length; i++) {
    customOptions[i].addEventListener('click', (e) => {
      if (this.el.disabled) return;
      
      const clickedCustomOption = e.currentTarget;
      if (clickedCustomOption.classList.contains(this.constants.IS_DISABLED)) return;

      const opener = this.options.openerLabel ? this.opener.children[0] : this.opener

      this.setSelectedOptions({
        e,
        clickedCustomOption,
        nativeOptionsList: options,
        customOptionsList: customOptions,
        item: i
      });

      this.dispatchEvent(this.el);
      this.triggerCheckbox(clickedCustomOption);
      
      if (this.options.changeOpenerText) {
        if (this.el.multiple && this.options.multipleSelectOpenerText.array) {
          if (this.getSelectOptionsText(this.el)) {
            opener.innerHTML = this.getSelectOptionsText(this.el);
          };
        } else if (this.el.multiple && this.options.multipleSelectOpenerText.labels) {
          this.setSelectOptionsItems(clickedCustomOption, this.el, this.opener);
        } else if (this.el.multiple && !this.options.multipleSelectOpenerText) {
          opener.innerHTML = opener.innerHTML;
        } else {
          opener.innerHTML = clickedCustomOption.innerText;
        };
      };
    });
  };
};