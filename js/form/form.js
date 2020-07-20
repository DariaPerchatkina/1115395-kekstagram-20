'use strict';

(function () {
  var form = {};
  var utils = window.utils;
  var uploadForm = document.querySelector('.img-upload__overlay'); // находит в разметке по id форму
  var uploadCancel = document.querySelector('#upload-cancel'); // находит в разметке по id кнопку отмены
  var uploadFile = document.querySelector('#upload-file'); // находит в разметке по id скрытый инпут

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
    if (evt.key === utils.ESC_KEY) { // если событие с клавиатуры строго равно значению эскейп на клавиатуре, то вызовется функция закрытия попапа
      evt.preventDefault();
      formClose();
    }
  };

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

  window.form = form;
})();
