'use strict';

(function () {
  var preview = {};
  var utils = window.utils;
  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var buttonLoader = document.querySelector('.comments-loader');
  var commentCount = document.querySelector('.social__comment-count');
  var commentsList = bigPicture.querySelector('.social__comments');
  var count = 0;
  var MAX_COUNT_COMMENTS = 5;
  var commentsCopy = [];

  var dropCommets = function () {
    while (commentsList.firstChild) {
      commentsList.firstChild.remove();
    }
  };

  var fillCommentElement = function (comment) {
    var commentsTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
    var commentElement = commentsTemplate.cloneNode(true);

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


  var calcCommentsList = function (commentsArr) {
    commentsCopy = commentsArr.slice();
    if (commentsCopy.length > MAX_COUNT_COMMENTS) {
      buttonLoader.classList.remove('hidden');
      commentsList.appendChild(renderComments(commentsCopy.splice(0, MAX_COUNT_COMMENTS)));
    } else {
      buttonLoader.classList.add('hidden');
      commentsList.appendChild(renderComments(commentsCopy));
    }
  };

  var onButtonLoaderClick = function () {
    calcCommentsList(commentsCopy);
    var showedComments = bigPicture.querySelectorAll('.social__comment');
    renderCommentsCount(showedComments);
  };

  var renderCommentsCount = function (comments) {
    commentCount.textContent = '';
    var commentsCountContent = comments.length + ' из <span class="comments-count">' + count + '</span> комментариев';

    commentCount.insertAdjacentHTML('afterbegin', commentsCountContent);
  };

  var refreshCommentsCount = function (counter) {
    commentCount.innerHTML = counter + ' из <span class="comments-count">125</span> комментариев';
  };

  var openBigPicture = function (photo) {
    count = photo.comments.length;
    if (count > MAX_COUNT_COMMENTS) {
      refreshCommentsCount(MAX_COUNT_COMMENTS);
    } else {
      refreshCommentsCount(count);
    }
    bigPicture.classList.remove('hidden');

    bigPicture.querySelector('img').src = photo.url;
    bigPicture.querySelector('.social__caption').textContent = photo.description;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.social__comments').appendChild(renderComments(photo.comments));
    dropCommets();
    calcCommentsList(photo.comments);
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
    buttonLoader.addEventListener('click', onButtonLoaderClick);
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onCloseBigPictureEscapePress);
    buttonLoader.removeEventListener('click', onButtonLoaderClick);
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
