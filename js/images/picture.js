'use strict';

(function () {
  var picture = {};
  var commentsList = document.querySelector('.social__comments');
  var pictures = document.querySelector('.pictures');

  var fillPhotoTemplate = function (photo) {
    var similarPhotoTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');

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

  var fillCommentElement = function (comment) {
    var commentItem = commentsList.querySelector('.social__comment');
    var commentElement = commentItem.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;

    return commentElement;
  };

  var renderComments = function (commentsArr) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < commentsArr.length; i++) {
      fragment.appendChild(fillCommentElement(commentsArr[i]));
    }
    return fragment;
  };

  var onLoad = function (photos) {
    window.photos = photos;
    renderPhotos(photos);
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

  picture.renderComments = renderComments;
  window.api.loadData(onLoad, onError);
  window.renderPhoto = picture;
})();
