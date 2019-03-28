var map, infoWindow;

function initMap() {
  var location = {lat: 43.438, lng: -1.592};
  map = new google.maps.Map(document.querySelector("#map"), {
    zoom: 6,
    center: location
  })
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Localisation trouvée.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
                            'Error: Le service de géolocalisation a échoué.' :
                            'Error: Votre navigateur ne supporte pas la géolocalisation.');
      infoWindow.open(map);
}
