function showTemperature(response) {
  let currentTemperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;
  let degrees = document.querySelector(".temperature");
  degrees.innerHTML = `${currentTemperature}`;
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
  axios.get(url).then(showTemperature);
}

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", submitSearch);

searchCity("Johannesburg");
