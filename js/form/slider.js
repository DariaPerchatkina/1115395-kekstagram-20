
'use strict';
(function () {
  // Задаем переменные
  var uploadEffectLevelPin = document.querySelector('.effect-level__pin');
  var uploadEffectLevelVal = document.querySelector('.effect-level__depth');


  // добавляем обработчик на маркер для перемещения пина
  uploadEffectLevelPin.addEventListener('mousedown', function (evt) {
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

      // новыеначальные координаты пина слайдера
      startCoords = {
        x: moveEvt.clientX
      };

      // Записываем новые координаты в стили пина и полоски слайдера
      uploadEffectLevelPin.style.left = (uploadEffectLevelPin.offsetLeft - shift.x) + 'px';
      uploadEffectLevelVal.style.width = (uploadEffectLevelPin.offsetLeft - shift.x) + 'px';

      setLimitCoordToSlider();
      window.filtereffect.setFilterEffectToImage();
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

  var pin = {
    min: '0px',
    max: '455px'
  };

  // Функция для ограничения координат
  function setLimitCoordToSlider() {
    if (uploadEffectLevelPin.offsetLeft < 0 || uploadEffectLevelVal.offsetLeft < 0) {
      uploadEffectLevelPin.style.left = pin.min;
      uploadEffectLevelVal.style.width = pin.min;
    }
    if (uploadEffectLevelPin.offsetLeft > 455 || uploadEffectLevelVal.offsetLeft) {
      uploadEffectLevelPin.style.left = pin.max;
      uploadEffectLevelVal.style.width = pin.max;
    }
  }

})();
