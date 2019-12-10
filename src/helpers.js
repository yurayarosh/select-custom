export function offset(el) {
  const rect = el.getBoundingClientRect();
  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  };
};

export function wrapElements(el, wrapper) {
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
};

export function unwrap(wrapper) {
  const docFrag = document.createDocumentFragment();
  while (wrapper.firstChild) {
    const child = wrapper.removeChild(wrapper.firstChild);
    docFrag.appendChild(child);
  }

  wrapper.parentNode.replaceChild(docFrag, wrapper);
};

export function detectTouch() {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
};

export const BEMblock = (block, name) => {
  const addMod = mod => {
    block.classList.add(`${name}--${mod}`)
  }
  const removeMod = mod => {
    block.classList.remove(`${name}--${mod}`)
  }
  const toggleMod = mod => {
    block.classList.toggle(`${name}--${mod}`)
  }
  const containsMod = mod => block.classList.contains(`${name}--${mod}`)

  return {
    name,
    block,
    addMod,
    toggleMod,
    removeMod,
    containsMod
  }
}
