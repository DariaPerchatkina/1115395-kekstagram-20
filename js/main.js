'use strict';

// создадим массив имен пользователей и их сообщения
var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = ['Аня', 'Саша', 'Маша', 'Иван', 'Никита', 'Юля'];
var DESCRIPTION = [
  'Мама мия, какой закат',
  'Какую брать - эту или эту?',
  'Всем продуктивного дня!',
  'А мы в отпуск!!!',
  'Го гулять, погодка огонь!',
  'Ешь, молись, люби, а потом иди на работу',
  'Ставьте лайки, подписывайтесь на мой канал, жмите на колокольчик',
  'Проснулся, умылся и ты красавчик',
  'И пусть весь мир подождет',
  'Видили ночь, гуляли всю ночь до утра',
  'Рожденный ползать - летать не может сам, но на самолете вполне себе смог',
  'Снег в апреле? Что за дела?????',
  'Умей радоваться мелочам'
];
var COUNT = 25; // счетчик числа фотографий
var likesMin = 15; // мин число лайков у фото
var likesMax = 250; // макс число лайков у фото
var bigPicture = document.querySelector('.big-picture'); // находит по классу разметке элемент с большой картинкой
var commentsList = document.querySelector('.social__comments'); // находит по классу в разметке список с комментариями


// находит случайное целое число в указанном диапазоне
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// создадим функцию, которая позволит получать не повторющиеся элементы массива
var getRandomNoRepeatArr = function (arr) {
  return arr.splice(Math.floor(Math.random() * arr.length), 1);
};

// необходимо написать функцию, которая позволит создавать рандомное содержание описания под фотографией пользователя
var getRandomValueFromArr = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

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
    photosArr.push(getPhotoObj());
  }
  return photosArr;
};

// описание фотографии из рандомных данных и добавление в пустой массив commentssArr
var getRandomComments = function () { // создаем функцию, которая будет генерировать случайные комментарии от пользователя
  var commentsArr = []; // делаем пустой массив данных
  for (var i = 0; i <= getRandomNumber(1, 10); i++) { // условия работы цикла
    // в процессе работы цикла создается объект
    // создадим обьект и при помощи push добавим его в массив arr(в нашем случае это пустой массив commetsArr)
    commentsArr.push(getCommentObj(MESSAGES, NAMES));
  }
  return commentsArr;
};

var getCommentObj = function () {
  return {
    avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
    name: getRandomValueFromArr(NAMES),
    message: getRandomValueFromArr(MESSAGES)
  };
};

var getPhotoObj = function () {
  return {
    url: 'photos/' + getRandomNoRepeatArr(createIndexRandomArr(COUNT)) + '.jpg',
    description: getRandomValueFromArr(DESCRIPTION),
    likes: getRandomNumber(likesMin, likesMax),
    comments: getRandomComments(MESSAGES, NAMES)
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

  return photoElement; // возвращаем полученный склонированный элемент с новым содержимым
};

var renderPhotos = function (photoElem) {
  var fragment = document.createDocumentFragment(); // создаем пустой объект DocumentFragment
  var pictures = document.querySelector('.pictures');
  for (var i = 0; i < photoElem.length; i++) { // условия работы цикла, идет переборка массива случайно созданных фото
    fragment.appendChild(fillPhotoTemplate(photoElem[i])); // добавляет созданное фото во фрагмент
  }
  pictures.appendChild(fragment); // добавляет фрагмент в разметку
};
var photos = createPhotosRandom(COUNT);

bigPicture.classList.remove('hidden'); // удаляет класс hidden

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
};

bigPicture.querySelector('.social__comment-count').classList.add('hidden');
bigPicture.querySelector('.comments-loader').classList.add('hidden');
document.body.classList.add('modal-open');

renderPhotos(photos);
openBigPicture(photos[0]);
