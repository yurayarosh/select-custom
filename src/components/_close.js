export default function _close() {
  if (this.options.closeOnMouseleave && !this.isTouch) {
    this.select.addEventListener('mouseleave', (e) => {
      document.body.click();
    });
  };

  if (document.documentElement.classList.contains(this.constants.HAS_CUSTOM_SELECT)) return;

  this.closeSelectBind = this.closeSelect.bind(this);
  document.addEventListener('click', this.closeSelectBind);
  document.documentElement.classList.add(this.constants.HAS_CUSTOM_SELECT);

  this.closeSelectAdded = true;
};