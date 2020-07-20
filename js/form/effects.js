'use strict';

(function () {
  var effect = {};
  var effectList = document.querySelector('.effects__list');
  var imgUploadPreview = document.querySelector('.img-upload__preview');

  var onEffectListChange = function (evt) {
    // если происходит событие и оно происходит точно на инпуте с  типом radio(evt.target.matches=true), то сбрось класс и добавь тот класс, который соответстует значению valut на текущем input
    if (evt.target && evt.target.matches('input[type="radio"]')) {
      imgUploadPreview.className = 'img-upload__preview effects__preview--' + evt.target.value;
    }
  };

  // смена фильтра
  effectList.addEventListener('change', onEffectListChange);

  window.effect = effect;
})();
