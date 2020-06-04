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
var NAMES = ['Аня', 'Саша', 'Маша', 'Иван', 'Никита', 'Юля' ];
var COUNTER = 25;
var likesMin = 15;
var likesMax = 250;

// находит случайное целое число в указанном диапазоне
var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// необходимо написать функцию, которая позволит создавать рандомное содержание описания под фотографией пользователя
var getRandomValueArr = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var likes = getRandomValue(15, 250);

// описание фотографии из рандомных данных и добавление в пустой массив photosArr
var photosRandomCreate = function (count) { // создаем функцию, которая будет генерировать случайные описания фотографии пользователя
  var photosArr = []; // делаем пустой массив данных

  for (var i = 0; i < COUNTER; i++) { // условия работы цикла
    var url = wizardFullName(WIZARD_NAMES, WIZARD_LASTNAME); // обьявим переменную для генерации имен волшебников
    var coatColor = getRandomValueArr(COAT_COLORS); // добавим  переменную для генерации рандомных цветов плащей
    var eyesColor = getRandomValueArr(EYES_COLORS); // добавим переменную для генерации рандомных цветов глаз

    photosArr.push({url: url, // создадим обьект и при помощи push добавим его в массив arr(в нашем случае это пустой массив wizardsRandom)
      description: description,
      likes: likes,
      comments: {
        avatar: "img/avatar-6.svg",
        message: MESSAGES,
        name: NAMES
      }
    });
  }
  return photosArr;
};
