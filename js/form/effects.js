'use strict';

(function () {
  var effect = {};
  var slider = window.slider;
  var effectList = document.querySelector('.effects__list');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var imgUploadPreview = document.querySelector('.img-upload__preview');

  var onEffectListChange = function (evt) {
    // если происходит событие и оно происходит точно на инпуте с  типом radio(evt.target.matches=true), то сбрось класс и добавь тот класс, который соответстует значению valut на текущем input
    if (evt.target && evt.target.matches('input[type="radio"]')) {
      imgUploadPreview.className = 'img-upload__preview effects__preview--' + evt.target.value;
    }
  };

  function setFilterValue(filterName, percent) {
    switch (filterName) {
      case 'none':
        imgUploadPreview.style.filter = '';
        break;
      case 'chrome':
        imgUploadPreview.style.filter = 'grayscale(' + percent / 100 + ')';
        break;
      case 'sepia':
        imgUploadPreview.style.filter = 'sepia(' + percent / 100 + ')';
        break;
      case 'marvin':
        imgUploadPreview.style.filter = 'invert(' + percent + '%)';
        break;
      case 'phobos':
        imgUploadPreview.style.filter = 'blur(' + (percent * 3 / 100) + 'px)';
        break;
      case 'heat':
        imgUploadPreview.style.filter = 'brightness(' + percent * 3 / 100 + ')';
        break;
    }
  }

  function getLevelPin() {
    var positionX = slider.effectPin.offsetLeft;
    var lineWidth = slider.effectLine.offsetWidth;
    var percent = Math.round(100 * positionX / lineWidth);
    return percent;
  }

  function changeFilterValue() {
    var current = document.querySelector('.effects__radio:checked');
    var percent = getLevelPin();
    effectLevelValue.value = percent;
    effect.setFilterValue(current.value, percent);
  }

  // смена фильтра
  effectList.addEventListener('change', onEffectListChange);

  effect.setFilterValue = setFilterValue;

  effect.changeFilterValue = changeFilterValue;
  window.effect = effect;
})();
