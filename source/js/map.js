function initialize() {
  var mapOptions = {
    zoom: 7,
    center: new google.maps.LatLng(35.0129634, -112.3089641)
  }
  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  var image = "img/map-marker.svg";
  var myLatLng = new google.maps.LatLng(34.7129634, -111.8089641);
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    icon: image,
    title: 'Click to zoom'
  });
}
google.maps.event.addDomListener(window, 'load', initialize);
