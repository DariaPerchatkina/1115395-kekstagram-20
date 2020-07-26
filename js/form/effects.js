'use strict';

(function () {
  var effect = {};
  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var effectsList = document.querySelector('.effects__list');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelLine = document.querySelector('.effect-level__line');

  var setFilterValue = function (filterName, percent) {
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

  var onfilterChange = function (evt) {
    imgUploadPreview.classList = '';
    imgUploadPreview.classList.add('effects__preview--' + evt.target.value);
    if (evt.target.value !== 'none') {
      imgUploadEffectLevel.classList.remove('hidden');
    } else {
      imgUploadEffectLevel.classList.add('hidden');
    }
  };

  var resetFilter = function () {
    effectLevelValue.value = 100;
    effectLevelPin.style.left = 100 + '%';
    effectLevelDepth.style.width = 100 + '%';
    imgUploadPreview.classList = '';
    imgUploadPreview.style.filter = '';
    effectsList.querySelector('#effect-none').checked = true;
  };

  var getLevelPin = function () {
    var positionX = effectLevelPin.offsetLeft;
    var lineWidth = effectLevelLine.offsetWidth;
    var percent = Math.round(100 * positionX / lineWidth);
    effectLevelValue.value = percent;
    return percent;
  };

  var changeFilterValue = function () {
    var current = document.querySelector('.effects__radio:checked');
    setFilterValue(current.value, getLevelPin());
  };

  effectsList.addEventListener('change', onfilterChange);

  effect.resetFilter = resetFilter;
  effect.changeFilterValue = changeFilterValue;
  window.effect = effect;
})();
