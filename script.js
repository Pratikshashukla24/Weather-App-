const apiKey = "3a236c92f707c7e5a00fad2efa88a99f"; // Replace with your key
const weatherDiv = document.getElementById("weather");

document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("city").value.trim();
  if (city) getWeather(city);
  else alert("Please enter a city name");
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  weatherDiv.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    weatherDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
  }
}

function displayWeather(data) {
  const { name, main, weather, wind } = data;
  const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  weatherDiv.innerHTML = `
    <h2>${name}</h2>
    <img src="${icon}" alt="${weather[0].description}">
    <p>${weather[0].description.toUpperCase()}</p>
    <p>🌡 Temperature: ${main.temp} °C</p>
    <p>💧 Humidity: ${main.humidity}%</p>
    <p>🌬 Wind: ${wind.speed} m/s</p>
  `;
}
