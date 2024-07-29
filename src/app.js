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

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="weather-forecast">
        <div class="weather-forecast-day">${day}</div>
        <div class="weather-forecast-icon">☁️</div>
        <div class="forecast-temperature">
          <div class="high">15°</div>
          <div class="low">11°</div>
        </div>
      </div>`;
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

displayForecast();
