/* global AFRAME */
AFRAME.registerComponent('highlight', {
  init: function () {
    // Получаем элементы кнопок из меню
    var buttonEls = this.buttonEls = this.el.querySelectorAll('.menu-button');
    // Получаем фон для взаимодействия
    var backgroundEl = document.querySelector('#background');

    // Привязываем контекст для обработчиков событий
    this.onClick = this.onClick.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.reset = this.reset.bind(this);

    // Добавляем обработчик клика на фон
    backgroundEl.addEventListener('click', this.reset);

    // Добавляем обработчики событий для каждой кнопки
    for (var i = 0; i < buttonEls.length; ++i) {
      buttonEls[i].addEventListener('mouseenter', this.onMouseEnter);
      buttonEls[i].addEventListener('mouseleave', this.onMouseLeave);
      buttonEls[i].addEventListener('click', this.onClick);
    }
  },

  // Обработка клика на кнопку
  onClick: function (evt) {
    var infoPanelEl = document.querySelector('#infoPanel');
    var movieId = evt.target.id.replace('Button', 'Image');
    var movieImageEl = document.querySelector('#' + movieId);

    // Показываем панель с информацией
    infoPanelEl.setAttribute('visible', 'true');
    infoPanelEl.object3D.scale.set(1, 1, 1);

    // Показываем изображение выбранного фильма
    var allImages = infoPanelEl.querySelectorAll('[mixin="movieImage"]');
    allImages.forEach(function (imgEl) {
      imgEl.setAttribute('visible', 'false');
    });
    movieImageEl.setAttribute('visible', 'true');

    // Меняем цвет кнопки и её масштаб
    evt.target.setAttribute('material', 'color', '#ff00cc');
    evt.target.object3D.scale.set(1.2, 1.2, 1.2);

    // Устанавливаем состояние "clicked"
    this.el.addState('clicked');
  },

  // Обработка наведения мыши на кнопку
  onMouseEnter: function (evt) {
    var buttonEls = this.buttonEls;
    evt.target.setAttribute('material', 'color', '#ff00cc');
    // Сбрасываем цвет других кнопок
    for (var i = 0; i < buttonEls.length; ++i) {
      if (evt.target === buttonEls[i]) { continue; }
      buttonEls[i].setAttribute('material', 'color', 'white');
    }
  },

  // Обработка ухода мыши с кнопки
  onMouseLeave: function (evt) {
    // Если кнопка уже была нажата, ничего не делаем
    if (this.el.is('clicked')) { return; }
    evt.target.setAttribute('material', 'color', 'white');
  },

  // Сброс состояния всех кнопок и панели
  reset: function () {
    var buttonEls = this.buttonEls;
    var infoPanelEl = document.querySelector('#infoPanel');

    // Скрываем панель с информацией
    infoPanelEl.setAttribute('visible', 'false');
    infoPanelEl.object3D.scale.set(0.001, 0.001, 0.001);

    // Сбрасываем состояние кнопок
    for (var i = 0; i < buttonEls.length; ++i) {
      this.el.removeState('clicked');
      buttonEls[i].setAttribute('material', 'color', 'white');
      buttonEls[i].object3D.scale.set(1, 1, 1);
    }
  }
});
