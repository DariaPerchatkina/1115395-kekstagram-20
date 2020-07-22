'use strict';

(function () {
  var load = {};
  var createPhoto = window.createPhoto;
  window.load = function (onSuccess, createPhoto.onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.send();
  };

  window.load = load;
})();
