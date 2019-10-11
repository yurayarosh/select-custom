import { detectTouch } from "../helpers";

export default function _close() {
  if (this.options.closeOnMouseleave && !detectTouch()) {
    this.select.addEventListener('mouseleave', () => {
      document.body.click();
    });
  };

  if (document.documentElement.classList.contains(this.constants.HAS_CUSTOM_SELECT)) return;

  this.closeSelectBind = this.closeSelect.bind(this);
  document.addEventListener('click', this.closeSelectBind);
  document.addEventListener('keydown', this.closeSelectBind)
  document.documentElement.classList.add(this.constants.HAS_CUSTOM_SELECT);

  this.closeSelectListenersAdded = true;
};