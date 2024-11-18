// Importing the module
import { getWeather } from './weather.js';

// Weather button click.
const weatherBtn = document.querySelector(".btn-weather");
weatherBtn.addEventListener("click", getWeather);

// Pressing the enter key to click the search weather button.
const locationInput = document.getElementById('locationInput');
locationInput.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    getWeather();
  }
});

// Click event of Refresh button.
const refreshBtn = document.querySelector(".btn-refresh");
refreshBtn.addEventListener("click", refreshWeather);

// Page load to show current city data.
window.onload = getWeather;

// Refresh function.
function refreshWeather() {
  location.reload();
}
