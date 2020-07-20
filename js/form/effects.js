'use strict';

(function () {
  var effect = {};
  // var slider = window.slider;
  var effectList = document.querySelector('.effects__list');
  // var effectLevelValue = document.querySelector('.effect-level__value');
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var MAX_SLIDER_VALUE = 455;

  var onEffectListChange = function (evt) {
    // если происходит событие и оно происходит точно на инпуте с  типом radio(evt.target.matches=true), то сбрось класс и добавь тот класс, который соответстует значению valut на текущем input
    if (evt.target && evt.target.matches('input[type="radio"]')) {
      imgUploadPreview.className = 'img-upload__preview effects__preview--' + evt.target.value;
    }
  };

  var setCoefToSlider = function (filterName, maxValue, simbol) {
    var coef = window.slider.uploadEffectLevelPin.offsetLeft / MAX_SLIDER_VALUE;
    window.picturesetup.effectImage.style.filter = filterName + '(' + (maxValue * coef) + simbol + ')';
  };

  var filtrtImage = {
    chrome: {
      filter: 'grayscale',
      maxEffectValue: 1
    },
    sepia:
    {
      filter: 'sepia',
      maxEffectValue: 1
    },
    marvin:
      {
        filter: 'invert',
        maxEffectValue: 1
      },
    phobos:
    {
      filter: 'blur',
      maxEffectValue: 3
    },
    heat:
      {
        filter: 'brightness',
        maxEffectValue: 3
      }
  };

  var setFilterEffectToImage = function () {
    switch (window.picturesetup.effectImage.id) {
      case 'effect-none':
        window.picturesetup.effectImage.style.filter = '';
        break;
      case 'effect-chrome':
        setCoefToSlider(filtrtImage.chrome.filter, filtrtImage.chrome.maxEffectValue, '');
        break;
      case 'effect-sepia':
        setCoefToSlider(filtrtImage.sepia.filter, filtrtImage.sepia.maxEffectValue, '');
        break;
      case 'effect-marvin':
        setCoefToSlider(filtrtImage.marvin.filter, filtrtImage.marvin.maxEffectValue, '');
        break;
      case 'effect-phobos':
        setCoefToSlider(filtrtImage.phobos.filter, filtrtImage.phobos.maxEffectValue, 'px');
        break;
      case 'effect-heat':
        setCoefToSlider(filtrtImage.heat.filter, filtrtImage.heat.maxEffectValue, '');
        break;
    }
  };

  // смена фильтра
  effectList.addEventListener('change', onEffectListChange);

  effect.setFilterEffectToImage = setFilterEffectToImage;
  window.effect = effect;
})();
