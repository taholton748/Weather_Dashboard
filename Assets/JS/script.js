// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

//Variable declarations
var apiKey = "627e2e424592ad588e61a158f86366c9";

var inputFormEl = document.querySelector("#inputForm");
var cityInputEl = document.querySelector("#cityName");
var searchBtnEl = document.querySelector("#searchBtn");
var cityContainer = document.getElementById("currentCity");
var cityNameDisplay = document.querySelector("#cityHeader");
var currentWeatherEl = document.querySelector("#currentWeather");
var searchHistoryHeader = document.querySelector("#history");
var historyBtnsEl = document.querySelector("#historyBtns");
var weatherForecastEl = document.querySelector("#cityForecast");
// Server API Declaration

//   "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=1&appid=627e2e424592ad588e61a158f86366c9";
// var weatherUrl =
//   "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=627e2e424592ad588e61a158f86366c9";
// Form input

var formSubmitHandler = function (event) {
  event.preventDefault();
  var cityName = cityInputEl.value.trim();
  console.log(cityName);

  getWeather(cityName);
};
// Start function
async function getWeather(cityName) {
  console.log("function was called");
  var locationUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=imperial&appid=" +
    apiKey;
  // Fetch location info
  var response = await fetch(locationUrl);
  var data = await response.json();
  console.log(data);

  var cityName = data["name"];
  var cityTemp = data["main"]["temp"];
  var cityLat = data["coord"]["lat"];
  var cityLon = data["coord"]["lon"];
  var cityWind = data["wind"]["speed"];
  var cityHumidity = data["main"]["humidity"];
  var weatherIcon = data["weather"]["0"]["icon"];

  //cityWeather.textContent("Temp:" + cityTemp)

  // secondApiCall(cityLat, cityLon);
  console.log(cityLat, cityLon);
}

// Add event listener for search button
inputFormEl.addEventListener("submit", formSubmitHandler);

async function secondApiCall(cityLat, cityLon) {
  var weatherUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    cityLat +
    "&lon=" +
    cityLon +
    "&units=imperial&appid=" +
    apiKey;

  var response = await fetch(weatherUrl);
  var data = await response.json();
  console.log("called it");
}

// Fetch weather info for location found
//   fetch(weatherUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       var weatherArray = data.response.docs; //docs?
//       for (var i = 0; i < weatherArray.length; i++) {
//         var cityWeather = document.createElement("p");
//         cityWeather.textContent = weatherArray[i].cityContainer //don't know yet;
//           .appendChild(cityWeather);
//       }
//     });
