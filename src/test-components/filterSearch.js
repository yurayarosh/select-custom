export default function filterSearch() {
  if (!this.input) return;

  this.input.addEventListener("input", e => {
    const filter = e.currentTarget.value.toUpperCase();
    this.options.forEach(option => {
      const textValue = option.innerText;
      if (textValue.toUpperCase().indexOf(filter) > -1) {
        option.style.display = "";
      } else {
        option.style.display = "none";
      }
    });
  });
}
