'use strict';

(function () {
  var URL_UPLOAD = 'https://javascript.pages.academy/kekstagram';
  var CodeOk = 200;
  var BadRequest = 400;
  var NotFound = 404;
  var InternalServerError = 500;
  var TIME_OUT = 5000;

  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
  // window.upload = function (url, onSuccess, onError) {
  //   var xhr = new XMLHttpRequest();

  //   xhr.responseType = 'json';

  //   xhr.addEventListener('load', function () {
  //     var error;
  //     switch (xhr.status) {
  //       case CodeOk:
  //         onSuccess(xhr.response);
  //         break;
  //       case BadRequest:
  //         error = 'Неверный запрос';
  //         break;
  //       case NotFound:
  //         error = 'Ничего не найдено';
  //         break;
  //       case InternalServerError:
  //         error = 'Ошибка на стороне сервера';
  //         break;
  //       default:
  //         error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
  //     }
  //     if (error) {
  //       onError(error);
  //     }
  //   });

  //   xhr.addEventListener('error', function () {
  //     onError('Произошла ошибка соединения');
  //   });

  //   xhr.addEventListener('timeout', function () {
  //     onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  //   });

  //   xhr.timeout = TIME_OUT; // 5s

  //   xhr.open('POST', URL_UPLOAD);
  //   xhr.send(data);
  // };
})();
