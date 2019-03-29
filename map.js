var map, initMarker, restaurants;
var restaurantsMarkers = [];

function initMap() {
  var location = {
    lat: 40.7,
    lng: -73.9
  };

  map = new google.maps.Map(document.querySelector("#map"), {
    zoom: 16,
    center: location
  })

  initMarker = new google.maps.Marker({
    position: location,
    map: map,
    draggable:true,
    animation: google.maps.Animation.DROP,
    icon: {
      url: "map_marker.png",
    }
  });
  markerCoords(initMarker);
  getRestaurants(initMarker.getPosition().lat(), initMarker.getPosition().lng());

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      initMarker.setPosition(pos);
      map.panTo(initMarker.getPosition());
      getRestaurants(position.coords.latitude, position.coords.longitude);
    });
  }
}

function markerCoords(markerobject) {
  google.maps.event.addListener(initMarker, 'dragend', function(evt){
    getRestaurants(evt.latLng.lat(), evt.latLng.lng());
  });
}

function getRestaurants(lat, lng) {
  console.log("--- GETTING DATA ---");
  fetch("http://localhost:8080/api/restaurants/around/" + lat + "/" + lng)
    .then(response => {
      return response.json(); // transforme le json texte en objet js
    })
    .then(data => { // data c'est l'objet ci-dessus (json devenu obj)
      restaurants = data;
      removeRestaurantsMarkers();
      addRestaurantsMarkers();
    }).catch(err => {
      console.log("erreur dans le get : " + err)
    });
}

function addRestaurantsMarkers() {
  restaurants.forEach(function(element) {
    var pos = {
      lat: element.address.coord[1],
      lng: element.address.coord[0]
    };
    var marker = new google.maps.Marker({
      position: pos,
      map: map,
    });
    restaurantsMarkers.push(marker);
  });
}

function removeRestaurantsMarkers() {
  restaurantsMarkers.forEach(function(element) {
    element.setMap(null);
  });
  restaurantsMarkers = [];
}
