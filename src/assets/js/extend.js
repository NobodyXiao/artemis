
(function (GLOBAL) {
  'use strict';
  var Context = '123456';
/*
  function BBig() {
    function Big(n) {
      var x = this;
    }
    Big.Context = Context
    return Big;
  };
  // Export


  var Big = BBig();

  
  Big['default'] = Big.Big = Big;
  */

 function BBig() {
  var Context = {

  };
  return Big;
};

var Big = BBig();
Big['default'] = Big.Big = Big;
  //AMD.
  if (typeof define === 'function' && define.amd) {
    define(function () { return Big; });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = Big;
  } else {
    GLOBAL.Big = Big;
  }
})(this);
