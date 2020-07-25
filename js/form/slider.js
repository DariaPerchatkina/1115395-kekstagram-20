'use strict';

(function () {
  var effect = window.effect;
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelLine = document.querySelector('.effect-level__line');

  var onPinMousedown = function (evt) {
    var ratio = null;
    var currentPointX = evt.clientX;
    var parentWidth = evt.target.parentNode.offsetWidth;

    var onMouseMove = function (moveEvent) {
      var pressedX = currentPointX - moveEvent.clientX;
      var passedX = evt.target.offsetLeft - pressedX;

      if (passedX < 0) {
        passedX = 0;
      }
      if (passedX > parentWidth) {
        passedX = parentWidth;
      }
      currentPointX = moveEvent.clientX;
      ratio = passedX / parentWidth;

      // window.slider = ratio;

      effectLevelPin.style.left = (ratio * 100) + '%';
      effectLevelDepth.style.width = (ratio * 100) + '%';
      effectLevelLine.value = Math.round(ratio * 100);
      effect.changeFilterValue();
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
  };


  effectLevelPin.addEventListener('mousedown', onPinMousedown);
})();
