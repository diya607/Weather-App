const apiKey = "f7e6e8d4901c725c55c4be4da1de1444";

function getCityWeather() {
  const city = document.getElementById("cityInput").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetchWeather(url, city);
}

function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Geolocation is not supported by this browser.");
  }

  function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    fetchWeather(url, "Your Location");
  }

  function error() {
    document.getElementById("weatherResult").innerHTML = `<p style="color:red">Location access denied. Please enter a city.</p>`;
  }
}

function fetchWeather(url, label) {
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("Location not found");
      return response.json();
    })
    .then(data => {
      const temp = data.main.temp;
      const desc = data.weather[0].description;
      const icon = data.weather[0].icon;
      document.getElementById("weatherResult").innerHTML = `
        <h2>${label}</h2>
        <p><strong>${temp}°C</strong></p>
        <p>${desc}</p>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
      `;
    })
    .catch(error => {
      document.getElementById("weatherResult").innerHTML = `<p style="color:red">${error.message}</p>`;
    });
}
