export default function addSelectsPlaceholder() {
  const HAS_PLACEHOLDER = 'has-placeholder';
  let placeholder;
  const openerLabel = this.opener.children[0];
  const opener =
    openerLabel && openerLabel.hasAttribute('data-label-index')
      ? this.opener
      : openerLabel;

  const selectedOptions = [...this.el.options].filter(option => {
    if (option.selected && option.value !== 'placeholder') {
      return option;
    };
    return null;
  });

  [...this.el.options].forEach(option => {
    if (option.value === 'placeholder') {
      placeholder = option.innerText;
    };
    
    if (option.value === 'placeholder' && !selectedOptions.length) {
      placeholder = option.innerText;
      this.select.classList.add(HAS_PLACEHOLDER);
      if (this.el.multiple) {
        opener.innerText = placeholder;
      }
    }
  });

  this.el.addEventListener("change", e => {
    const selectedOptions = [...e.currentTarget.options].filter(option => {
      if (option.selected && option.value !== 'placeholder') {
        return option;
      };
      return null;
    });    
    
    if (selectedOptions.length > 0) {
      this.select.classList.remove(HAS_PLACEHOLDER);
    };    
    if (e.currentTarget.value !== 'placeholder') {      
      this.select.classList.remove(HAS_PLACEHOLDER);
    }
    
    if (e.currentTarget.value === 'placeholder' && !selectedOptions.length
      || !e.currentTarget.value) {
      this.select.classList.add(HAS_PLACEHOLDER);        
      opener.innerText = placeholder;
    }
  });
}
