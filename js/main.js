'use strict';

// создадим массив имен пользователей и их сообщения


var bigPicture = document.querySelector('.big-picture'); // находит по классу разметке элемент с большой картинкой
var bigPictureCancel = document.querySelector('.big-picture__cancel');
var uploadFile = document.querySelector('#upload-file'); // находит в разметке по id скрытый инпут
var uploadCancel = document.querySelector('#upload-cancel'); // находит в разметке по id кнопку отмены
var uploadForm = document.querySelector('.img-upload__overlay'); // находит в разметке по id форму
var textHashtags = document.querySelector('.text__hashtags');
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var effectPin = document.querySelector('.effect-level__pin');
var effectList = document.querySelector('.effects__list');
// var effectValue = document.querySelector('.effect-level__value');
// var effectLevel;
var imgUploadPreview = document.querySelector('.img-upload__preview');
var scaleControlValue = document.querySelector('.scale__control--value');
var scaleParam = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
  MEASURE: '%'
};
var imgUploadScale = document.querySelector('.img-upload__scale');
var inputHashtag = document.querySelector('.text__hashtags');
var MAX_LENGT_HASHTAG = 20;
var HASHTAG_COUNT = 5;
var SYMBOL = /[#-a-z0-9а-яA-ZА-Я]/;
var textDescription = document.querySelector('.text__description');



// открытие формы загрузки фото
var formOpen = function () { // описывает открытие формы
  uploadForm.classList.remove('hidden'); // у формы в расметке удаляет класс hidden
  document.body.classList.add('modal-open'); // добавляет body класс modal-open
};

var formClose = function () { // функция закрытия формы
  uploadForm.classList.add('hidden'); // добавляет класс hidden
  document.body.classList.remove('modal-open'); // удаляет класс открытия модального окна
};

var onPopupEscPress = function (evt) { // управление модалкой при помощи клавиатуры
  if (evt.key === ESC_KEY) { // если событие с клавиатуры строго равно значению эскейп на клавиатуре, то вызовется функция закрытия попапа
    evt.preventDefault();
    formClose();
  }
};

textHashtags.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

textHashtags.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});


var openPhoto = function () {
  document.addEventListener('keydown', onPopupEscPress);
  formOpen();
};

var closePhoto = function () {
  document.removeEventListener('keydown', onPopupEscPress);
  formClose();
};

// слушаем событие change на инпуте и открываем форму загрузки фото и открываем форму
uploadFile.addEventListener('change', openPhoto);

// слушаем обработчик события на крестике и закрываем форму
uploadCancel.addEventListener('click', closePhoto);

// При смене эффекта, выбором одного из значений среди радиокнопок .effects__radio,
// добавить картинке внутри .img-upload__preview CSS-класс, соответствующий эффекту.
// Например, если выбран эффект .effect-chrome, изображению нужно добавить класс effects__preview--chrome.

var onEffectListChange = function (evt) {
  // если происходит событие и оно происходит точно на инпуте с  типом radio(evt.target.matches=true), то сбрось класс и добавь тот класс, который соответстует значению valut на текущем input
  if (evt.target && evt.target.matches('input[type="radio"]')) {
    imgUploadPreview.className = 'img-upload__preview effects__preview--' + evt.target.value;
  }
};

// редактирование размера фото
var setPhotoSize = function (value) {
  imgUploadPreview.style.transform = 'scale(' + (value / 100) + ')';
};

var onScaleControlClick = function (evt) {
  var scaleNum = parseInt(scaleControlValue.value, 10);
  if (scaleNum > scaleParam.MIN && evt.target.classList.contains('scale__control--smaller')) {
    scaleNum -= scaleParam.STEP;
    scaleControlValue.value = scaleNum + scaleParam.MEASURE;
  } else if (scaleNum < scaleParam.MAX && evt.target.classList.contains('scale__control--bigger')) {
    scaleNum += scaleParam.STEP;
    scaleControlValue.value = scaleNum + scaleParam.MEASURE;
  }
  setPhotoSize(scaleNum);
};

imgUploadScale.addEventListener('click', onScaleControlClick);

// смена фильтра
effectList.addEventListener('change', onEffectListChange);

var onEffectPinMouseUp = function () {

};

effectPin.addEventListener('mousup', onEffectPinMouseUp);

var getPictureData = function (data, pictureId) {
  var pictureData = data.find(function (item) {
    return +item.id === +pictureId;
  });
  return pictureData;
};

var onOpenBigPhotoEnterPress = function (evt) {
  if (evt.key === ENTER_KEY) {
    // идем по селектору вверх по родителю и находит в элементе-родитель с классом  picture и ы нем найдет id
    var picture = evt.target.closest('.picture');
    if (picture) {
      var id = picture.dataset.id;
      var pictureObj = getPictureData(photos, id);
      openBigPicture(pictureObj);
    }
  }
};

// открытие большой случайной фотографии
var onOpenRandomBigPhotoClick = function (evt) {
  var picture = evt.target.closest('.picture');
  if (picture) {
    var id = picture.dataset.id;
    var pictureObj = getPictureData(photos, id);
    openBigPicture(pictureObj);
    document.addEventListener('keydown', onCloseBigPictureEscapePress);
  }
};

// Закрытие большого фото
var closeRandomBigPicture = function () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onCloseBigPictureEscapePress);
};

var onCloseBigPictureEscapePress = function (evt) {
  if (evt.key === ESC_KEY) {
    closeRandomBigPicture();
  }
};

// обработчики для случайных фот
pictures.addEventListener('click', onOpenRandomBigPhotoClick);
pictures.addEventListener('keydown', onOpenBigPhotoEnterPress);

// слушаем обработчик события на крестике и закрываем форму
bigPictureCancel.addEventListener('click', closeRandomBigPicture);
document.addEventListener('keydown', onCloseBigPictureEscapePress);

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
      } else if (!SYMBOL.test(textHashtags.value)) {
        inputHashtag.setCustomValidity('строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (@, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.');
      } else {
        inputHashtag.setCustomValidity('');
      }
    }
  }
};
inputHashtag.addEventListener('input', hashtagsValidity);

// валидация - когда фокус на комменте - не закрывать его

textDescription.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

textDescription.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});
