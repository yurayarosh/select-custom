export default function _open() {
  const openEvent = this.options.openOnHover && !this.isTouch ? 'mouseenter' : 'click';
  this.openSelectBind = this.openSelect.bind(this);

  this.opener.addEventListener(openEvent, this.openSelectBind);
};