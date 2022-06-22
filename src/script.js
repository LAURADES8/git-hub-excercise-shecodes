import "./styles.css";
// time - day
let now = new Date();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[now.getDay()];
let date = document.querySelector("#date");
let currentTime = `${day} ${hour}:${minute}`;
date.innerHTML = currentTime;

// city temp search

function showTemperature(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  console.log(response);

  let currentTemperature = document.querySelector("#temperature");

  currentTemperature.innerHTML = `${Math.round(response.data.main.temp)}`;

  let humidity = document.querySelector("#humidity");
  let humidityValue = Math.round(response.data.main.humidity);
  humidity.innerHTML = `${humidityValue}`;

  let feelsLike = document.querySelector("#feelsLike");
  let feelTemp = Math.round(response.data.main.feels_like);
  feelsLike.innerHTML = `${feelTemp}`;
}

function showPosition(position) {
  console.log(position);
  let apiKey = "be592b4f188e18d71db0078e550c9556";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let currentCity = document.querySelector("h2");
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}
function showLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function currentCityWeather(event) {
  event.preventDefault();
  let apiKey = "be592b4f188e18d71db0078e550c9556";

  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let city = document.querySelector("#search-city");
  let currentCity = document.querySelector("h2");
  if (city.value) {
    currentCity.innerHTML = `${city.value}`;
  }
  let apiUrl = `${apiEndpoint}?q=${city.value}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function searchCity(city) {
  let apiKey = "be592b4f188e18d71db0078e550c9556";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?${city}&appid=${apiKey}&units=imperial`
  axios.get(apiUrl).then(showTemperature);;
}

let currentLocation = document.querySelector("#current-button");
currentLocation.addEventListener("click", showLocation);

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", currentCityWeather);

currentCityWeather("New York");