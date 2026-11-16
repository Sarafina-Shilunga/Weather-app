const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");

const API_KEY = "0ec66f0ebfa868a045b04538a7be1f61";

async function getWeather(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("City not found");
  }

  return response.json();
}

function renderWeather(data) {
  const { name, main, weather, wind } = data;

  weatherInfo.innerHTML = `
    <div>
      <h2 class="city-name">${name}</h2>
      <p class="temp">${Math.round(main.temp)}°C</p>
      <p class="description">${weather[0].description}</p>

      <div class="details">
        <div class="detail-box">
          <strong>Humidity</strong>
          ${main.humidity}%
        </div>

        <div class="detail-box">
          <strong>Wind</strong>
          ${Math.round(wind.speed)} m/s
        </div>
      </div>
    </div>
  `;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();
  if (!city) return;

  weatherInfo.innerHTML = `<p class="placeholder">Loading...</p>`;

  try {
    const data = await getWeather(city);
    renderWeather(data);
  } catch (error) {
    weatherInfo.innerHTML = `
      <p class="error">Could not find that city. Try again.</p>
    `;
  }
});