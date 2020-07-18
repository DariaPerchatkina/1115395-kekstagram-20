'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture'); // находит по классу разметке элемент с большой картинкой
  var pictures = document.querySelector('.pictures');
  var commentsList = document.querySelector('.social__comments'); // находит по классу в разметке список с комментариями

  // ф-я которая принимает аргументом счетчик и массив
  // в цикле от 1 до значения <= count дабавляй в массив индекс i и в результате после работы функции в цикле верни нам массив indexPhotoArr
  var createIndexRandomArr = function (count) {
    // создаем функцию, которая позволит нам получить массив индексов для фотографий
    var indexPhotoArr = []; // создаем пустой массив
    for (var i = 1; i <= count; i++) {
      indexPhotoArr.push(i);
    }
    return indexPhotoArr;
  };

  // описание фотографии из рандомных данных и добавление в пустой массив photosArr
  var createPhotosRandom = function (count) { // создаем функцию, которая будет генерировать случайные описания фотографии пользователя
    var photosArr = []; // делаем пустой массив данных

    for (var i = 0; i < count; i++) { // условия работы цикла
      // в процессе работы цикла создается объект
      // создадим обьект и при помощи push добавим его в массив arr(в нашем случае это пустой массив photosArr)
      photosArr.push(getPhotoObj(i));
    }
    return photosArr;
  };

  // описание фотографии из рандомных данных и добавление в пустой массив commentssArr
  var getRandomComments = function () { // создаем функцию, которая будет генерировать случайные комментарии от пользователя
    var commentsArr = []; // делаем пустой массив данных
    for (var i = 0; i <= window.utils.getRandomNumber(1, 10); i++) { // условия работы цикла
      // в процессе работы цикла создается объект
      // создадим обьект и при помощи push добавим его в массив arr(в нашем случае это пустой массив commetsArr)
      commentsArr.push(getCommentObj(window.data.MESSAGES, window.data.NAMES));
    }
    return commentsArr;
  };

  var getCommentObj = function () {
    return {
      avatar: 'img/avatar-' + window.utils.getRandomNumber(1, 6) + '.svg',
      name: window.utils.getRandomValueFromArr(window.data.NAMES),
      message: window.utils.getRandomValueFromArr(window.data.MESSAGES)
    };
  };

  var getPhotoObj = function (i) {
    return {
      id: i,
      url: 'photos/' + window.utils.getRandomNoRepeatArr(createIndexRandomArr(window.utils.COUNT)) + '.jpg',
      description: window.utils.getRandomValueFromArr(window.data.DESCRIPTION),
      likes: window.utils.getRandomNumber(window.utils.likesMin, window.utils.likesMax),
      comments: getRandomComments(window.data.MESSAGES, window.data.NAMES)
    };
  };

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

  var renderPhotos = function (photoElem) {
    var fragment = document.createDocumentFragment(); // создаем пустой объект DocumentFragment
    for (var i = 0; i < photoElem.length; i++) { // условия работы цикла, идет переборка массива случайно созданных фото
      fragment.appendChild(fillPhotoTemplate(photoElem[i])); // добавляет созданное фото во фрагмент
    }
    pictures.appendChild(fragment); // добавляет фрагмент в разметку
    console.log(photoElem);
  };
  var photos = createPhotosRandom(window.utils.COUNT);
  console.log(photos);

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

  // создадим обьект, укоторый будет содержать данные открытой большой фотографии
  var openBigPicture = function (photo) {
    bigPicture.querySelector('img').src = photo.url; // находим в ДОМ адрес изображение аватарки и подставляем фото автора коммента
    bigPicture.querySelector('.social__caption').textContent = photo.description; // находим в ДОМ адрес изображение аватарки и подставляем фото автора коммента
    bigPicture.querySelector('.likes-count').textContent = photo.likes; // -||- описание изображения и вписываем имя авора коммента
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length; //
    bigPicture.querySelector('.social__comments').appendChild(renderComments(photo.comments)); // добавляет фрагмент в разметку
    bigPicture.classList.remove('hidden');
  };

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  // document.body.classList.add('modal-open');

  renderPhotos(photos);

  window.images = {
    bigPicture: bigPicture,
    pictures: pictures,
    commentsList: commentsList,
    photos: photos,
    openBigPicture: openBigPicture
  };
})();
