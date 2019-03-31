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
      url: "assets/map_marker.png",
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
  console.log("--- GETTING DATA MAP ---");
  fetch("http://localhost:8080/api/restaurants/around/" + lat + "/" + lng)
    .then(response => {
      return response.json(); // transforme le json texte en objet js
    })
    .then(data => { // data c'est l'objet ci-dessus (json devenu obj)
      data.forEach(function(element) {
        moyGrade(element);
      });
      restaurants = data;
      removeRestaurantsMarkers();
      addRestaurantsMarkers();
    }).catch(err => {
      console.log("erreur dans le get : " + err)
    });
}

function moyGrade(restaurant) {
  var grade = 'C';
  var total = 0;
  restaurant.grades.forEach(function(element) {
    total = total + element.score;
  });
  var moy = total / restaurant.grades.length;
  if (moy < 14) {
    grade = 'A';
  } else if (moy < 28) {
    grade = 'B';
  }
  restaurant.grades.push(grade);
}

function addRestaurantsMarkers() {
  restaurants.forEach(function(element) {
    var pos = {
      lat: element.address.coord[1],
      lng: element.address.coord[0]
    };

    var contentString = '<h2>' + element.name + '</h2>'+
            '<p>' + element.cuisine + ' - grade: ' + element.grades[element.grades.length - 1] + '</p>' +
            '<a href="restaurant.html?id=' + element._id + '">Details</a>';

    var infoWindow = new google.maps.InfoWindow({
      content: contentString
    });

    var marker = new google.maps.Marker({
      position: pos,
      map: map,
    });
    marker.addListener('click', function() {
      infoWindow.open(map, marker);
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
