/* global AFRAME */
AFRAME.registerComponent('info-panel', {
  init: function () {
    var buttonEls = document.querySelectorAll('.menu-button');
    var fadeBackgroundEl = this.fadeBackgroundEl = document.querySelector('#fadeBackground');

    this.movieTitleEl = document.querySelector('#movieTitle');
    this.movieDescriptionEl = document.querySelector('#movieDescription');

    this.movieInfo = {
      mgrButton: {
        title: 'Metal Gear Rising: Revengeance',
        imgEl: document.querySelector('#mgrImage'),
        description: 'Metal Gear Rising: Revengeance is a hack and slash game developed by Platinum Games and published by Konami in 2013. Players control Raiden, a cybernetic soldier who battles the terrorist organization Desperado, which seeks to incite war for profit. The gameplay focuses on fast-paced combat using a powerful High-Frequency Blade, featuring a unique ”Blade Mode” that allows players to precisely control their strikes. The game‘s narrative explores themes of war, ideals, and personal identity as Raiden faces moral dilemmas and inner conflicts.'
      },
      furiButton: {
        title: 'Furi',
        imgEl: document.querySelector('#furiImage'),
        description: 'Furi is an indie action game released in 2016 that blends elements of hack and slash and third-person shooting. Players take on the role of a mysterious character who must defeat a series of unique bosses, each with their own mechanics and fighting styles. The game stands out for its stylish visual design and dynamic gameplay, where each encounter demands precision and quick reflexes from the player. The soundtrack plays a crucial role in enhancing the tension during battles, contributing to the overall immersive experience.'
      },
      nierButton: {
        title: 'NieR: Automata',
        imgEl: document.querySelector('#nierImage'),
        description: 'NieR: Automata is an action RPG released in 2017, serving as a sequel to the 2010 game NieR. Set in a post-apocalyptic world where humanity has been driven to the Moon due to a machine invasion, players control androids 2B and 9S as they fight to reclaim Earth for humanity. The game is renowned for its deep narrative that touches on philosophical questions about existence, free will, and the nature of humanity. Gameplay features a mix of hack and slash combat and RPG elements, along with various mechanics for fighting and exploration.'
      }
    };

    this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
    this.onBackgroundClick = this.onBackgroundClick.bind(this);
    this.backgroundEl = document.querySelector('#background');
    for (var i = 0; i < buttonEls.length; ++i) {
      buttonEls[i].addEventListener('click', this.onMenuButtonClick);
    }
    this.backgroundEl.addEventListener('click', this.onBackgroundClick);
    this.el.object3D.renderOrder = 9999999;
    this.el.object3D.depthTest = false;
    fadeBackgroundEl.object3D.renderOrder = 9;
    fadeBackgroundEl.getObject3D('mesh').material.depthTest = false;
  },

  onMenuButtonClick: function (evt) {
    var movieInfo = this.movieInfo[evt.currentTarget.id];

    this.backgroundEl.object3D.scale.set(1, 1, 1);

    this.el.object3D.scale.set(1, 1, 1);
    if (AFRAME.utils.device.isMobile()) { this.el.object3D.scale.set(1.4, 1.4, 1.4); }
    this.el.object3D.visible = true;
    this.fadeBackgroundEl.object3D.visible = true;

    if (this.movieImageEl) { this.movieImageEl.object3D.visible = false; }
    this.movieImageEl = movieInfo.imgEl;
    this.movieImageEl.object3D.visible = true;

    this.movieTitleEl.setAttribute('text', 'value', movieInfo.title);
    this.movieDescriptionEl.setAttribute('text', 'value', movieInfo.description);
  },

  onBackgroundClick: function (evt) {
    this.backgroundEl.object3D.scale.set(0.001, 0.001, 0.001);
    this.el.object3D.scale.set(0.001, 0.001, 0.001);
    this.el.object3D.visible = false;
    this.fadeBackgroundEl.object3D.visible = false;
  }
});
