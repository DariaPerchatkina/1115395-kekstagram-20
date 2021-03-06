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
  var scaleControlInput = document.querySelector('.scale__control--value');

  var setPhotoSize = function (value) {
    imgUploadPreview.style.transform = 'scale(' + (value / 100) + ')';
    scaleControlInput.value = value + scaleParam.MEASURE;
  };

  var dropPhotoSize = function () {
    imgUploadPreview.style.transform = '';
    scaleControlInput.value = scaleParam.MAX + scaleParam.MEASURE;
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

  scale.dropPhotoSize = dropPhotoSize;
  scale.scaleControlValue = scaleControlValue;
  scale.imgUploadPreview = imgUploadPreview;
  window.scale = scale;
})();
