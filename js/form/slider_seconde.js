'use strict';

(function () {
  var sliderSeconde = {};
  // var effect = window.effect;
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelLine = document.querySelector('.effect-level__line');


  var onPinMousedown = function (evt) {
    // значение выдаваемое наружу
    var ratio = null;
    // начальные координаты пина слайдера
    var currentPointX = evt.clientX;
    // не понимаю что это делает, что-то про то,
    // то parentWidth содержит событие на на родителе определенного элемента
    // дом дерева и дает нам полную ширину этого объекта,
    // на котором было зарегристрировано событие
    var parentWidth = evt.target.parentNode.offsetWidth;

    // описание функции передвижения на пине
    var onMouseMove = function (moveEvent) {
      // смещение пина
      var pressedX = currentPointX - moveEvent.clientX;
      // указание крайней левой коориднаты
      var passedX = evt.target.offsetLeft - pressedX;

      // ограничение координат перемещения
      if (passedX < 0) {
        passedX = 0;
      }

      if (passedX > parentWidth) {
        passedX = parentWidth;
      }
      // новые начальные координаты пина
      currentPointX = moveEvent.clientX;
      // значение выдаваемое наружу есть отношение начальной кординаты к координате на которую передвинули пин
      ratio = passedX / parentWidth;

      console.log(ratio);

      // Проставляем значения для верстки. Лучше вынести в отдельную функцию.
      effectLevelPin.style.left = (ratio * 100) + '%';
      effectLevelDepth.style.width = (ratio * 100) + '%';
      effectLevelLine.value = Math.round(ratio * 100);
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
  };

  sliderSeconde.onPinMousedown = onPinMousedown;
  window.sliderSeconde = sliderSeconde;
})();
