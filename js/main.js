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
var COUNT = 25; // счетчик числа фотографий
var likesMin = 15; // мин число лайков у фото
var likesMax = 250; // макс число лайков у фото

// находит случайное целое число в указанном диапазоне
var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// создадим функцию, которая позволит получать не повторющиеся элементы массива
var getRandomNoRepeat = function (arr) {
  return arr.splice(Math.floor(Math.random() * arr.length), 1);
};

// создаем функцию, которая позволит нам получить массив индексов для фотографий
var indexPhotoArr = []; // создаем пустой массив

// ф-я которая принимает аргументом счетчик и массив
// в цикле от 1 до значения <= count дабавляй в массив индекс i и в результате после работы функции в цикле верни нам массив indexPhotoArr
var indexRandomCreate = function (count, arr) {
  for (var i = 1; i <= count; i++) {
    arr.push(i);
  }
  return indexPhotoArr;
};
// вызов функции с аргуметами - счетчик фото и массивом индексов
indexRandomCreate(COUNT, indexPhotoArr);

// необходимо написать функцию, которая позволит создавать рандомное содержание описания под фотографией пользователя
var getRandomValueForArr = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// описание фотографии из рандомных данных и добавление в пустой массив photosArr
var photosRandomCreate = function (count) { // создаем функцию, которая будет генерировать случайные описания фотографии пользователя
  var photosArr = []; // делаем пустой массив данных

  for (var i = 0; i < count; i++) { // условия работы цикла
    // в процессе работы цикла создается объект
    // создадим обьект и при помощи push добавим его в массив arr(в нашем случае это пустой массив photosArr)
    photosArr.push({
      url: 'photos/' + getRandomNoRepeat(indexRandomCreate(0, indexPhotoArr)) + '.jpg',
      // description: description,
      likes: getRandomValue(likesMin, likesMax),
      comments: {
        avatar: 'img/avatar-' + getRandomValue(0, 6) + '.svg',
        message: getRandomValueForArr(MESSAGES),
        name: getRandomValueForArr(NAMES)
      }
    });
  }
  return photosArr;
};

var photos = photosRandomCreate(COUNT);

var similarPhotoTemplate = document.querySelector('#picture') // находим элемент темплейт, куда вставим фото
  .content
  .querySelector('.picture');

var renderPhoto = function (photo) { // создаем функцию, которая отрисовывает фото
  var photoElement = similarPhotoTemplate.cloneNode(true); // делаем дубликат узла template

  var photoElementPicture = photoElement.querySelector('.picture__img');
  var photoElementComment = photoElement.querySelector('.picture__comments');
  var photoElementLike = photoElement.querySelector('.picture__likes');

  photoElementPicture.src = photo.url;
  photoElementComment.textContent = photo.comments.length;
  photoElementLike.textContent = photo.likes;

  return photoElement; // возвращаем полученный склонированный элемент с новым содержимым
};

var renderPhotos = function (photoElem) {
  var fragment = document.createDocumentFragment(); // создаем пустой объект DocumentFragment
  var pictures = document.querySelector('.pictures');
  for (var i = 0; i < photoElem.length; i++) { // условия работы цикла, идет переборка массива случайно созданных фото
    fragment.appendChild(renderPhoto(photoElem[i])); // добавляет созданное фото во фрагмент
  }
  pictures.appendChild(fragment); // добавляет фрагмент в разметку
};
renderPhotos(photos);

var uploadFile = document.querySelector('#upload-file');

