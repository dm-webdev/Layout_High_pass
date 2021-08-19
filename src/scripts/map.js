function getYaMap() {
  const myMap = new ymaps.Map("map", {
    center: [55.770208,37.636814],
    zoom: 15,
    controls: [],
  });

  let myPlacemark = new ymaps.Placemark(
    myMap.getCenter(),
    {
      balloonContentBody: [
        '<address class="map__address">',
        '<p class="map__address__heading">Студия “High pass”</p>',
        '<p class="map__address__desc">107045, Москва, Даев переулок, дом 41, бизнес-центр «Даев Плаза», этаж 8, офис № 82</p>',
        '<a class="map__address__link" href="tel:+749542423532" target="_blank" rel="noreferrer noopener">',
        '<svg class="map__address__img">',
          '<use xlink:href="sprite.svg#phone"></use>',
        '</svg>',
        '+7 (495) 42-423-532',
        '</a>',
        '</address>'
      ].join('')
    },
    {
      iconLayout: "default#image",
      iconImageHref: "img/icons/placemark.svg",
      iconImageSize: [12, 12],
    }
  );

  myMap.geoObjects.add(myPlacemark);

  if (window.innerWidth < 768) {
    myMap.behaviors.disable('scrollZoom');
    myMap.behaviors.disable('drag');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.querySelector('.map__address__btn');
  const address = document.querySelector('.map__container');

  closeBtn.addEventListener('click', () => {
    address.classList.add('none')
  })


  window.addEventListener("scroll", mapInit);

  function mapInit() {
    let target = document.querySelector("#map");
    if (target.getBoundingClientRect().top - window.innerHeight < 200) {
      window.removeEventListener("scroll", mapInit);
      let elem = document.createElement("script");
      elem.type = "text/javascript";
      elem.src =
        "https://api-maps.yandex.ru/2.1/?&lang=ru_RU&apikey=8941aad9-b29c-4f71-be96-d498cf86e841&onload=getYaMap";
      document.getElementsByTagName("body")[0].appendChild(elem);
    }
  }
});
