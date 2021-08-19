(() => {
  function markerActiveBtn(btn, controls) {
    controls.forEach(item => {
      item.classList.remove('tabs-btn-active');
      item.classList.add('tabs-btn');
    })
    btn.classList.add('tabs-btn-active');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const controls = document.querySelectorAll('.tabs__control');
    const panels = document.querySelectorAll('.tabs__panel');

    controls[0].addEventListener('click', function showFirst() {
      panels[0].classList.remove('none');
      panels[1].classList.add('none');
      markerActiveBtn(this, controls);
    })

    controls[1].addEventListener('click', function showSecond() {
      panels[1].classList.remove('none');
      panels[0].classList.add('none');
      markerActiveBtn(this, controls);
    })
  });
})()
