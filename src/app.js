function searchCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-city-input");
  // let city = searchInput.value;
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInput.value;
}

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", searchCity);
