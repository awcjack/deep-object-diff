(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports", "../utils"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require("../utils"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.utils);
    global.index = mod.exports;
  }
})(this, function (module, exports, _utils) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

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

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var deletedDiff = function deletedDiff(lhs, rhs) {
    if (lhs === rhs || !(0, _utils.isObject)(lhs) || !(0, _utils.isObject)(rhs)) return {};

    var l = (0, _utils.properObject)(lhs);
    var r = (0, _utils.properObject)(rhs);

    return Object.keys(l).reduce(function (acc, key) {
      if (r.hasOwnProperty(key)) {
        var difference = deletedDiff(l[key], r[key]);

        if ((0, _utils.isObject)(difference) && (0, _utils.isEmpty)(difference)) return acc;

        return _extends({}, acc, _defineProperty({}, key, difference));
      }
      console.log("l[key]", l[key]);
      console.log("l[key]", _typeof(l[key]));
      console.log("r[key]", r[key]);
      if (_typeof(l[key]) === "object" && r[key] === undefined) {
        var _difference = deletedDiff(l[key], {});
        if ((0, _utils.isObject)(_difference) && (0, _utils.isEmpty)(_difference)) return acc;

        return _extends({}, acc, _defineProperty({}, key, _difference));
      }

      return _extends({}, acc, _defineProperty({}, key, { before: l[key], after: undefined }));
    }, {});
  };

  exports.default = deletedDiff;
  module.exports = exports["default"];
});