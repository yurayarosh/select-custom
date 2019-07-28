export default function addOptionIcons(option, customOption) {
  const color = option.dataset.color;
  if (!color) return;
  const inner = customOption.innerHTML;
  customOption.innerHTML = `<div class="custom-select__option-icon" style="background-color: ${color};"></div> ${inner}`;
}
