'use strict';

(function () {
  var errorBooklet = document.querySelector('#error').content.querySelector('.error');
  var successBooklet = document.querySelector('#success').content.querySelector('.success');
  var utils = window.utils;
  var formMessage = {};

  var renderSuccessBooklet = function () {
    successBooklet.classList.remove('hidden');

    successBooklet.addEventListener('click', onSuccessBookletClick);
    document.addEventListener('keydown', onSuccessBookletKeyDown);
  };

  var renderErrorBooklet = function () {
    errorBooklet.classList.remove('hidden');

    errorBooklet.addEventListener('click', onErrorBookletClick);
    document.addEventListener('keydown', onErrorBookletKeyDown);
  };

  var onSuccessBookletClick = function () {
    closeSuccessBooklet();
  };

  var onErrorBookletClick = function () {
    closeErrorBooklet();
  };

  var closeSuccessBooklet = function () {
    successBooklet.classList.add('hidden');
    successBooklet.removeEventListener('click', onSuccessBookletClick);
    document.removeEventListener('keydown', onSuccessBookletKeyDown);
  };

  var closeErrorBooklet = function () {
    errorBooklet.classList.add('hidden');
    errorBooklet.removeEventListener('click', onErrorBookletClick);
    document.removeEventListener('keydown', onErrorBookletKeyDown);
  };

  var onSuccessBookletKeyDown = function (evt) {
    if (evt.key === utils.ESC_KEY) {
      closeSuccessBooklet();
    }
  };

  var onErrorBookletKeyDown = function (evt) {
    if (evt.key === utils.ESC_KEY) {
      closeErrorBooklet();
    }
  };

  var renderFormBooklet = function () {
    var popupsContainer = document.querySelector('main');
    successBooklet.classList.add('hidden');
    errorBooklet.classList.add('hidden');
    popupsContainer.insertAdjacentElement('afterbegin', successBooklet);
    popupsContainer.insertAdjacentElement('afterbegin', errorBooklet);
  };

  renderFormBooklet();

  formMessage.showSuccess = renderSuccessBooklet;
  formMessage.showError = renderErrorBooklet;
  window.formMessage = formMessage;

})();
