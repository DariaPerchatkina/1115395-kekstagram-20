'use strict';

(function () {
  var preview = {};
  var gallery = window.gallery;
  var utils = window.utils;
  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  var openBigPicture = function (photo) {
    bigPicture.classList.remove('hidden');

    bigPicture.querySelector('img').src = photo.url;
    bigPicture.querySelector('.social__caption').textContent = photo.description;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.social__comments').appendChild(gallery.renderComments(photo.comments));
  };

  var getPictureData = function (data, pictureId) {
    var pictureData = data.find(function (item) {
      return +item.id === +pictureId;
    });
    return pictureData;
  };

  var onBigPhotoClick = function (evt) {
    var pictureEl = evt.target.closest('.picture');
    if (!pictureEl) {
      return;
    }
    var id = pictureEl.dataset.id;
    var pictureObj = getPictureData(window.photos, id);
    openBigPicture(pictureObj);
    document.addEventListener('keydown', onCloseBigPictureEscapePress);
  };


  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onCloseBigPictureEscapePress);
  };

  var onCloseBigPictureEscapePress = function (evt) {
    if (evt.key === utils.ESC_KEY) {
      closeBigPicture();
    }
  };

  pictures.addEventListener('click', onBigPhotoClick);
  bigPictureCancel.addEventListener('click', closeBigPicture);

  window.openBigPicture = preview;
})();
