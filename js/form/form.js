'use strict';

(function () {
  var form = {};
  var formMessage = window.formMessage;
  var utils = window.utils;
  var uploadFormOverlay = document.querySelector('.img-upload__overlay'); // находит в разметке по id форму
  var uploadForm = document.querySelector('.img-upload__form');
  var uploadCancel = document.querySelector('#upload-cancel'); // находит в разметке по id кнопку отмены
  var uploadFile = document.querySelector('#upload-file'); // находит в разметке по id скрытый инпут
  var inputHashtag = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');

  var formOpen = function () { // описывает открытие формы
    uploadFormOverlay.classList.remove('hidden'); // у формы в расметке удаляет класс hidden
    document.body.classList.add('modal-open'); // добавляет body класс modal-open
  };

  var formClose = function () { // функция закрытия формы
    uploadFormOverlay.classList.add('hidden'); // добавляет класс hidden
    document.body.classList.remove('modal-open'); // удаляет класс открытия модального окна
  };

  var onPopupEscPress = function (evt) { // управление модалкой при помощи клавиатуры
    evt.preventDefault();
    if (evt.key === utils.ESC_KEY) { // если событие с клавиатуры строго равно значению эскейп на клавиатуре, то вызовется функция закрытия попапа
      formClose();
    }
  };

  var onUpload = function () {
    formClose();
    formMessage.showSuccess();
  };

  var onError = function () {
    formClose();
    formMessage.showError();
  };

  var onUploadFormSubmit = function (evt) {
    evt.preventDefault();
    var formData = new FormData(uploadForm);
    window.api.uploadData(formData, onUpload, onError);
  };

  var openPhoto = function () {
    document.addEventListener('keydown', onPopupEscPress);
    formOpen();
  };

  var closePhoto = function () {
    document.removeEventListener('keydown', onPopupEscPress);
    formClose();
  };


  inputHashtag.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });

  inputHashtag.addEventListener('blur', function () {
    document.addEventListener('keydown', onPopupEscPress);
  });

  textDescription.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });

  textDescription.addEventListener('blur', function () {
    document.addEventListener('keydown', onPopupEscPress);
  });


  uploadFile.addEventListener('change', openPhoto);
  uploadCancel.addEventListener('click', closePhoto);
  uploadForm.addEventListener('submit', onUploadFormSubmit);

  window.form = form;
})();
