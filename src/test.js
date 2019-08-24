import  Select  from "./main";
// import addOptionIcons from "./test-components/addOptionIcons";
import addSelectsPlaceholder from "./test-components/addSelectsPlaceholder";
import filterSearch from "./test-components/filterSearch";

// const selects = [].slice.call(document.querySelectorAll(".js-select"));

// const input = document.createElement('input');

// selects.forEach(select => {
//   const name = select.dataset.type;
//   const options = {
//     default: {},
//     multiple: {
//       multipleSelectOpenerText: { array: true }
//     },
//     with_input: {
//       panelItem: {
//         position: "top",
//         item: input
//       }
//     }
//   };

//   const sel = new Select(select, options[name]);
//   sel.init();
// });

class CustomSelect {
  constructor(select) {
    this.select = select;
    this.name = select.dataset.type;
    // ================ plugin options ======================
    this.parameters = {
      default: {
        optionBuilder: (option, customOption) => {
          const inner = customOption.innerHTML;
          customOption.innerHTML = `<input type="checkbox" /><span>${inner}</span>`;
        }
      },
      multiple: {
        multipleSelectOpenerText: { labels: true },
        optionBuilder: (option, customOption) => {
          const inner = customOption.innerHTML;
          customOption.innerHTML = `<input type="checkbox" /><span>${inner}</span>`;
        }
      },
      with_input: {
        panelItem: {
          position: "top",
          item:
            '<input type="text" class="js-search" placeholder="This is search input" />'
        }
      }
    };
    // ================ plugin options ======================
  }

  // ================ select elements ======================
  get wrap() {
    return this.select.parentNode;
  }
  get opener() {
    return this.wrap.querySelector(".custom-select__opener");
  }
  get panel() {
    return this.wrap.querySelector(".custom-select__panel");
  }
  get options() {
    return [...this.wrap.querySelectorAll(".custom-select__option")];
  }
  get input() {
    return this.wrap.querySelector(".js-search");
  }
  // ================ select elements ======================

  init() {
    // ================ plugin initialization ======================
    this.Select = new Select(this.select, this.parameters[this.name]);
    this.Select.init();
    // ================ plugin initialization ======================

    // ================ helpers ======================
    addSelectsPlaceholder.call(this);
    filterSearch.call(this);
    // ================ helpers ======================
  }
};

// ================ main initialization ======================
function setSelects() {
  const selects = [...document.querySelectorAll(".js-select")];
  if (!selects.length) return;

  // objects to proper destroy and reinit methods
  const customSelectObject = [];
  const SelectObjects = [];
  // objects to proper destroy and reinit methods

  selects.forEach(select => {
    const customSelect = new CustomSelect(select);
    customSelect.init();
    SelectObjects.push(customSelect.Select);
    customSelectObject.push(customSelect);
  });
}
setSelects();
// ================ main initialization ======================
