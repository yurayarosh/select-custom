'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function (selector) {
    var elem = this;
    if (!selector || typeof selector !== 'string') return null;
    var firstChar = selector.charAt(0); // Get closest match

    for (; elem && elem !== document; elem = elem.parentNode) {
      // If selector is a class
      if (firstChar === '.') {
        if (elem.classList && elem.classList.contains(selector.substr(1))) {
          return elem;
        }
      } // If selector is an ID


      if (firstChar === '#') {
        if (elem.id === selector.substr(1)) {
          return elem;
        }
      } // If selector is a data attribute


      if (firstChar === '[') {
        if (elem.hasAttribute(selector.substr(1, selector.length - 2))) {
          return elem;
        }
      } // If selector is a tag


      if (elem.tagName.toLowerCase() === selector) {
        return elem;
      }
    }

    return null;
  };
}

function offset(el) {
  var rect = el.getBoundingClientRect();
  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  };
}
function wrapElements(el, wrapper) {
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
}
function unwrap(wrapper) {
  var docFrag = document.createDocumentFragment();

  while (wrapper.firstChild) {
    var child = wrapper.removeChild(wrapper.firstChild);
    docFrag.appendChild(child);
  }

  wrapper.parentNode.replaceChild(docFrag, wrapper);
}
function detectTouch() {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}
var BEMblock = function BEMblock(block, name) {
  var addMod = function addMod(mod) {
    block.classList.add("".concat(name, "--").concat(mod));
  };

  var removeMod = function removeMod(mod) {
    block.classList.remove("".concat(name, "--").concat(mod));
  };

  var toggleMod = function toggleMod(mod) {
    block.classList.toggle("".concat(name, "--").concat(mod));
  };

  var containsMod = function containsMod(mod) {
    return block.classList.contains("".concat(name, "--").concat(mod));
  };

  return {
    name: name,
    block: block,
    addMod: addMod,
    toggleMod: toggleMod,
    removeMod: removeMod,
    containsMod: containsMod
  };
};

var constants = {
  wrap: 'custom-select',
  opener: 'custom-select__opener',
  panel: 'custom-select__panel',
  option: 'custom-select__option',
  optionsWrap: 'custom-select__options',
  optgroup: 'custom-select__optgroup',
  panelItemClassName: 'custom-select__panel-item',
  openerLabel: 'custom-select__opener-label',
  IS_OPEN: 'open',
  IS_DISABLED: 'disabled',
  IS_MULTIPLE: 'multiple',
  IS_SELECTED: 'selected',
  IS_ABOVE: 'above',
  HAS_CUSTOM_SELECT: 'has-custom-select',
  HAS_UNUSED_CLOSE_FUNCTION: 'has-unused-close-custom-select-function',
  DATA_ALLOW_PANEL_CLICK: 'data-allow-panel-click',
  DATA_LABEL: 'data-label',
  DATA_VALUE: 'data-value',
  DATA_HAS_PANEL_ITEM: 'data-has-panel-item',
  DATA_LABEL_INDEX: 'data-label-index'
};

var defaultParams = {
  optionBuilder: undefined,
  panelItem: {
    position: '',
    item: '',
    className: ''
  },
  changeOpenerText: true,
  multipleSelectionOnSingleClick: true,
  multipleSelectOpenerText: {
    labels: false,
    array: false
  },
  allowPanelClick: false,
  openOnHover: false,
  closeOnMouseleave: false,
  wrapDataAttributes: false,
  openerLabel: false
};

function _createElements() {
  var _this = this;

  var wrap = document.createElement('div');
  var panel = document.createElement('div');
  var opener = document.createElement('div');
  var options = this.el.options;
  var optgroups = this.el.querySelectorAll('optgroup');
  var panelItem;
  var panelItemWrap;
  var optionsWrap;
  var openerLabel;

  if (this.options.openerLabel) {
    openerLabel = document.createElement('span');
    openerLabel.className = this.constants.openerLabel;
  }

  if (this.options.panelItem.item) {
    panelItemWrap = document.createElement('div');
    optionsWrap = document.createElement('div');
    optionsWrap.className = this.constants.optionsWrap;
    panelItemWrap.className = this.constants.panelItemClassName;
    this.el.setAttribute(this.constants.DATA_HAS_PANEL_ITEM, '');

    if (this.options.panelItem.item.classList) {
      panelItem = this.options.panelItem.item.cloneNode(true);
      panelItem.className = this.options.panelItem.className ? this.options.panelItem.className : '';
      panelItemWrap.appendChild(panelItem);
    } else if (typeof this.options.panelItem.item === 'string') {
      panelItemWrap.innerHTML = this.options.panelItem.item;
    }
  }

  if (panelItemWrap && this.options.panelItem.position === 'top') {
    panel.appendChild(panelItemWrap);
  }

  if (optgroups.length > 0) {
    for (var i = 0; i < optgroups.length; i++) {
      var title = optgroups[i].label;
      var optionsInGroup = optgroups[i].querySelectorAll('option');
      var customOptgroup = document.createElement('div');

      for (var j = 0; j < optionsInGroup.length; j++) {
        var customOption = document.createElement('div');
        customOption.classList.add(this.constants.option);
        customOption.setAttribute(this.constants.DATA_VALUE, optionsInGroup[j].value);
        customOption.innerHTML = optionsInGroup[j].innerHTML;
        this.addDataAttributes(optionsInGroup[j], customOption);
        this.addOptionItem(optionsInGroup[j], customOption);

        if (optionsInGroup[j].selected) {
          BEMblock(customOption, this.constants.option).addMod(this.constants.IS_SELECTED);

          if (openerLabel) {
            openerLabel.innerHTML = optionsInGroup[j].innerHTML;
          } else {
            opener.innerHTML = optionsInGroup[j].innerHTML;
          }

          var checkbox = customOption.querySelector('input[type="checkbox"]');
          if (checkbox) checkbox.checked = true;
        }

        if (optionsInGroup[j].disabled) {
          BEMblock(customOption, this.constants.option).addMod(this.constants.IS_DISABLED);
        }
        customOptgroup.appendChild(customOption);
      }
      customOptgroup.classList.add(this.constants.optgroup);
      customOptgroup.setAttribute(this.constants.DATA_LABEL, title);
      this.addDataAttributes(optgroups[i], customOptgroup);

      if (optionsWrap) {
        optionsWrap.appendChild(customOptgroup);
      } else {
        panel.appendChild(customOptgroup);
      }
    }

    if (optionsWrap) {
      panel.appendChild(optionsWrap);
    }
  } else {
    var selectedOptions = [];

    for (var _i = 0; _i < options.length; _i++) {
      var _customOption = document.createElement('div');

      _customOption.classList.add(this.constants.option);

      _customOption.innerHTML = options[_i].innerHTML;

      _customOption.setAttribute(this.constants.DATA_VALUE, options[_i].value);

      this.addDataAttributes(options[_i], _customOption);
      this.addOptionItem(options[_i], _customOption);

      var _checkbox = _customOption.querySelector('input[type="checkbox"]');

      if (this.el.multiple) {
        if (options[_i].selected) {
          BEMblock(_customOption, this.constants.option).addMod(this.constants.IS_SELECTED);
          selectedOptions.push(_customOption);

          if (openerLabel) {
            openerLabel.innerHTML = options[_i].innerHTML;
          } else {
            opener.innerHTML = options[_i].innerHTML;
          }

          if (_checkbox) _checkbox.checked = true;
        }
      } else {
        if (options[_i].selected) {
          BEMblock(_customOption, this.constants.option).addMod(this.constants.IS_SELECTED);

          if (openerLabel) {
            openerLabel.innerHTML = options[_i].innerHTML;
          } else {
            opener.innerHTML = options[_i].innerHTML;
          }

          if (_checkbox) _checkbox.checked = true;
        }
      }

      if (options[_i].disabled) {
        BEMblock(_customOption, this.constants.option).addMod(this.constants.IS_DISABLED);
      }

      if (optionsWrap) {
        optionsWrap.appendChild(_customOption);
      } else {
        panel.appendChild(_customOption);
      }
    }

    if (this.options.multipleSelectOpenerText.labels && this.options.openerLabel) {
      console.warn('You set `multipleSelectOpenerText: { labels: true }` and `openerLabel: true` options to this select', this.el, "It doesn't work that way. You should change one of the options.");
    }

    if (selectedOptions.length > 0) {
      var texts = selectedOptions.map(function (option) {
        return option.innerText;
      });

      if (this.options.multipleSelectOpenerText.array) {
        if (openerLabel) {
          openerLabel.innerHTML = texts;
        } else {
          opener.innerHTML = texts;
        }
      }

      if (this.options.multipleSelectOpenerText.labels) {
        selectedOptions.forEach(function (option) {
          _this.setSelectOptionsItems(option, _this.el, opener);
        });
      }
    }

    if (optionsWrap) {
      panel.appendChild(optionsWrap);
    }
  }

  if (panelItemWrap && this.options.panelItem.position === 'bottom') {
    panel.appendChild(panelItemWrap);
  }

  if (this.options.allowPanelClick) {
    this.el.setAttribute(this.constants.DATA_ALLOW_PANEL_CLICK, '');
  }
  wrap.classList.add(this.constants.wrap);

  if (this.options.wrapDataAttributes) {
    this.addDataAttributes(this.el, wrap);
  }

  var addWrapClassName = function addWrapClassName(condition, mod) {
    if (condition) BEMblock(wrap, _this.constants.wrap).addMod(mod);
  };

  addWrapClassName(this.el.disabled, this.constants.IS_DISABLED);
  addWrapClassName(this.el.multiple, this.constants.IS_MULTIPLE);
  panel.classList.add(this.constants.panel);
  opener.classList.add(this.constants.opener);

  if (openerLabel) {
    opener.appendChild(openerLabel);
  }

  wrapElements(this.el, wrap);
  wrap.appendChild(opener);
  wrap.appendChild(panel);
}

function _open() {
  var openEvent = this.options.openOnHover && !detectTouch() ? 'mouseenter' : 'click';
  this.openSelectBind = this.openSelect.bind(this);
  this.opener.addEventListener(openEvent, this.openSelectBind);
}

function _close() {
  if (this.options.closeOnMouseleave && !detectTouch()) {
    this.select.addEventListener('mouseleave', function () {
      document.body.click();
    });
  }
  if (document.documentElement.classList.contains(this.constants.HAS_CUSTOM_SELECT)) return;
  this.closeSelectBind = this.closeSelect.bind(this);
  document.addEventListener('click', this.closeSelectBind);
  document.addEventListener('keydown', this.closeSelectBind);
  document.documentElement.classList.add(this.constants.HAS_CUSTOM_SELECT);
  this.closeSelectListenersAdded = true;
}

function _change() {
  var _this = this;

  var options = this.el.options;
  var customOptions = this.select.querySelectorAll('.' + this.constants.option);

  var _loop = function _loop(i) {
    customOptions[i].addEventListener('click', function (e) {
      if (_this.el.disabled) return;
      var clickedCustomOption = e.currentTarget;
      if (BEMblock(clickedCustomOption, _this.constants.option).containsMod(_this.constants.IS_DISABLED)) return;
      var opener = _this.options.openerLabel ? _this.opener.children[0] : _this.opener;

      _this.setSelectedOptions({
        e: e,
        clickedCustomOption: clickedCustomOption,
        nativeOptionsList: options,
        customOptionsList: customOptions,
        item: i
      });

      _this.dispatchEvent(_this.el);

      _this.triggerCheckbox(clickedCustomOption);

      if (_this.options.changeOpenerText) {
        if (_this.el.multiple && _this.options.multipleSelectOpenerText.array) {
          if (_this.getSelectOptionsText(_this.el)) {
            opener.innerHTML = _this.getSelectOptionsText(_this.el);
          }
        } else if (_this.el.multiple && _this.options.multipleSelectOpenerText.labels) {
          _this.setSelectOptionsItems(clickedCustomOption, _this.el, _this.opener);
        } else if (_this.el.multiple && !_this.options.multipleSelectOpenerText) {
          opener.innerHTML = opener.innerHTML;
        } else {
          opener.innerHTML = clickedCustomOption.innerText;
        }
      }
    });
  };

  for (var i = 0; i < customOptions.length; i++) {
    _loop(i);
  }
}

function _trigerCustomEvents() {
  var _this = this;

  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (BEMblock(mutation.target, _this.constants.wrap).containsMod(_this.constants.IS_OPEN)) {
        if (mutation.oldValue.indexOf("".concat(_this.constants.wrap, "--").concat(_this.constants.IS_OPEN)) === -1) {
          if (_this.onOpen) {
            _this.onOpen(mutation.target);
          }
        }
      } else if (mutation.oldValue.indexOf("".concat(_this.constants.wrap, "--").concat(_this.constants.IS_OPEN)) > 0) {
        BEMblock(_this.panel, _this.constants.panel).removeMod(_this.constants.IS_ABOVE);

        if (_this.onClose) {
          _this.onClose(mutation.target);
        }
      }
    });
  });
  observer.observe(this.select, {
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ['class']
  });
}

function _destroy() {
  var selects = document.querySelectorAll(".".concat(this.constants.wrap));

  if (!selects.length && !document.documentElement.classList.contains(this.constants.HAS_UNUSED_CLOSE_FUNCTION)) {
    return;
  }

  if (this.select.classList.contains(this.constants.wrap)) {
    this.opener.parentNode.removeChild(this.opener);
    this.panel.parentNode.removeChild(this.panel);
    unwrap(this.select);
    this.el.removeAttribute(this.constants.DATA_HAS_PANEL_ITEM);
    this.el.removeAttribute(this.constants.DATA_ALLOW_PANEL_CLICK);
  }
  var elseSelects = document.querySelectorAll(".".concat(this.constants.wrap));

  if (!elseSelects.length) {
    document.documentElement.classList.remove(this.constants.HAS_CUSTOM_SELECT);

    if (this.closeSelectListenersAdded) {
      document.removeEventListener('click', this.closeSelectBind);
      document.removeEventListener('keydown', this.closeSelectBind);
      document.documentElement.classList.remove(this.constants.HAS_UNUSED_CLOSE_FUNCTION);
      this.closeSelectListenersAdded = false;
    } else {
      document.documentElement.classList.add(this.constants.HAS_UNUSED_CLOSE_FUNCTION);
    }
  }
}

var Select =
/*#__PURE__*/
function () {
  function Select(el, options) {
    _classCallCheck(this, Select);

    this.el = el;
    this.options = _objectSpread2({}, defaultParams, {}, options);
    this.constants = constants;
  }

  _createClass(Select, [{
    key: "init",
    value: function init() {
      _createElements.call(this);

      _open.call(this);

      _close.call(this);

      _change.call(this);

      _trigerCustomEvents.call(this);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _destroy.call(this);
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(el) {
      var event = document.createEvent('HTMLEvents');
      event.initEvent('change', true, false);
      el.dispatchEvent(event);
    }
  }, {
    key: "triggerCheckbox",
    value: function triggerCheckbox(customOption) {
      var checkbox = customOption.querySelector('input[type="checkbox"]');
      var condition = BEMblock(customOption, this.constants.option).containsMod(this.constants.IS_SELECTED);
      if (checkbox && condition) checkbox.checked = true;
      if (checkbox && !condition) checkbox.checked = false;
    }
  }, {
    key: "addOptionItem",
    value: function addOptionItem(option, customOption) {
      if (this.options.optionBuilder) {
        this.options.optionBuilder(option, customOption);
      }
    }
  }, {
    key: "openSelect",
    value: function openSelect(e) {
      if (this.el.disabled) return;

      if (e.target.closest("[".concat(this.constants.DATA_LABEL_INDEX, "]"))) {
        return;
      }
      var allOpenSelects = document.querySelectorAll(".".concat(this.constants.wrap, "--").concat(this.constants.IS_OPEN));
      BEMblock(this.select, this.constants.wrap).toggleMod(this.constants.IS_OPEN);

      for (var i = 0; i < allOpenSelects.length; i++) {
        BEMblock(allOpenSelects[i], this.constants.wrap).removeMod(this.constants.IS_OPEN);
      }
      this.setPanelPosition();
    }
  }, {
    key: "closeSelect",
    value: function closeSelect(e) {
      if (document.documentElement.classList.contains(this.constants.HAS_UNUSED_CLOSE_FUNCTION)) {
        console.warn('You have unused `closeSelect` function, triggering on document click and `Esc` button. You shoud remove it, by using `destroy()` method to the first select element.');
      }
      if (e.type && e.type === 'keydown' && e.keyCode && e.keyCode !== 27) return;

      if (!document.documentElement.classList.contains(this.constants.HAS_CUSTOM_SELECT)) {
        return;
      }

      if (e.target.closest("[".concat(this.constants.DATA_LABEL_INDEX, "]"))) {
        return;
      }
      var allOpenSelects = document.querySelectorAll(".".concat(this.constants.wrap, "--").concat(this.constants.IS_OPEN));
      if (!allOpenSelects.length) return;
      if (e.type && e.type === 'click' && e.target.closest(".".concat(this.constants.wrap, "--").concat(this.constants.IS_DISABLED))) return;
      if (e.type && e.type === 'click' && e.target.closest(".".concat(this.constants.option, "--").concat(this.constants.IS_DISABLED))) return;
      if (e.type && e.type === 'click' && e.target.hasAttribute(this.constants.DATA_LABEL)) return;

      if (e.type && e.type === 'click' && e.target.closest('.' + this.constants.wrap)) {
        var elem = e.target.closest('.' + this.constants.wrap).querySelector('select');

        if (elem.multiple) {
          if (e.type && e.type === 'click' && e.target.closest('.' + this.constants.panel)) return;
        }

        if (elem.hasAttribute(this.constants.DATA_ALLOW_PANEL_CLICK)) {
          if (e.type && e.type === 'click' && e.target.closest('.' + this.constants.panel)) return;
        }

        if (elem.hasAttribute(this.constants.DATA_HAS_PANEL_ITEM)) {
          if (e.type && e.type === 'click' && e.target.closest('.' + this.constants.panelItemClassName)) return;
        }
      }

      if (e.target.className.indexOf(this.constants.opener) === -1) {
        for (var i = 0; i < allOpenSelects.length; i++) {
          BEMblock(allOpenSelects[i], this.constants.wrap).removeMod(this.constants.IS_OPEN);
        }
      }
    }
  }, {
    key: "setSelectedOptionsMultiple",
    value: function setSelectedOptionsMultiple(_ref) {
      var clickedCustomOption = _ref.clickedCustomOption,
          nativeOptionsList = _ref.nativeOptionsList,
          item = _ref.item;

      if (nativeOptionsList[item].selected) {
        nativeOptionsList[item].selected = false;
        BEMblock(clickedCustomOption, this.constants.option).removeMod(this.constants.IS_SELECTED);
      } else {
        nativeOptionsList[item].selected = true;
        BEMblock(clickedCustomOption, this.constants.option).addMod(this.constants.IS_SELECTED);
      }
    }
  }, {
    key: "setSelectedOptionsDefault",
    value: function setSelectedOptionsDefault(_ref2) {
      var clickedCustomOption = _ref2.clickedCustomOption,
          nativeOptionsList = _ref2.nativeOptionsList,
          customOptionsList = _ref2.customOptionsList,
          item = _ref2.item;

      for (var i = 0; i < nativeOptionsList.length; i++) {
        var _checkbox = customOptionsList[i].querySelector('input[type="checkbox"]');

        nativeOptionsList[i].selected = false;
        BEMblock(customOptionsList[i], this.constants.option).removeMod(this.constants.IS_SELECTED);
        if (_checkbox) _checkbox.checked = false;
      }
      var checkbox = clickedCustomOption.querySelector('input[type="checkbox"]');
      BEMblock(clickedCustomOption, this.constants.option).addMod(this.constants.IS_SELECTED);
      nativeOptionsList[item].selected = true;
      if (checkbox) checkbox.checked = true;
    }
  }, {
    key: "setSelectedOptions",
    value: function setSelectedOptions(_ref3) {
      var e = _ref3.e,
          clickedCustomOption = _ref3.clickedCustomOption,
          nativeOptionsList = _ref3.nativeOptionsList,
          customOptionsList = _ref3.customOptionsList,
          item = _ref3.item;

      if (this.el.multiple) {
        if (this.options.multipleSelectionOnSingleClick || e.ctrlKey) {
          this.setSelectedOptionsMultiple({
            clickedCustomOption: clickedCustomOption,
            nativeOptionsList: nativeOptionsList,
            item: item
          });
        } else {
          this.setSelectedOptionsDefault({
            clickedCustomOption: clickedCustomOption,
            nativeOptionsList: nativeOptionsList,
            customOptionsList: customOptionsList,
            item: item
          });
        }
      } else {
        this.setSelectedOptionsDefault({
          clickedCustomOption: clickedCustomOption,
          nativeOptionsList: nativeOptionsList,
          customOptionsList: customOptionsList,
          item: item
        });
      }
    }
  }, {
    key: "setPanelPosition",
    value: function setPanelPosition() {
      var panelBottom = offset(this.panel).top + this.panel.offsetHeight;

      if (panelBottom >= window.innerHeight) {
        BEMblock(this.panel, this.constants.panel).addMod(this.constants.IS_ABOVE);
      } else {
        BEMblock(this.panel, this.constants.panel).removeMod(this.constants.IS_ABOVE);
      }
    }
  }, {
    key: "getSelectOptionsText",
    value: function getSelectOptionsText(select) {
      var options = [].slice.call(select.options);
      var result = [];
      options.forEach(function (option) {
        if (option.selected) {
          result.push(option.innerText);
        }
      });
      return result.join(', ');
    }
  }, {
    key: "setSelectOptionsItems",
    value: function setSelectOptionsItems(customOption, select, opener) {
      var _this = this;

      var customOptions = [].slice.call(customOption.parentNode.children);
      var options = [].slice.call(select.options);
      var labels = customOptions.map(function (option, i) {
        var label = document.createElement('span');
        label.className = _this.constants.openerLabel;
        label.setAttribute(_this.constants.DATA_LABEL_INDEX, i);
        label.innerHTML = "".concat(option.innerText, "<button></button>");
        return label;
      });
      customOptions.forEach(function (option, i) {
        option.setAttribute(_this.constants.DATA_LABEL_INDEX, i);
      });
      options.forEach(function (option, i) {
        option.setAttribute(_this.constants.DATA_LABEL_INDEX, i);
      });
      var index = +customOption.getAttribute(this.constants.DATA_LABEL_INDEX);
      var currentLabel = opener.querySelector("[".concat(this.constants.DATA_LABEL_INDEX, "=\"").concat(index, "\"]"));

      if (BEMblock(customOption, this.constants.option).containsMod(this.constants.IS_SELECTED)) {
        if (!opener.children.length) {
          opener.innerHTML = '';
        }
        opener.appendChild(labels[index]);
      } else {
        if (currentLabel) {
          opener.removeChild(currentLabel);
        }
      }

      function removeLabel(e) {
        var _this2 = this;

        e.preventDefault();
        var label = e.currentTarget.parentNode;
        var name = label.getAttribute(this.constants.DATA_LABEL_INDEX);
        var targetOptions = [].slice.call(this.select.querySelectorAll("[".concat(this.constants.DATA_LABEL_INDEX, "=\"").concat(name, "\"]")));
        var targetCustomOptionArr = targetOptions.filter(function (el) {
          if (el.classList.contains(_this2.constants.option)) return el;
        });
        var targetCustomOption = targetCustomOptionArr[0];
        targetOptions.forEach(function (option) {
          if (option.selected) {
            option.selected = false;
          }

          if (BEMblock(option, _this2.constants.option).containsMod(_this2.constants.IS_SELECTED)) {
            BEMblock(option, _this2.constants.option).removeMod(_this2.constants.IS_SELECTED);
          }
        });
        this.dispatchEvent(this.el);
        this.triggerCheckbox(targetCustomOption);

        if (label.parentNode) {
          label.parentNode.removeChild(label);
        }
      }
      labels.forEach(function (label) {
        label.querySelector('button').addEventListener('click', removeLabel.bind(_this));
      });
    }
  }, {
    key: "addDataAttributes",
    value: function addDataAttributes(el, targetEl) {
      var dataAttributes = [].filter.call(el.attributes, function (at) {
        return /^data-/.test(at.name);
      });

      if (dataAttributes.length) {
        dataAttributes.forEach(function (attribute) {
          targetEl.setAttribute(attribute.name, attribute.value);
        });
      }
    }
  }, {
    key: "select",
    get: function get() {
      return this.el.parentNode;
    }
  }, {
    key: "opener",
    get: function get() {
      return this.select.querySelector('.' + this.constants.opener);
    }
  }, {
    key: "panel",
    get: function get() {
      return this.select.querySelector('.' + this.constants.panel);
    }
  }]);

  return Select;
}();

function addOptionIcons(option, customOption) {
  var color = option.dataset.color;
  if (!color) return;
  var inner = customOption.innerHTML;
  customOption.innerHTML = "<div class=\"custom-select__option-icon\" style=\"background-color: ".concat(color, ";\"></div> ").concat(inner);
}

function addSelectsPlaceholder() {
  var _this = this;

  var HAS_PLACEHOLDER = 'has-placeholder';
  var placeholder;
  var openerLabel = this.opener.children[0];
  var opener = openerLabel && openerLabel.hasAttribute('data-label-index') ? this.opener : openerLabel;

  var selectedOptions = _toConsumableArray(this.el.options).filter(function (option) {
    if (option.selected && option.value !== 'placeholder') {
      return option;
    }
    return null;
  });

  _toConsumableArray(this.el.options).forEach(function (option) {
    if (option.value === 'placeholder') {
      placeholder = option.innerText;
    }

    if (option.value === 'placeholder' && !selectedOptions.length) {
      placeholder = option.innerText;

      _this.select.classList.add(HAS_PLACEHOLDER);

      if (_this.el.multiple) {
        opener.innerText = placeholder;
      }
    }
  });

  this.el.addEventListener("change", function (e) {
    var selectedOptions = _toConsumableArray(e.currentTarget.options).filter(function (option) {
      if (option.selected && option.value !== 'placeholder') {
        return option;
      }
      return null;
    });

    if (selectedOptions.length > 0) {
      _this.select.classList.remove(HAS_PLACEHOLDER);
    }

    if (e.currentTarget.value !== 'placeholder') {
      _this.select.classList.remove(HAS_PLACEHOLDER);
    }

    if (e.currentTarget.value === 'placeholder' && !selectedOptions.length || !e.currentTarget.value) {
      _this.select.classList.add(HAS_PLACEHOLDER);

      opener.innerText = placeholder;
    }
  });
}

function filterSearch() {
  var _this = this;

  if (!this.input) return;
  this.input.addEventListener("input", function (e) {
    var filter = e.currentTarget.value.toUpperCase();

    _this.panelOptions.forEach(function (option) {
      var textValue = option.innerText;

      if (textValue.toUpperCase().indexOf(filter) > -1) {
        option.style.display = "";
      } else {
        option.style.display = "none";
      }
    });
  });
}

var CustomSelect =
/*#__PURE__*/
function (_Select) {
  _inherits(CustomSelect, _Select);

  function CustomSelect(select, params) {
    var _this;

    _classCallCheck(this, CustomSelect);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CustomSelect).call(this, select, params));
    _this.name = select.dataset.type;
    return _this;
  }

  _createClass(CustomSelect, [{
    key: "getElements",
    value: function getElements() {
      this.panelOptions = _toConsumableArray(this.select.querySelectorAll('.custom-select__option'));
      this.input = this.select.querySelector('.js-search');
    }
  }, {
    key: "onOpen",
    value: function onOpen() {
      console.log('open');
    }
  }, {
    key: "onClose",
    value: function onClose() {
      console.log('close');
    }
  }, {
    key: "init",
    value: function init() {
      if (this.select.classList && this.select.classList.contains('custom-select')) {
        return;
      }

      _get(_getPrototypeOf(CustomSelect.prototype), "init", this).call(this); // ================ custom function ======================


      this.getElements();
      addSelectsPlaceholder.call(this);
      filterSearch.call(this); // ================ custom function ======================
    }
  }]);

  return CustomSelect;
}(Select);

function setSelects() {
  var selects = _toConsumableArray(document.querySelectorAll('.js-select'));

  if (!selects.length) return;
  var customSelectObjects = [];
  var params = {
    default: {},
    multiple: {
      multipleSelectOpenerText: {
        labels: true
      },
      optionBuilder: function optionBuilder(option, customOption) {
        var inner = customOption.innerHTML;

        if (customOption.dataset.value === 'placeholder') {
          customOption.innerHTML = inner;
        } else {
          customOption.innerHTML = "<input type=\"checkbox\" /> ".concat(inner);
        }
      }
    },
    with_input: {
      panelItem: {
        position: 'top',
        item: '<input type="text" class="js-search" placeholder="This is search input" />'
      }
    },
    whith_icons: {
      optionBuilder: addOptionIcons
    }
  };
  selects.forEach(function (select) {
    var name = select.dataset.type;
    var customSelect = new CustomSelect(select, params[name]);
    customSelect.init();
    customSelectObjects.push(customSelect);
  }); // ================ example of destroy and reinit methods ======================

  var destroyFirst = document.querySelector('.js-destroy-first');
  var destroyAll = document.querySelector('.js-destroy-all');
  var initAll = document.querySelector('.js-init-all');
  destroyFirst.addEventListener('click', function (e) {
    e.preventDefault();
    customSelectObjects[0].destroy();
  });
  destroyAll.addEventListener('click', function (e) {
    e.preventDefault();
    customSelectObjects.forEach(function (select) {
      select.destroy();
    }); // to remove close function, triggering on document click

    customSelectObjects[0].destroy();
  });
  initAll.addEventListener('click', function (e) {
    e.preventDefault();
    customSelectObjects.forEach(function (customSelect) {
      customSelect.init();
    });
  });
}

setSelects();
