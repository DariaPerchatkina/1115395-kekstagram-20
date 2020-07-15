'use strict';

// находит случайное целое число в указанном диапазоне
(function () {
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

  window.utils = {
    getRandomNumber: getRandomNumber,
    getRandomNoRepeatArr: getRandomNoRepeatArr,
    getRandomValueFromArr: getRandomValueFromArr
  };
})();
