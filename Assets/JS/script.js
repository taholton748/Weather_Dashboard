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
var apiKey = "d91f911bcf2c0f925fb6535547a5ddc9";
var today = new Date();
var inputFormEl = document.querySelector("#inputForm");
var cityInputEl = document.querySelector("#cityName");
var searchBtnEl = document.querySelector("#searchBtn");
var cityContainer = document.getElementById("currentCity");
var cityNameDisplay = document.querySelector("#cityHeader");
var currentWeatherEl = document.querySelector("#currentWeather");
var searchHistoryHeader = document.querySelector("#history");
var historyBtnsEl = document.querySelector("#historyBtns");
var weatherForecastEl = document.querySelector("#cityForecast");
var currentForecastDiv = document.querySelector("#currentForecast");
var weatherForeCastContainer = document.querySelector("#fiveDay");

var title;

// on load, get the items from local storage and display the items into a button

function loadRecentSearch() {
  // TODO: Retrieve from local storage

  // Dynamically create the button
  var btn = document.createElement("button");

  // Display the localStorage result as buttons
  btn.innerHTML = "yep";
  historyBtnsEl.appendChild(btn);
  console.log("Yayyy!!!");
}

loadRecentSearch();

// Form input
var formSubmitHandler = function (event) {
  event.preventDefault();
  var cityName = cityInputEl.value.trim();
  console.log(cityName);

  // TODO: Save the user input to localStorage
  localStorage.setItem("city", cityName);

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

  var name = data.name;
  var date =
    today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();
  var cityLat = data.coord.lat;
  var cityLon = data.coord.lon;
  title = `${name} ${date}`;

  var currentCityDiv = `
  <div class="row feature-style border border-dark mt-3 mb-3 p-2" id="currentCity">
    <h2 id="cityHeader">${title}</h2>
    <div id="currentWeather">
    <p>Temp:</p>
    <p>Wind:</p>
    <p>Humidity:</p>
    <p>UV Index:</p>
    </div>
  </div>
  `;
  currentForecastDiv.innerHTML = currentCityDiv;
  console.log(data);

  secondApiCall(cityLat, cityLon);
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

  var temp = data.current.temp;
  var wind = data.current.wind_speed;
  var humidity = data.current.humidity;
  var uvi = data.current.uvi;

  var currentWeatherDiv = `
  <div class="row feature-style border border-dark mt-3 mb-3 p-2" id="currentCity">
    <h2 id="cityHeader">${title}</h2>
    <div id="currentWeather">
    <p>Temp: ${temp}</p>
    <p>Wind: ${wind}</p>
    <p>Humidity: ${humidity}</p>
    <p>UV Index: ${uvi}</p>
    </div>
  </div>
`;
  currentForecastDiv.innerHTML = currentWeatherDiv;
  console.log(data);

  weatherForeCastContainer.removeAttribute("hidden");

  weatherForecastEl.innerHTML = "";

  var dailyForecast = data.daily;

  for (var i = 0; i < 5; i++) {
    var currentDailyWeather = dailyForecast[i];
    var date =
      today.getMonth() +
      1 +
      "/" +
      (today.getDate() + i + 1) +
      "/" +
      today.getFullYear();
    var forecastIcon = currentDailyWeather.weather[0].icon;
    var weatherDescription = currentDailyWeather.weather[0].description;
    var weatherIconLink =
      "<img src='http://openweathermap.org/img/wn/" +
      forecastIcon +
      "@2x.png' alt='" +
      weatherDescription +
      "' title='" +
      weatherDescription +
      "'  />";
    console.log("Display Daily Weather: ", currentDailyWeather);

    var dailyItem = document.createElement("div");
    dailyItem.className = "day";
    dailyItem.innerHTML =
      "<p><strong>" +
      date +
      "</strong></p>" +
      "<p>" +
      weatherIconLink +
      "</p>" +
      "<p><strong>Temp:</strong> " +
      currentDailyWeather.temp.day.toFixed(1) +
      "°F</p>" +
      "<p><strong>Wind Speed:</strong> " +
      currentDailyWeather.wind_speed +
      " MPH</p>" +
      "<p><strong>Humidity:</strong> " +
      currentDailyWeather.humidity +
      "%</p>";

    weatherForecastEl.appendChild(dailyItem);
  }
}
