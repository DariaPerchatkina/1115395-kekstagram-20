'use strict';
(function () {
  var slider = {};
  var effect = window.effect;
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelLine = document.querySelector('.effect-level__line');

  // добавляем обработчик на маркер для перемещения пина
  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // начальные координаты пина слайдера
    var startCoords = {
      x: evt.clientX
    };

    function onMouseMove(moveEvt) {
      // смещение пина
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      // новые начальные координаты пина слайдера
      startCoords = {
        x: moveEvt.clientX
      };

      // Записываем новые координаты в стили пина и полоски слайдера
      effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift.x) + 'px';
      effectLevelDepth.style.width = (effectLevelPin.offsetLeft - shift.x) + 'px';

      setLimitCoordToSlider();
    }

    // При подгятии мыши убраем обработчики опускания и движения мыши
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var pinLine = {
    min: '0px',
    max: effectLevelLine.offsetWidth - effectLevelPin.offsetWidth + 'px'
  };

  // Функция для ограничения координат
  var setLimitCoordToSlider = function () {
    if (effectLevelPin.offsetLeft < 0 || effectLevelDepth.offsetLeft < 0) {
      effectLevelPin.style.left = pinLine.min;
      effectLevelDepth.style.width = pinLine.min;
    }
    if (effectLevelPin.offsetLeft > 455 || effectLevelDepth.offsetLeft) {
      effectLevelPin.style.left = pinLine.max;
      effectLevelDepth.style.width = pinLine.max;
    }
    effect.changeFilterValue();
  };

  slider.effectLevelDepth = effectLevelDepth;
  slider.effectLevelPin = effectLevelPin;
  window.slider = slider;
})();
