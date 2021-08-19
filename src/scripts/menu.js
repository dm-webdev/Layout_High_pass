'use strict';

window.addEventListener('DOMContentLoaded', function () {
  const showButton = document.querySelector('.header__burger');
  const closeBtn = document.querySelector('.header__nav__btn');
  const menu = document.querySelector('.header__nav');

  showButton.addEventListener('click', () => showMenu(menu));

  menu.addEventListener('click', function (ev) {
    if (ev.target.tagName === "A") {
      hideMenu(menu);
    }
  });

  closeBtn.addEventListener('click', () => {
    hideMenu(menu);
  })

  document.addEventListener('keydown', function (ev) {
    if (ev.code === 'Escape') {
      hideMenu(menu);
    }
  });

  if (window.innerWidth < 768) {
    menu.inert = true;
    menu.addEventListener('click', hideMenu);
  } else {
    menu.inert = false;
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
      if (!menu.classList.contains("nav__active")) {
        menu.inert = true;
        menu.addEventListener('click', hideMenu);
      }
    } else {
      menu.inert = false;
      menu.removeEventListener('click', hideMenu);
    }
  });

  function showMenu(element) {
    element.classList.toggle('nav__active');
    element.inert = element.className === 'nav__active';
  }

  function hideMenu(element) {
    element.classList.remove('nav__active');
    element.inert = true;
  }
});
