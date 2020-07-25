'use strict';

(function () {
  var utils = {};
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var clip = function (value, minValue, maxValue) {
    return Math.max(minValue, Math.min(maxValue, value));
  };

  var getRandomNumber = function (minNumber, maxNumber) {
    var randomNum = Math.floor(Math.random() * maxNumber);
    return randomNum > minNumber ? randomNum : minNumber;
  };

  var fisherYates = function (array, length) {
    var len = length < array.length ? length : array.length;
    var copy = array.slice(0);
    var result = [];
    var temp;

    for (var i = 0; i < len; i++) {
      temp = getRandomNumber(0, copy.length - 1);
      result.push(copy.splice(temp, 1)[0]);
    }

    return result;
  };

  var debounce = function (callBack, intervalal) {
    var lastTimeout = null;
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        callBack.apply(null, parameters);
      }, intervalal);
    };
  };

  utils.debounce = debounce;
  utils.fisherYates = fisherYates;
  utils.clip = clip;
  utils.ESC_KEY = ESC_KEY;
  utils.ENTER_KEY = ENTER_KEY;
  window.utils = utils;
})();
