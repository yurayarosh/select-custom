export default function addSelectsPlaceholder() {
  const HAS_PLACEHOLDER = 'has-placeholder';
  let placeholder;
  const opener = this.opener.children[0] || this.opener;
  

  const selectedOptions = [...this.select.options].filter(option => {
    if (option.selected && option.value !== 'placeholder') {
      return option;
    };
    return null;
  });

  [].slice.call(this.select.options).forEach(option => {
    if (option.value === "placeholder") {
      placeholder = option.innerText;
    };
    
    if (option.value === "placeholder" && option.selected && !selectedOptions.length) {
      placeholder = option.innerText;
      this.wrap.classList.add(HAS_PLACEHOLDER);
      if (this.select.multiple) {
        opener.innerText = placeholder;
      }
    }
  });

  this.select.addEventListener("change", e => {
    const selectedOptions = [...e.currentTarget.options].filter(option => {
      if (option.selected && option.value !== 'placeholder') {
        return option;
      };
      return null;
    });    
    
    if (selectedOptions.length > 0) {
      this.wrap.classList.remove(HAS_PLACEHOLDER);
    };    
    if (e.currentTarget.value !== "placeholder") {
      this.wrap.classList.remove(HAS_PLACEHOLDER);
    }
    
    if (e.currentTarget.value === 'placeholder' && !selectedOptions.length
      || !e.currentTarget.value) {
      this.wrap.classList.add(HAS_PLACEHOLDER);
      opener.innerText = placeholder;      
    }
  });
}
