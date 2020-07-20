'use strict';

(function () {
  var scale = {};
  var scaleControlValue = document.querySelector('.scale__control--value');
  var imgUploadScale = document.querySelector('.img-upload__scale');
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var scaleParam = {
    MIN: 25,
    MAX: 100,
    STEP: 25,
    MEASURE: '%'
  };

  // редактирование размера фото
  var setPhotoSize = function (value) {
    imgUploadPreview.style.transform = 'scale(' + (value / 100) + ')';
  };

  var onScaleControlClick = function (evt) {
    var scaleNum = parseInt(scaleControlValue.value, 10);
    if (scaleNum > scaleParam.MIN && evt.target.classList.contains('scale__control--smaller')) {
      scaleNum -= scaleParam.STEP;
      scaleControlValue.value = scaleNum + scaleParam.MEASURE;
    } else if (scaleNum < scaleParam.MAX && evt.target.classList.contains('scale__control--bigger')) {
      scaleNum += scaleParam.STEP;
      scaleControlValue.value = scaleNum + scaleParam.MEASURE;
    }
    setPhotoSize(scaleNum);
  };

  imgUploadScale.addEventListener('click', onScaleControlClick);

  window.scale = scale;
})();
