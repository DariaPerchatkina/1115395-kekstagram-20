'use strict';
(function () {
  var mockData = {};
  var COUNT = 25; // счетчик числа фотографий
  var likesMin = 15; // мин число лайков у фото
  var likesMax = 250; // макс число лайков у фото
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

  // создадим функцию, которая позволит получать не повторющиеся элементы массива
  var getRandomNoRepeatArr = function (arr) {
    return arr.splice(Math.floor(Math.random() * arr.length), 1);
  };

  // необходимо написать функцию, которая позволит создавать рандомное содержание описания под фотографией пользователя
  var getRandomValueFromArr = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  // находит случайное целое число в указанном диапазоне
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // ф-я которая принимает аргументом счетчик и массив
  // в цикле от 1 до значения <= count дабавляй в массив индекс i и в результате после работы функции в цикле верни нам массив indexPhotoArr
  var createIndexRandomArr = function (count) {
    // создаем функцию, которая позволит нам получить массив индексов для фотографий
    var indexPhotoArr = []; // создаем пустой массив
    for (var i = 1; i <= count; i++) {
      indexPhotoArr.push(i);
      // console.log(indexPhotoArr);
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


  var getPhotoObj = function (i) {
    return {
      id: i,
      url: 'photos/' + getRandomNoRepeatArr(createIndexRandomArr(COUNT)) + '.jpg',
      description: getRandomValueFromArr(DESCRIPTION),
      likes: getRandomNumber(likesMin, likesMax),
      comments: getRandomComments(MESSAGES, NAMES)
    };
  };

  var getCommentObj = function () {
    return {
      avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
      name: getRandomValueFromArr(NAMES),
      message: getRandomValueFromArr(MESSAGES)
    };
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
  var photos = createPhotosRandom(COUNT);

  mockData.MESSAGES = MESSAGES;
  mockData.getCommentObj = getCommentObj;
  mockData.getRandomNumber = getRandomNumber;
  mockData.photos = photos;
  window.mockData = mockData;
})();
