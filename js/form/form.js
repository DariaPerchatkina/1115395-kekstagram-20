'use strict';

(function () {
  var form = {};
  var scale = window.scale;
  var effects = window.effect;
  var formMessage = window.formMessage;
  var utils = window.utils;
  var uploadFormOverlay = document.querySelector('.img-upload__overlay');
  var uploadForm = document.querySelector('.img-upload__form');
  var uploadCancel = document.querySelector('#upload-cancel');
  var uploadFile = document.querySelector('#upload-file');
  var inputHashtag = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');


  var resetFormValues = function () {
    scale.dropPhotoSize();
    effects.resetFilter();
    inputHashtag.value = '';
    textDescription.value = '';
    uploadFile.value = '';
  };

  var formOpen = function () {
    uploadFormOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
  };

  var formClose = function () {
    uploadFormOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    resetFormValues();
  };

  var onPopupEscPress = function (evt) {
    evt.preventDefault();
    if (evt.key === utils.ESC_KEY) {
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
