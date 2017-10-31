// Question 1
// Show Chicago's weather in the widget when the Get Current Temperature button is clicked:

//   let getWeather = function() {
//   let latitude = '41.8781';
//   let longitude = '-87.6298';
//   let openweathermap_api_url = 'https://api.openweathermap.org/data/2.5/weather?'
//   openweathermap_api_url += 'lat=' + latitude
//   openweathermap_api_url += '&lon=' + longitude
//   openweathermap_api_url +='&appid=4ce6f502d38ddae567bf1702b05e168c&units=imperial'
//   console.debug("Latitude: " + latitude+", Longitude: "+longitude);
//
// // fetch(openweathermap_api_url).then(convertToJSON).then(updateWeather).catch(displayError);
//
// return {"coord":{"lon":-87.63,"lat":41.88},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"base":"stations","main":{"temp":40.39,"pressure":1013,"humidity":56,"temp_min":39.2,"temp_max":42.8},"visibility":16093,"wind":{"speed":10.29,"deg":250,"gust":9.3},"clouds":{"all":90},"dt":1509420900,"sys":{"type":1,"id":1030,"message":0.1675,"country":"US","sunrise":1509452534,"sunset":1509489921},"id":4887398,"name":"Chicago","cod":200}}
// //
// let name = getWeather().name
// document.getElementsByClassName('card-title')[0].innerHTML = name
// let temp = getWeather().main.temp
// document.getElementsByClassName('card-text')[0].innerHTML = "It is " + temp + " degrees outside"
// let icon = getWeather().icon
// document.getElementsByClassName('card-img-top').src = " http://openweathermap.org/img/w/" + icon + ".png"

// HINT:
// Weather icon example: http://openweathermap.org/img/w/10d.png
// The very last part ('10d.png') can change based on the current conditions.

// Question 2
// Emit the user's actual location into the console:

let latitude = '';
let longitude = '';

function handlePosition (info) {
  latitude = info.coords.latitude.toFixed(4);
  longitude = info.coords.longitude.toFixed(4);
  getWeather()
}

let link = document.getElementById("get_forecast")
  link.addEventListener("click", function(event) {
    event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
});

let getWeather = function() {
  let openweathermap_api_url = 'https://api.openweathermap.org/data/2.5/weather?'
  openweathermap_api_url += 'lat=' + latitude
  openweathermap_api_url += '&lon=' + longitude
  openweathermap_api_url +='&appid=4ce6f502d38ddae567bf1702b05e168c&units=imperial'
  console.debug("Latitude: " + latitude + "Longitude: " + longitude);
fetch(openweathermap_api_url).then(convertToJSON).then(updateWeather).catch(displayError);
}

  let convertToJSON = function(response) {
    return response.json();
  }

  let updateWeather = function(dataFromService) {
    city = dataFromService.name;
    temp = dataFromService.main.temp;
    icon = dataFromService.weather[0].icon;
    document.querySelector('.card-title').innerHTML = city;
    document.querySelector('.card-text').innerHTML = "It is " + temp + " degrees outside.";
    document.querySelector('.card-img-top').src = "http://openweathermap.org/img/w/" + icon + ".png";
}

let displayError = function(error) {
  console.debug(error)
  window.alert("Error!");
}
