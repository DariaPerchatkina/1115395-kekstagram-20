'use strict';

(function () {
  // var slider = {};
  // // var effect = window.effect;
  // var effectLevelPin = document.querySelector('.effect-level__pin');
  // var effectLevelDepth = document.querySelector('.effect-level__depth');
  // var effectLevelLine = document.querySelector('.effect-level__line');

  // effectLevelPin.addEventListener('mousedown', function (evt) {
  //   evt.preventDefault();
  //   // var lineWidth = effectLevelLine.offsetWidth;
  //   var startCoords = {
  //     x: evt.clientX
  //   };

  //   function onMouseMove(moveEvt) {
  //     moveEvt.preventDefault();
  //     var shift = {
  //       x: startCoords.x - moveEvt.clientX
  //     };
  //     startCoords = {
  //       x: moveEvt.clientX
  //     };
  //     effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift.x) + 'px';
  //   }

  //   function onMouseUp(upEvt) {
  //     upEvt.preventDefault();
  //     document.removeEventListener('mousemove', onMouseMove);
  //     document.removeEventListener('mouseup', onMouseUp);
  //   }

  //   document.addEventListener('mousemove', onMouseMove);
  //   document.addEventListener('mouseup', onMouseUp);
  // });
  // window.slider = slider;
  var uploadEffectLevelPin = document.querySelector('.effect-level__pin');

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
})();