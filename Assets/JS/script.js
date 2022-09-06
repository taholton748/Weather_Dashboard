// GIVEN a weather dashboard with form inputs
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

var cityInputEl = document.querySelector("#cityName");
var searchBtnEl = document.querySelector("#searchBtn");
var cityContainer = document.getElementById("currentCity");
var cityNameDisplay = document.querySelector("#cityHeader");
var currentWeatherEl = document.querySelector("#currentWeather");
var searchHistoryHeader = document.querySelector("#history");
var historyBtnsEl = document.querySelector("#historyBtns");
var weatherForecastEl = document.querySelector("#cityForecast");

var locationUrl =
  "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=1&appid=627e2e424592ad588e61a158f86366c9";
var weatherUrl =
  "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=627e2e424592ad588e61a158f86366c9";

var getWeather = function () {
  console.log("function was called");

  fetch(locationUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var locationArray = data.response.docs; //docs?
      for (var i = 0; i < locationArray.length; i++) {
        var cityData = document.createElement("li");
        cityData.textContent = locationArray[i].name;
        cityContainer.appendChild(cityData);
      }
    });

  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var weatherArray = data.response.docs; //docs?
      for (var i = 0; i < weatherArray.length; i++) {
        var cityWeather = document.createElement("li");
        cityWeather.textContent = weatherArray[i].cityContainer //don't know yet;
          .appendChild(cityWeather);
      }
    });
};
getWeather();
document
  .querySelector("#searchBtn")
  .addEventListener("click", function (getWeather) {
    console.log("hello");
  });
