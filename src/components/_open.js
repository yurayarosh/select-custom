import { detectTouch } from "../helpers";

export default function _open() {
  const openEvent = this.options.openOnHover && !detectTouch() ? 'mouseenter' : 'click';
  this.openSelectBind = this.openSelect.bind(this);  

  this.opener.addEventListener(openEvent, this.openSelectBind);
};