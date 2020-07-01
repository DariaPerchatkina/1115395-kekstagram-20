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
var uploadFile = document.querySelector('#upload-file'); // находит в разметке по id скрытый инпут
var uploadCancel = document.querySelector('#upload-cancel'); // находит в разметке по id кнопку отмены
var uploadForm = document.querySelector('.img-upload__overlay'); // находит в разметке по id форму
var textHashtags = document.querySelector('.text__hashtags');
var ESC_KEY = 'Escape';
// var ENTER_KEY = 'Enter';
var effectPin = document.querySelector('.effect-level__pin');
var effectList = document.querySelector('.effects__list');
// var effectValue = document.querySelector('.effect-level__value');
// var effectLevel;
var imgUploadPreview = document.querySelector('.img-upload__preview');
var scaleControlValue = document.querySelector('.scale__control--value');
var scaleParam = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
  MEASURE: '%'
};
// var MIN_SCALE_VALUE = 25;
// var MAX_SCALE_VALUE = 100;
// var SCALE_STEP = 25;
var imgUploadScale = document.querySelector('.img-upload__scale');

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

// bigPicture.classList.remove('hidden'); // удаляет класс hidden


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
  if (evt.key === ESC_KEY) { // если событие с клавиатуры строго равно значению эскейп на клавиатуре, то вызовется функция закрытия попапа
    evt.preventDefault();
    formClose();
  }
};

textHashtags.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

textHashtags.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});


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

// При смене эффекта, выбором одного из значений среди радиокнопок .effects__radio,
// добавить картинке внутри .img-upload__preview CSS-класс, соответствующий эффекту.
// Например, если выбран эффект .effect-chrome, изображению нужно добавить класс effects__preview--chrome.

var effectChangeHandler = function (evt) {
  // если происходит событие и оно происходит точно на инпуте с  типом radio(evt.target.matches=true), то сбрось класс и добавь тот класс, который соответстует значению valut на текущем input
  if (evt.target && evt.target.matches('input[type="radio"]')) {
    imgUploadPreview.className = 'img-upload__preview effects__preview--' + evt.target.value;
  }
};

// редактирование размера фото
var setPhotoSize = function (value) {
  imgUploadPreview.style.transform = 'scale(' + (value / 100) + ')';
};

var scaleControl = function (evt) {
  var scaleNum = parseInt(scaleControlValue.value, 10);
  if (scaleNum > scaleParam.MIN && evt.target.classList.contains('scale__control--smaller')) {
    scaleNum -= scaleParam.STEP;
    scaleControlValue.value = scaleNum + '%';
  } else if (scaleNum < scaleParam.MAX && evt.target.classList.contains('scale__control--bigger')) {
    scaleNum += scaleParam.STEP;
    scaleControlValue.value = scaleNum + '%';
  }
  setPhotoSize(scaleNum);
};

imgUploadScale.addEventListener('click', scaleControl);

// смена фильтра
effectList.addEventListener('change', effectChangeHandler);

var onEffectPinMouseUp = function () {

};

effectPin.addEventListener('mousup', onEffectPinMouseUp);
