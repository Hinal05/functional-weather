export async function getWeather() {
  document.getElementById('loader').classList.remove('hidden');
  let location = document.getElementById('locationInput').value;
  let apiUrl, apiWeekUrl;

  if (!location && navigator.geolocation) { // Show current city data.
    navigator.geolocation.getCurrentPosition(async function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const apiKey = 'efe9ef18e4d646eaab861441241211';
      apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`; // Current city API.
      apiWeekUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=7`; // Forecast API.

      try {
        const currentResponse = await fetch(apiUrl);
        const currentData = await currentResponse.json();
        const weekResponse = await fetch(apiWeekUrl);
        const weekData = await weekResponse.json();

        if (currentResponse.ok) {
          // Display current location weather.
          const weatherDescription = currentData.current.condition.text;
          const temperatureCelsius = currentData.current.temp_c;
          const cityName = currentData.location.name;
          const country = currentData.location.country;

          document.getElementById('currentLocationWeather').innerHTML = `
            <h2>Current Location Weather</h2>
            <p>Location: ${cityName}, ${country}</p>
            <p>Weather: ${weatherDescription}</p>
            <p>Temperature: ${temperatureCelsius} °C</p>
          `;

          // Display current location weekly forecast.
          const forecastDays = weekData.forecast.forecastday;
          let forecastHTML = '';

          forecastDays.forEach(day => {
            const date = day.date;
            const weekdate = new Date(day.date);
            const weekday = weekdate.toLocaleString('en-US', { weekday: 'long' });
            const weatherDescription = day.day.condition.text;
            const maxTempCelsius = day.day.maxtemp_c;
            const minTempCelsius = day.day.mintemp_c;

            forecastHTML += `
              <tr>
                <td>${date}</td>
                <td>${weekday}</td>
                <td>${weatherDescription}</td>
                <td>${maxTempCelsius} °C</td>
                <td>${minTempCelsius} °C</td>
              </tr>
            `;
          });

          document.getElementById('searchLocationWeeklyWeatherInfo').innerHTML = forecastHTML;
        } else {
          document.getElementById('currentLocationWeather').innerHTML = 'Weather data not found for your current location.';
        }
      } catch (error) {
        console.error('Error fetching current location weather:', error);
        document.getElementById('currentLocationWeather').innerHTML = 'An error occurred while fetching current location weather.';
      } finally {
        // Hide loader
        document.getElementById('loader').classList.add('hidden');
      }
    });
  } else { //  Showing search city data.
    const apiKey = 'efe9ef18e4d646eaab861441241211';
    apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
    apiWeekUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const weekResponse = await fetch(apiWeekUrl);
      const weekData = await weekResponse.json();

      if (response.ok) {
        // Display searched location weather.
        const weatherDescription = data.current.condition.text;
        const temperatureCelsius = data.current.temp_c;
        const cityName = data.location.name;
        const country = data.location.country;
        const region = data.location.region;

        document.getElementById('currentLocationWeather').innerHTML = `
          <h2>Searched Location Weather</h2>
          <p>Location: ${cityName}, ${country}, ${region}</p>
          <p>Weather: ${weatherDescription}</p>
          <p>Temperature: ${temperatureCelsius} °C</p>
        `;

        // Display searched location weekly forecast.
        const forecastDays = weekData.forecast.forecastday;
        let forecastHTML = '';

        forecastDays.forEach(day => {
          const date = day.date;
          const weekdate = new Date(day.date);
          const weekday = weekdate.toLocaleString('en-US', { weekday: 'long' });
          const weatherDescription = day.day.condition.text;
          const maxTempCelsius = day.day.maxtemp_c;
          const minTempCelsius = day.day.mintemp_c;

          forecastHTML += `
            <tr>
              <td>${date}</td>
              <td>${weekday}</td>
              <td>${weatherDescription}</td>
              <td>${maxTempCelsius} °C</td>
              <td>${minTempCelsius} °C</td>
            </tr>
          `;
        });

        document.getElementById('searchLocationWeeklyWeatherInfo').innerHTML = forecastHTML;
      } else {
        document.getElementById('currentLocationWeather').innerHTML = 'Weather data not found.';
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      document.getElementById('currentLocationWeather').innerHTML = 'An error occurred while fetching weather data.';
    } finally {
      // Hide loader
      document.getElementById('loader').classList.add('hidden');
    }
  }
}
