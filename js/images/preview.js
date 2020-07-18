'use strict';

(function () {
  var preview = {};
  var createPhoto = window.renderPhoto;
  var mockData = window.mockData;
  var utils = window.utils;
  var bigPicture = document.querySelector('.big-picture'); // находит по классу разметке элемент с большой картинкой
  var bigPictureCancel = document.querySelector('.big-picture__cancel');

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  // создадим обьект, укоторый будет содержать данные открытой большой фотографии
  var openBigPicture = function (photo) {
    bigPicture.classList.remove('hidden');

    bigPicture.querySelector('img').src = photo.url; // находим в ДОМ адрес изображение аватарки и подставляем фото автора коммента
    bigPicture.querySelector('.social__caption').textContent = photo.description; // находим в ДОМ адрес изображение аватарки и подставляем фото автора коммента
    bigPicture.querySelector('.likes-count').textContent = photo.likes; // -||- описание изображения и вписываем имя авора коммента
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length; //
    bigPicture.querySelector('.social__comments').appendChild(createPhoto.renderComments(photo.comments)); // добавляет фрагмент в разметку
  };

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  var getPictureData = function (data, pictureId) {
    var pictureData = data.find(function (item) {
      return +item.id === +pictureId;
    });
    return pictureData;
  };

  var onOpenBigPhotoEnterPress = function (evt) {
    if (evt.key === utils.ENTER_KEY) {
      // идем по селектору вверх по родителю и находит в элементе-родитель с классом  picture и ы нем найдет id
      var picture = evt.target.closest('.picture');
      if (picture) {
        var id = picture.dataset.id;
        var pictureObj = getPictureData(mockData.photos, id);
        openBigPicture(pictureObj);
      }
    }
  };

  // открытие большой случайной фотографии
  var onOpenRandomBigPhotoClick = function (evt) {
    var picture = evt.target.closest('.picture');
    if (picture) {
      var id = picture.dataset.id;
      var pictureObj = getPictureData(mockData.photos, id);
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
    if (evt.key === utils.ESC_KEY) {
      closeRandomBigPicture();
    }
  };

  // обработчики для случайных фот
  createPhoto.pictures.addEventListener('click', onOpenRandomBigPhotoClick);
  createPhoto.pictures.addEventListener('keydown', onOpenBigPhotoEnterPress);

  // слушаем обработчик события на крестике и закрываем форму
  bigPictureCancel.addEventListener('click', closeRandomBigPicture);
  document.addEventListener('keydown', onCloseBigPictureEscapePress);

  window.openBigPicture = preview;
})();
