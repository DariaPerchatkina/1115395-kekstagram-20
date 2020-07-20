'use strict';
(function () {
  var slider = {};
  var effectLevelPin = document.querySelector('.effect-level__pin');

  var effectsList = document.querySelector('.effects__list');
  var imgUploadPreview = document.querySelector('.img-upload__preview img');

  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');

  var getFilterValue = function (filterName, percent) {
    if (filterName === 'none') {
      imgUploadPreview.style.filter = '';
    }
    if (filterName === 'chrome') {
      imgUploadPreview.style.filter = 'grayscale(' + percent / 100 + ')';
    }
    if (filterName === 'sepia') {
      imgUploadPreview.style.filter = 'sepia(' + percent / 100 + ')';
    }
    if (filterName === 'marvin') {
      imgUploadPreview.style.filter = 'invert(' + percent + '%)';
    }
    if (filterName === 'phobos') {
      imgUploadPreview.style.filter = 'blur(' + (percent * 3 / 100) + 'px)';
    }
    if (filterName === 'heat') {
      imgUploadPreview.style.filter = 'brightness(' + percent * 3 / 100 + ')';
    }
  };

  imgUploadEffectLevel.classList.add('hidden');

  var filterChange = function (evt) {
    effectLevelValue.value = 100;
    effectLevelPin.style.left = 100 + '%';
    effectLevelDepth.style.width = 100 + '%';
    imgUploadPreview.classList = '';
    imgUploadPreview.style.filter = '';
    imgUploadPreview.classList.add('effects__preview--' + evt.target.value);
    if (evt.target.value !== 'none') {
      imgUploadEffectLevel.classList.remove('hidden');
    } else {
      imgUploadEffectLevel.classList.add('hidden');
    }
  };
  effectsList.addEventListener('change', filterChange);

  var getLevelPin = function () {
    var positionX = effectLevelPin.offsetLeft;
    var lineWidth = effectLevelLine.offsetWidth;
    var percent = Math.round(100 * positionX / lineWidth);
    effectLevelValue.value = percent;
    return percent;
  };

  var changeFilterValue = function () {
    var current = document.querySelector('.effects__radio:checked');
    getFilterValue(current.value, getLevelPin());
  };

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
      // window.filtereffect.setFilterEffectToImage();
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
    if (effectLevelPin.offsetLeft < 0 || effectLevelDepth.offsetLeft < 0) {
      effectLevelPin.style.left = pin.min;
      effectLevelDepth.style.width = pin.min;
    }
    if (effectLevelPin.offsetLeft > 455 || effectLevelDepth.offsetLeft) {
      effectLevelPin.style.left = pin.max;
      effectLevelDepth.style.width = pin.max;
    }
    changeFilterValue();
  }

  slider.changeFilterValue = changeFilterValue;
  window.slider = slider;
})();
