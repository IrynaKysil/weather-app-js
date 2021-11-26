const currentLocationElement = document.querySelector(".js-current-location div");
const searchForm = document.querySelector(".js-search-form");
const input = document.querySelector("input");
const temperatureElement = document.querySelector(".js-temperature div");
const descriptionElement = document.querySelector(".js-description div");
const currentWeatherIcon = document.querySelector(".js-current-weather-icon");
const notificationElement = document.querySelector(".js-notification div");
const weather = {};
const key = "8665a3223e46a3443c86e88384992503";
let city;
let latitude;
let longitude;

weather.temperature = {
  unit: "fahrenheit",
};

// Getting weather by city name
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  city = input.value;
  // console.log(city);
  getSearchWeather(city);
});

function getSearchWeather(city) {
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      weather.temperature.value = Math.floor((data.main.temp - 273.15) * 1.8 + 32);
      weather.description = data.weather[0].description;
      weather.city = data.name;
      weather.country = data.sys.country;
      weather.iconId = data.weather[0].icon;
      // console.log(weather.iconId);
    })
    .then(function () {
      displayWeather();
    });
}

// Getting weather by geolocation
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, displayError);
} else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<div> Browser doesn't support geolocation </div>";
}

function setPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  console.log(latitude, longitude);
  getGeolocationWeather(latitude, longitude);
}

function displayError(error) {
  console.log(error);
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<div> ${error.message} </div> `;
}

function getGeolocationWeather(latitude, longitude) {
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      weather.temperature.value = Math.floor((data.main.temp - 273.15) * 1.8 + 32);
      weather.description = data.weather[0].description;
      weather.city = data.name;
      weather.country = data.sys.country;
      weather.iconId = data.weather[0].icon;      
    })
    .then(function () {
      displayWeather();
    });
}

function displayWeather() {
  temperatureElement.innerHTML = `${weather.temperature.value} <span>℉<span>`;
  currentLocationElement.innerHTML = `${weather.city}, ${weather.country}`;
  descriptionElement.innerHTML = `${weather.description}`;
  currentWeatherIcon.innerHTML = `<img src="https://openweathermap.org/img/w/${weather.iconId}.png" alt="Weather Icon" />`; 
}
