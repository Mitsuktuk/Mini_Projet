var map;

function initMap() {
  var location = {
    lat: 40.7,
    lng: -73.9
  };

  map = new google.maps.Map(document.querySelector("#map"), {
    zoom: 16,
    center: location
  })

  var initMarker = new google.maps.Marker({
    position: location,
    map: map,
    draggable:true,
    animation: google.maps.Animation.DROP,
    icon: {
      url: "map_marker.png",
    }
  });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      var marker = new google.maps.Marker({
          position: pos,
          map: map,
          draggable:true,
          animation: google.maps.Animation.DROP,
          icon: {
            url: "map_marker.png",
          },
          title:"Drag me!"
      });

      map.panTo(marker.getPosition());
    });
  }
}
