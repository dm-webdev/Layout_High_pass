(() => {
  function markerActiveBtn(btn, controls) {
    controls.forEach(item => {
      item.classList.remove('slider-control-active');
    })
    btn.classList.add('slider-control-active');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const controls = document.querySelectorAll('.projects__controls__btn');
    const slider = document.querySelector('.projects__slider__body');

    controls[0].addEventListener('click', function toLeft() {
      slider.classList.remove('to-right');
      markerActiveBtn(this, controls);
    })

    controls[1].addEventListener('click', function toRight() {
      slider.classList.add('to-right');
      markerActiveBtn(this, controls);
    })
  });
})()
