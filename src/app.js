function showWeather(response) {
  let currentTemperature = Math.round(response.data.temperature.current);

  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;

  let degrees = document.querySelector(".temperature");
  degrees.innerHTML = `${currentTemperature}`;

  let conditionElement = document.querySelector(".weatherCondition");
  conditionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = `${response.data.wind.speed}km/h`;

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img
      src="${response.data.condition.icon_url}"
      class="weather-icon"
    />`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[currentDate.getDay()];
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function submitSearch(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-city-input");
  searchCity(searchInput.value);
}

// each function should ideally do one thing and do it well
function searchCity(city) {
  let apiKey = "b4bfef39d45aa0tc0o1538f819e3be9c";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "b4bfef39d45aa0tc0o1538f819e3be9c";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast">
        <div class="weather-forecast-day">${formatDay(day.time)}</div>
        <div>
        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        </div>
        <div class="forecast-temperature">
          <div class="high">${Math.round(day.temperature.maximum)}°</div>
          <div class="low">${Math.round(day.temperature.minimum)}°</div>
        </div>
      </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", submitSearch);

searchCity("Johannesburg");

let currentDate = new Date();
let date = document.querySelector(".currentDay");
date.innerHTML = formatDate(currentDate);
