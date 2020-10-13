const mapsYandex = (coordSenter) => {
    ymaps.ready(function () {
        var myMap = new ymaps.Map('map', {
                    center: [53.25355473, 49.93796479],
                    center: coordSenter,
                    zoom: 6
                },
                {
                    searchControlProvider: 'yandex#search'
                }
            ),
            MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
            ),

            myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                    hintContent: 'Собственный значок метки',
                    balloonContent: 'Это красивая метка'
                },
                {
                    iconLayout: 'default#image',
                    iconImageHref: 'assets/img/dot.svg',
                    iconImageSize: [30, 42],
                    iconImageOffset: [-5, -38]
                }
            ),
            coordsCollection = new ymaps.GeoObjectCollection(null, {
                preset: 'islands#yellowIcon'
            }),
            poolCoords = [
                [52.59308828, 36.12287203], [54.19933752, 40.88442569], [55.31533001, 50.49285381], [53.63650180, 49.90033660], [53.24027774, 62.49726050], [53.45634561, 42.30999620], [53.13330143, 46.55400082], [54.85076792, 47.60520611], [52.13773721, 48.12942747], [54.87802285, 32.58805840], [55.21153689, 35.63305250] ,[53.03168726, 31.95335524], [52.55217863, 33.64524977]];
            myMap.controls.remove('trafficControl');
            myMap.controls.remove('geolocationControl');
            myMap.controls.remove('typeSelector');
            myMap.controls.remove('fullscreenControl');
            myMap.controls.remove('rulerControl');
            myMap.controls.remove('mapTools');
            myMap.controls.remove('searchControl');

            for (var i = 0, l = poolCoords.length; i < l; i++) {
                coordsCollection.add(new ymaps.Placemark(poolCoords[i],{
                    hintContent: '',
                    balloonContent: '',
                    iconContent: ''
                },
                {
                    iconLayout: 'default#imageWithContent',
                    iconImageHref: 'src/assets/img/dot.svg',
                    iconImageSize: [36, 40],
                    iconImageOffset: [-24, -24],
                    iconContentOffset: [15, 15],
                    iconContentLayout: MyIconContentLayout
                    }));
            }
            myMap.geoObjects
                .add(coordsCollection);

            myMap.behaviors.disable('scrollZoom'); //отключ зума колесом
});
}
export default mapsYandex;
