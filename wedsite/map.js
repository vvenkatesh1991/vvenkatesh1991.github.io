$(document).ready(function() {
    /** Google Map **/
    function init_map() {
        var locations = [
            ['<div class="scrollFix"><div class="col-md-12"><h4 class="title">Marrige Invite</h4></div><div class="col-md-12">  <p>S.R. Mahal, </p><p>Aranthangi road</p><p>Pattukottai(Kondikulam)</p>  </div>  </div>', 10.3791162, 79.278497, 4],
            ['<div class="scrollFix"><div class="col-md-12"><h4 class="title">Marrige Invite</h4></div><div class="col-md-12">  <p>S.R. Mahal, </p><p>Aranthangi road</p><p>Pattukottai(Kondikulam)</p>  </div>  </div>', 10.3791162, 79.278497, 3]
        ];
        var myOptions = {
            scrollwheel: false,
            zoom: 10,
            center: new google.maps.LatLng(10.3791162, 79.278497),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };
        map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);
        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                icon: 'images/retina/general/map_pin.png'
            });

        }
        infowindow = new google.maps.InfoWindow({
            content: ''
        });

    }
    google.maps.event.addDomListener(window, 'load', init_map);
});