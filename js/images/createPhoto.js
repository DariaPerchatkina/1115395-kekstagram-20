'use strict';

(function () {
  var createPhoto = {};
  // var mockData = window.mockData;
  var load = window.load;
  var upload = window.upload;
  var commentsList = document.querySelector('.social__comments'); // находит по классу в разметке список с комментариями

  var fillPhotoTemplate = function (photo) { // создаем функцию, которая отрисовывает фото
    var similarPhotoTemplate = document.querySelector('#picture') // находим элемент темплейт, куда вставим фото
      .content
      .querySelector('.picture');

    var photoElement = similarPhotoTemplate.cloneNode(true); // делаем дубликат узла template

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.dataset.id = photo.id;

    return photoElement; // возвращаем полученный склонированный элемент с новым содержимым
  };

  var pictures = document.querySelector('.pictures');

  // window.load(function (photo) {

  // })
  var successHandler = function (photos) {
    var renderPhotos = function (photoElem) {
      var fragment = document.createDocumentFragment(); // создаем пустой объект DocumentFragment
      for (var i = 0; i < photoElem.length; i++) { // условия работы цикла, идет переборка массива случайно созданных фото
        fragment.appendChild(fillPhotoTemplate(photoElem[i])); // добавляет созданное фото во фрагмент
      }
      pictures.appendChild(fragment); // добавляет фрагмент в разметку
    };
    renderPhotos(photos);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  load(successHandler, errorHandler);

  var imgUpload = document.querySelector('.img-upload');
  var form = imgUpload.querySelector('.img-upload__form');
  var submitHandler = function (evt) {
    upload(new FormData(form), function () {
      imgUpload.classList.add('hidden');
    });
    evt.preventDefault();
  };
  form.addEventListener('submit', submitHandler);


  // // описание фотографии из рандомных данных и добавление в пустой массив commentssArr
  // var getRandomComments = function () { // создаем функцию, которая будет генерировать случайные комментарии от пользователя
  //   var commentsArr = []; // делаем пустой массив данных
  //   for (var i = 0; i <= mockData.getRandomNumber(1, 10); i++) { // условия работы цикла
  //     // в процессе работы цикла создается объект
  //     // создадим обьект и при помощи push добавим его в массив arr(в нашем случае это пустой массив commetsArr)
  //     commentsArr.push(mockData.getCommentObj(mockData.MESSAGES, mockData.NAMES));
  //   }
  //   return commentsArr;
  // };

  var fillCommentElement = function (comment) { // создаем функцию, для формирования коммента для элемента списка
    var commentItem = commentsList.querySelector('.social__comment'); // находит по классу элемент списка
    var commentElement = commentItem.cloneNode(true); // делаем дубликат узла template

    commentElement.querySelector('.social__picture').src = comment.avatar; // заполняет найденный по классу src содердимым из объекта commentObj
    commentElement.querySelector('.social__picture').alt = comment.name; // -||- alt
    commentElement.querySelector('.social__text').textContent = comment.message; // -||- текст комментария

    return commentElement; // возвращает сформированный коммент
  };

  var renderComments = function (commentsArr) {
    var fragment = document.createDocumentFragment(); // создаем пустой объект DocumentFragment

    for (var i = 0; i < commentsArr.length; i++) { // цикл
      fragment.appendChild(fillCommentElement(commentsArr[i])); // добавляет созданную фото во фрагмент
    }
    return fragment;
  };

  createPhoto.pictures = pictures;
  // createPhoto.getRandomComments = getRandomComments;
  createPhoto.renderComments = renderComments;
  window.renderPhoto = createPhoto;
})();
