'use strict';

(function () {
  var gallery = {};
  var pictures = document.querySelector('.pictures');

  var dropPhotos = function () {
    var photos = document.querySelectorAll('.picture');
    photos.forEach(function (item) {
      pictures.removeChild(item);
    });
  };

  var fillPhotoTemplate = function (photo) {
    var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var photoElement = similarPhotoTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.dataset.id = photo.id;

    return photoElement;
  };

  var renderPhotos = function (photoElem) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photoElem.length; i++) {
      photoElem[i].id = i;
      fragment.appendChild(fillPhotoTemplate(photoElem[i]));
    }
    pictures.appendChild(fragment);
  };

  var onLoad = function (photos) {
    window.photos = photos;
    renderPhotos(photos);
    window.filters.initialize();
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  gallery.renderPhotos = renderPhotos;
  gallery.dropPhotos = dropPhotos;
  window.api.loadData(onLoad, onError);
  window.gallery = gallery;
})();
