//this code fetches imformation using latitude and longitude, I am using the open weather api using my id, you can create your own id.
var appId = "62079365f8b4e93d8156bfb3f4baf341"

var rootUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=' + appId;

var kelvinToC = function(kelvin) {
  return Math.round(kelvin - 273.15) + '˚C';
}

module.exports = function(latitude, longitude) {
  var url = `${rootUrl}&lat=${latitude}&lon=${longitude}`;
  return fetch(url)
    .then(function(response) {
      return response.json()
    })
    .then(function(json){
      return {
        city: json.name,
        temperature: kelvinToC(json.main.temp),
        description: json.weather[0].description
      }
    });

}
