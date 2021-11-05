const currentLocationElement = document.querySelector(".js-current-location div");
const searchForm = document.querySelector(".js-search-form");
const input = document.querySelector("input");
const temperatureElement = document.querySelector(".js-temperature div");
const descriptionElement = document.querySelector(".js-description div");
const weather = {};
const key = "8665a3223e46a3443c86e88384992503";
let city;


weather.temperature = {
  unit: "fahrenheit",
};

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  city = input.value;
  console.log(city);
  getSearchWeather(city);
});

function getSearchWeather(city) {
  let api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
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
    })
    .then(function () {
      displayWeather();
    });
}

function displayWeather() {
  temperatureElement.innerHTML = `${weather.temperature.value} <span>℉<span>`;
  currentLocationElement.innerHTML = `${weather.city}, ${weather.country}`;
  descriptionElement.innerHTML = `${weather.description}`;
}
