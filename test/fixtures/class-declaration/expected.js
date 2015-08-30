"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*:: declare class Foo<T> {
  val: T;
  constructor(val: Array<T>): void;
  show(): T;
}*/
var Foo = (function () {
  function Foo /*:: <T>*/(val /*: Array<T>*/) {
    _classCallCheck(this, Foo);

    this.val = val[0];
  }

  _createClass(Foo, [{
    key: "show",
    value: function show() {
      return this.val;
    }
  }]);

  return Foo;
})();

exports.Foo = Foo;
/*:: declare class Bar<T> extends Foo<T> {
  shows(): [T,T];
  get origVal(): T;
  set origVal(val: T): void;
  echo<A>(val: A): A;
}*/
var Bar = (function (_Foo) {
  _inherits(Bar, _Foo);

  function Bar /*:: <T>*/() {
    _classCallCheck(this, Bar);

    _get(Object.getPrototypeOf(Bar.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(Bar, [{
    key: "shows",
    value: function shows() {
      return [this.val, this.val];
    }
  }, {
    key: "echo",
    value: function echo(val) {
      return val;
    }
  }, {
    key: "origVal",
    get: function get() {
      return this.val;
    },
    set: function set(val) {
      this.val = val;
    }
  }]);

  return Bar;
})(Foo);

exports.Bar = Bar;
