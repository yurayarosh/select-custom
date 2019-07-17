'use strict';

if (!Object.assign) {
  Object.defineProperty(Object, 'assign', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function value(target, firstSource) {

      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object');
      }

      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) {
          continue;
        }

        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
      return to;
    }
  });
}
if (!Element.prototype.closest) {

  Element.prototype.closest = function (selector) {
    var elem = this;

    if (!selector || typeof selector !== 'string') {
      return;
    }

    var firstChar = selector.charAt(0);
    // Get closest match
    for (; elem && elem !== document; elem = elem.parentNode) {

      // If selector is a class
      if (firstChar === '.') {
        if (elem.classList && elem.classList.contains(selector.substr(1))) {
          return elem;
        }
      }

      // If selector is an ID
      if (firstChar === '#') {
        if (elem.id === selector.substr(1)) {
          return elem;
        }
      }

      // If selector is a data attribute
      if (firstChar === '[') {
        if (elem.hasAttribute(selector.substr(1, selector.length - 2))) {
          return elem;
        }
      }

      // If selector is a tag
      if (elem.tagName.toLowerCase() === selector) {
        return elem;
      }
    }
    return false;
  };
}

function offset(el) {
  var rect = el.getBoundingClientRect();
  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  };
}
function wrap(el, wrapper) {
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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var Select = function () {
  function Select(el, options) {
    classCallCheck(this, Select);

    this.el = el;
    this.defaultParams = {
      optionBuilder: false,
      panelItem: { position: '', item: '', className: '' },
      changeOpenerText: true,
      multipleSelectionOnSingleClick: true,
      multipleSelectOpenerText: { labels: false, array: false },
      allowPanelClick: false,
      openOnHover: false,
      closeOnMouseleave: false,
      wrapDataAttributes: false
    };
    options = Object.assign({}, this.defaultParams, options);
    this.options = {
      optionBuilder: options.optionBuilder,
      panelItem: options.panelItem,
      changeOpenerText: options.changeOpenerText,
      multipleSelectionOnSingleClick: options.multipleSelectionOnSingleClick,
      multipleSelectOpenerText: options.multipleSelectOpenerText,
      allowPanelClick: options.allowPanelClick,
      openOnHover: options.openOnHover,
      closeOnMouseleave: options.closeOnMouseleave,
      wrapDataAttributes: options.wrapDataAttributes
    };
    this.constants = {
      wrap: 'custom-select',
      opener: 'custom-select__opener',
      panel: 'custom-select__panel',
      option: 'custom-select__option',
      optionsWrap: 'custom-select__options',
      optgroup: 'custom-select__optgroup',
      panelItemClassName: 'custom-select__panel-item',
      openerLabel: 'custom-select__opener-label',
      IS_OPEN: 'is-open',
      IS_DISABLED: 'is-disabled',
      IS_MULTIPLE: 'is-multiple',
      IS_SELECTED: 'is-selected',
      IS_ABOVE: 'is-above',
      HAS_CUSTOM_SELECT: 'has-custom-select',
      HAS_UNUSED_CLOSE_FUNCTION: 'has-unused-close-custom-select-function',
      DATA_ALLOW_PANEL_CLICK: 'data-allow-panel-click',
      DATA_LABEL: 'data-label',
      DATA_VALUE: 'data-value',
      DATA_HAS_PANEL_ITEM: 'data-has-panel-item',
      DATA_LABEL_INDEX: 'data-label-index'
    };
    this.isTouch = detectTouch();
  }

  createClass(Select, [{
    key: 'init',
    value: function init() {
      this._createElements();
      this._open();
      this._close();
      this._change();
      this._trigerCustomEvents();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this._destroy();
    }
  }, {
    key: 'select',
    value: function select() {
      return this.el.parentNode;
    }
  }, {
    key: 'opener',
    value: function opener() {
      return this.select().querySelector('.' + this.constants.opener);
    }
  }, {
    key: 'panel',
    value: function panel() {
      return this.select().querySelector('.' + this.constants.panel);
    }
  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(el) {
      var event = document.createEvent('HTMLEvents');
      event.initEvent('change', true, false);
      this.el.dispatchEvent(event);
    }
  }, {
    key: 'addOptionItem',
    value: function addOptionItem(option, customOption) {
      if (this.options.optionBuilder) {
        this.options.optionBuilder(option, customOption);
      }    }
  }, {
    key: 'openSelect',
    value: function openSelect(e) {
      if (this.el.disabled) return;

      if (e.target.closest('[' + this.constants.DATA_LABEL_INDEX + ']')) {
        return;
      }
      var allOpenSelects = document.querySelectorAll('.' + this.constants.wrap + '.' + this.constants.IS_OPEN);

      this.select().classList.toggle(this.constants.IS_OPEN);
      for (var i = 0; i < allOpenSelects.length; i++) {
        allOpenSelects[i].classList.remove(this.constants.IS_OPEN);
      }
      this.setPanelPosition();
    }
  }, {
    key: 'closeSelect',
    value: function closeSelect(e) {
      if (document.documentElement.classList.contains(this.constants.HAS_UNUSED_CLOSE_FUNCTION)) {
        console.warn('You have unused `closeSelect` function, triggering on document click. You shoud remove it, by using `destroy()` method to the first select element.');
      }      if (!document.documentElement.classList.contains(this.constants.HAS_CUSTOM_SELECT)) {
        return;
      }
      if (e.target.closest('[' + this.constants.DATA_LABEL_INDEX + ']')) {
        return;
      }
      var allOpenSelects = document.querySelectorAll('.' + this.constants.wrap + '.' + this.constants.IS_OPEN);
      if (!allOpenSelects.length) return;

      function checkTarget(e, className) {
        if (e.target.classList && e.target.classList.contains(className) || e.target.closest('.' + className)) {
          return true;
        }      }
      if (e.target.closest('.' + this.constants.IS_DISABLED)) return;

      if (e.target.hasAttribute(this.constants.DATA_LABEL)) return;

      if (e.target.closest('.' + this.constants.wrap)) {
        var elem = e.target.closest('.' + this.constants.wrap).querySelector('select');

        if (elem.multiple) {
          if (checkTarget(e, this.constants.panel)) return;
        }
        if (elem.hasAttribute(this.constants.DATA_ALLOW_PANEL_CLICK)) {
          if (checkTarget(e, this.constants.panel)) return;
        }
        if (elem.hasAttribute(this.constants.DATA_HAS_PANEL_ITEM)) {
          if (checkTarget(e, this.constants.panelItemClassName)) return;
        }      }      if (e.target.className.indexOf(this.constants.opener) === -1) {
        for (var i = 0; i < allOpenSelects.length; i++) {
          allOpenSelects[i].classList.remove(this.constants.IS_OPEN);
        }      }    }
  }, {
    key: 'setSelectedOptionsMultiple',
    value: function setSelectedOptionsMultiple(_ref) {
      var clickedCustomOption = _ref.clickedCustomOption,
          nativeOptionsList = _ref.nativeOptionsList,
          item = _ref.item;

      if (nativeOptionsList[item].selected) {
        nativeOptionsList[item].selected = false;
        clickedCustomOption.classList.remove(this.constants.IS_SELECTED);
      } else {
        nativeOptionsList[item].selected = true;
        clickedCustomOption.classList.add(this.constants.IS_SELECTED);
      }    }
  }, {
    key: 'setSelectedOptionsDefault',
    value: function setSelectedOptionsDefault(_ref2) {
      var clickedCustomOption = _ref2.clickedCustomOption,
          nativeOptionsList = _ref2.nativeOptionsList,
          customOptionsList = _ref2.customOptionsList,
          item = _ref2.item;

      for (var i = 0; i < nativeOptionsList.length; i++) {
        nativeOptionsList[i].selected = false;
        customOptionsList[i].classList.remove(this.constants.IS_SELECTED);
      }      clickedCustomOption.classList.add(this.constants.IS_SELECTED);
      nativeOptionsList[item].selected = true;
    }
  }, {
    key: 'setSelectedOptions',
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
        }      } else {
        this.setSelectedOptionsDefault({
          clickedCustomOption: clickedCustomOption,
          nativeOptionsList: nativeOptionsList,
          customOptionsList: customOptionsList,
          item: item
        });
      }    }
  }, {
    key: 'setPanelPosition',
    value: function setPanelPosition() {
      var panelBottom = offset(this.panel()).top + this.panel().offsetHeight;

      if (panelBottom >= window.innerHeight) {
        this.panel().classList.add(this.constants.IS_ABOVE);
      } else {
        this.panel().classList.remove(this.constants.IS_ABOVE);
      }    }
  }, {
    key: 'getSelectOptionsText',
    value: function getSelectOptionsText(select) {
      var options = [].slice.call(select.options);
      var result = [];

      options.forEach(function (option) {
        if (option.selected) {
          result.push(option.innerText);
        }      });

      return result.join(', ');
    }
  }, {
    key: 'setSelectOptionsItems',
    value: function setSelectOptionsItems(customOption) {
      var _this = this;

      var customOptions = [].slice.call(customOption.parentNode.children);
      var options = [].slice.call(this.select().querySelectorAll('option'));

      var labels = customOptions.map(function (option, i) {
        var label = document.createElement('span');
        label.className = _this.constants.openerLabel;
        label.setAttribute(_this.constants.DATA_LABEL_INDEX, i);
        label.innerHTML = option.innerText + '<button></button>';

        return label;
      });

      customOptions.forEach(function (option, i) {
        option.setAttribute(_this.constants.DATA_LABEL_INDEX, i);
      });

      options.forEach(function (option, i) {
        option.setAttribute(_this.constants.DATA_LABEL_INDEX, i);
      });

      var index = +customOption.getAttribute(this.constants.DATA_LABEL_INDEX);
      var currentLabel = this.opener().querySelector('[' + this.constants.DATA_LABEL_INDEX + '="' + index + '"]');

      if (customOption.classList.contains(this.constants.IS_SELECTED)) {
        if (!this.opener().children.length) {
          this.opener().innerHTML = '';
        }        this.opener().appendChild(labels[index]);
      } else {
        if (currentLabel) {
          this.opener().removeChild(currentLabel);
        }      }
      function removeLabel(e) {
        var _this2 = this;

        e.preventDefault();
        var label = e.currentTarget.parentNode;
        var name = label.getAttribute(this.constants.DATA_LABEL_INDEX);
        var targetOptions = [].slice.call(this.select().querySelectorAll('[' + this.constants.DATA_LABEL_INDEX + '="' + name + '"]'));

        targetOptions.forEach(function (option) {
          if (option.selected) {
            option.selected = false;
          }          if (option.classList.contains(_this2.constants.IS_SELECTED)) {
            option.classList.remove(_this2.constants.IS_SELECTED);
          }        });

        this.dispatchEvent(this.el);
        if (label.parentNode) {
          label.parentNode.removeChild(label);
        }      }
      labels.forEach(function (label) {
        label.querySelector('button').addEventListener('click', removeLabel.bind(_this));
      });
    }
  }, {
    key: 'addDataAttributes',
    value: function addDataAttributes(el, targetEl) {
      var dataAttributes = [].filter.call(el.attributes, function (at) {
        return (/^data-/.test(at.name)
        );
      });

      if (dataAttributes.length) {
        dataAttributes.forEach(function (attribute) {
          targetEl.setAttribute(attribute.name, attribute.value);
        });
      }    }
  }, {
    key: '_trigerCustomEvents',
    value: function _trigerCustomEvents() {
      var _this3 = this;

      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.target.classList.contains(_this3.constants.IS_OPEN)) {
            if (mutation.oldValue.indexOf(_this3.constants.IS_OPEN) === -1) {
              if (_this3.onOpen) {
                _this3.onOpen(mutation.target);
              }            }          } else if (mutation.oldValue.indexOf(_this3.constants.IS_OPEN) > 0) {
            _this3.panel().classList.remove(_this3.constants.IS_ABOVE);
            if (_this3.onClose) {
              _this3.onClose(mutation.target);
            }          }        });
      });
      observer.observe(this.select(), { attributes: true, attributeOldValue: true, attributeFilter: ['class'] });
    }
  }, {
    key: '_createElements',
    value: function _createElements() {
      var wrap$1 = document.createElement('div');
      var panel = document.createElement('div');
      var opener = document.createElement('div');
      var options = this.el.options;
      var optgroups = this.el.querySelectorAll('optgroup');
      var panelItem = void 0;
      var panelItemWrap = void 0;
      var optionsWrap = void 0;

      if (this.options.panelItem.item) {
        panelItemWrap = document.createElement('div');
        optionsWrap = document.createElement('div');
        optionsWrap.className = this.constants.optionsWrap;
        panelItemWrap.className = this.constants.panelItemClassName;

        this.el.setAttribute(this.constants.DATA_HAS_PANEL_ITEM, '');

        if (_typeof(this.options.panelItem.item) === 'object') {
          panelItem = this.options.panelItem.item.cloneNode(true);
          panelItem.className = this.options.panelItem.className ? this.options.panelItem.className : '';
          panelItemWrap.appendChild(panelItem);
        }        if (typeof this.options.panelItem.item === 'string') {
          panelItemWrap.innerHTML = this.options.panelItem.item;
        }      }
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

            if (optionsInGroup[j].selected) {
              customOption.classList.add(this.constants.IS_SELECTED);
              opener.innerHTML = optionsInGroup[j].innerHTML;
            }            if (optionsInGroup[j].disabled) {
              customOption.classList.add(this.constants.IS_DISABLED);
            }            this.addOptionItem(optionsInGroup[j], customOption);
            customOptgroup.appendChild(customOption);
          }
          customOptgroup.classList.add(this.constants.optgroup);
          customOptgroup.setAttribute(this.constants.DATA_LABEL, title);

          this.addDataAttributes(optgroups[i], customOptgroup);

          if (optionsWrap) {
            optionsWrap.appendChild(customOptgroup);
          } else {
            panel.appendChild(customOptgroup);
          }        }
        if (optionsWrap) {
          panel.appendChild(optionsWrap);
        }      } else {
        for (var _i = 0; _i < options.length; _i++) {
          var _customOption = document.createElement('div');
          _customOption.classList.add(this.constants.option);
          _customOption.innerHTML = options[_i].innerHTML;
          _customOption.setAttribute(this.constants.DATA_VALUE, options[_i].value);

          this.addDataAttributes(options[_i], _customOption);

          if (options[_i].selected) {
            _customOption.classList.add(this.constants.IS_SELECTED);
            opener.innerHTML = options[_i].innerHTML;
          }          if (options[_i].disabled) {
            _customOption.classList.add(this.constants.IS_DISABLED);
          }          this.addOptionItem(options[_i], _customOption);

          if (optionsWrap) {
            optionsWrap.appendChild(_customOption);
          } else {
            panel.appendChild(_customOption);
          }        }
        if (optionsWrap) {
          panel.appendChild(optionsWrap);
        }      }
      if (panelItemWrap && this.options.panelItem.position === 'bottom') {
        panel.appendChild(panelItemWrap);
      }
      if (this.options.allowPanelClick) {
        this.el.setAttribute(this.constants.DATA_ALLOW_PANEL_CLICK, '');
      }
      wrap$1.classList.add(this.constants.wrap);
      if (this.options.wrapDataAttributes) {
        this.addDataAttributes(this.el, wrap$1);
      }
      function addWrapClassName(condition, className) {
        if (condition) {
          wrap$1.classList.add(className);
        }      }      addWrapClassName(this.el.disabled, this.constants.IS_DISABLED);
      addWrapClassName(this.el.multiple, this.constants.IS_MULTIPLE);

      panel.classList.add(this.constants.panel);
      opener.classList.add(this.constants.opener);
      wrap(this.el, wrap$1);
      wrap$1.appendChild(opener);
      wrap$1.appendChild(panel);
    }
  }, {
    key: '_open',
    value: function _open() {
      var openEvent = this.options.openOnHover && !this.isTouch ? 'mouseenter' : 'click';
      this.openSelectBind = this.openSelect.bind(this);

      this.opener().addEventListener(openEvent, this.openSelectBind);
    }
  }, {
    key: '_close',
    value: function _close() {
      if (this.options.closeOnMouseleave && !this.isTouch) {
        this.select().addEventListener('mouseleave', function (e) {
          document.body.click();
        });
      }
      if (document.documentElement.classList.contains(this.constants.HAS_CUSTOM_SELECT)) return;

      this.closeSelectBind = this.closeSelect.bind(this);
      document.addEventListener('click', this.closeSelectBind);
      document.documentElement.classList.add(this.constants.HAS_CUSTOM_SELECT);

      this.closeSelectAdded = true;
    }
  }, {
    key: '_change',
    value: function _change() {
      var _this4 = this;

      var options = this.el.options;
      var customOptions = this.select().querySelectorAll('.' + this.constants.option);

      var _loop = function _loop(i) {
        customOptions[i].addEventListener('click', function (e) {
          if (_this4.el.disabled) return;

          var clickedCustomOption = e.currentTarget;
          if (clickedCustomOption.classList.contains(_this4.constants.IS_DISABLED)) return;

          _this4.setSelectedOptions({
            e: e,
            clickedCustomOption: clickedCustomOption,
            nativeOptionsList: options,
            customOptionsList: customOptions,
            item: i
          });

          _this4.dispatchEvent(_this4.el);

          if (_this4.options.changeOpenerText) {
            if (_this4.el.multiple && _this4.options.multipleSelectOpenerText.array) {
              if (_this4.getSelectOptionsText(_this4.el)) {
                _this4.opener().innerHTML = _this4.getSelectOptionsText(_this4.el);
              }            } else if (_this4.el.multiple && _this4.options.multipleSelectOpenerText.labels) {
              _this4.setSelectOptionsItems(clickedCustomOption);
            } else if (_this4.el.multiple && !_this4.options.multipleSelectOpenerText) {
              _this4.opener().innerHTML = _this4.opener().innerHTML;
            } else {
              _this4.opener().innerHTML = clickedCustomOption.innerText;
            }          }        });
      };

      for (var i = 0; i < customOptions.length; i++) {
        _loop(i);
      }    }
  }, {
    key: '_destroy',
    value: function _destroy() {
      if (this.select().classList.contains(this.constants.wrap)) {
        this.opener().parentNode.removeChild(this.opener());
        this.panel().parentNode.removeChild(this.panel());
        unwrap(this.select());
        this.el.removeAttribute(this.constants.DATA_HAS_PANEL_ITEM);
        this.el.removeAttribute(this.constants.DATA_ALLOW_PANEL_CLICK);
      }
      var elseSelects = document.querySelectorAll('.' + this.constants.wrap);

      if (!elseSelects.length) {
        document.documentElement.classList.remove(this.constants.HAS_CUSTOM_SELECT);

        if (this.closeSelectAdded) {
          document.removeEventListener('click', this.closeSelectBind);
          document.documentElement.classList.remove(this.constants.HAS_UNUSED_CLOSE_FUNCTION);
        } else {
          document.documentElement.classList.add(this.constants.HAS_UNUSED_CLOSE_FUNCTION);
        }
      }    }
  }]);
  return Select;
}();

// commands

var selects = [].concat(toConsumableArray(document.querySelectorAll('.js-select')));

var select = void 0;

var selectObjects = [];

selects.forEach(function (selectEl) {
  var name = selectEl.getAttribute('data-type');
  var options = {
    multiple: {
      multipleSelectOpenerText: { labels: true }
    },
    default: {
      allowPanelClick: false,
      wrapDataAttributes: true,
      panelItem: {
        position: 'top',
        item: '<input type="text" />'
      }
    }
  };
  select = new Select(selectEl, options[name]);
  select.init();
  selectObjects.push(select);

  selectEl.addEventListener('change', function (e) {
    // console.log(e.currentTarget.value);
  });

  var wrap = selectEl.parentNode;
  var opener = wrap.querySelector('.custom-select__opener');

  var HAS_PLACEHOLDER = 'has-placeholder';
  var placeholder = void 0;

  [].slice.call(selectEl.options).forEach(function (option) {
    if (option.value === 'placeholder') {
      placeholder = option.innerText;
      wrap.classList.add(HAS_PLACEHOLDER);
      if (selectEl.multiple) {
        opener.innerText = placeholder;
      }    }  });

  selectEl.addEventListener('change', function (e) {
    if (e.currentTarget.value !== 'placeholder') {
      wrap.classList.remove(HAS_PLACEHOLDER);
    }    if (!e.currentTarget.value) {
      wrap.classList.add(HAS_PLACEHOLDER);
      opener.innerText = placeholder;
    }  });
});

// buttons
var btns = {
  init: document.querySelector('.js-init'),
  destroy_2: document.querySelector('.js-destroy-2'),
  destroy: document.querySelector('.js-destroy')
};

var events = Object.keys(btns);

Object.values(btns).forEach(function (btn, i) {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    if (events[i] === 'destroy') {
      selectObjects[0].destroy();
      // selectObjects.forEach(select => {
      //   select.destroy();
      // });
    } else if (events[i] === 'destroy_2') ; else if (events[i] === 'init') {
      selectObjects.forEach(function (select) {
        select.init();
      });
    }
  });
});
