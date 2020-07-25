'use strict';

(function () {
  var validation = {};
  var inputHashtag = document.querySelector('.text__hashtags');
  var MAX_LENGT_HASHTAG = 20;
  var HASHTAG_COUNT = 5;
  var SYMBOL = /[#-a-z0-9а-яA-ZА-Я]/;
  // валидация
  var hashtagsValidity = function () {
    // создаем переменную, которая содержит длину хэштега
    var hashtagInputError = inputHashtag.value;
    // приведем хэштег к нижнему регистру
    var lowerCaseHashtag = hashtagInputError.toLowerCase();
    // создаем массив хэштегов и разделяем их пробелом
    var hashtagArr = lowerCaseHashtag.split(' ');
    // если хэштегов нет, то очистим поле ошибки
    if (inputHashtag.value.length === 0) {
      inputHashtag.setCustomValidity('');
    } else if (hashtagArr.length > HASHTAG_COUNT) {
      inputHashtag.setCustomValidity('нельзя указать больше пяти хэш-тегов');
    } else {
      for (var i = 0; i < hashtagArr.length; i++) {
        if (hashtagArr[i][0] !== '#' || hashtagArr[0][0] !== '#') {
          inputHashtag.setCustomValidity('хеш-тег начинается с #');
        } else if (hashtagArr[i] === '#') {
          inputHashtag.setCustomValidity('хеш-тег не может состоять только из одной решётки');
        } else if (hashtagArr.indexOf(hashtagArr[i]) !== i) {
          inputHashtag.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
        } else if (hashtagArr[i].length > MAX_LENGT_HASHTAG) {
          inputHashtag.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
        } else if (hashtagArr[i].split('#').length > 2) {
          inputHashtag.setCustomValidity('хэш-теги должны быть разделены пробелами');
        } else if (!SYMBOL.test(inputHashtag.value)) {
          inputHashtag.setCustomValidity('строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (@, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.');
        } else {
          inputHashtag.setCustomValidity('');
        }
      }
    }
  };

  inputHashtag.addEventListener('input', hashtagsValidity);

  window.validation = validation;
})();
