'use strict';

(function () {
  var slider = {};
  var effect = window.effect;
  var effectPin = document.querySelector('.effect-level__pin');
  var effectLine = document.querySelector('.effect-level__line');

  var effectDepth = document.querySelector('.effect-level__depth');

  effectPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var lineWidth = effectLine.offsetWidth;
    var startCoords = {
      x: evt.clientX
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };
      startCoords = {
        x: moveEvt.clientX
      };
      if (effectPin.offsetLeft < 0) {
        effectPin.style.left = 0 + 'px';
        effectDepth.style.width = 0 + 'px';
      } else if (effectPin.offsetLeft > lineWidth) {
        effectPin.style.left = lineWidth + 'px';
        effectDepth.style.width = lineWidth + 'px';
      } else {
        effectPin.style.left = (effectPin.offsetLeft - shift.x) + 'px';
        effectDepth.style.width = (effectPin.offsetLeft - shift.x) + 'px';
      }
      effect.changeFilterValue();
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.slider = slider;
})();
