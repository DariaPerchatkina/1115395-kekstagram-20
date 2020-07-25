'use strict';

(function () {
  var utils = {};
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var clip = function (value, minValue, maxValue) {
    return Math.max(minValue, Math.min(maxValue, value));
  };

  utils.clip = clip;
  utils.ESC_KEY = ESC_KEY;
  utils.ENTER_KEY = ENTER_KEY;
  window.utils = utils;
})();
