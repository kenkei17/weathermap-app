document.querySelector(".btn").addEventListener("click", getData);

// Function for getting data from API
function getData() {
  const API_KEY = "1fb04d2579c36a21d0df8c0c939ad6d7";
  const cityName = document.querySelector("#input").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;

  // Make request using fetch method
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "city not found") {
        document.querySelector(".container").innerHTML =
          "<h1>City Not Found</h1>";
      } else {
        // Handle the fetched data
        setIcon(data.weather[0].main);
        setTemperature(data.main.temp);
        setCityName(data.name);
        setHumidity(data.main.humidity);
        setWindSpeed(data.wind.speed);

        // Store weather data in localStorage
        const weatherData = {
          icon: data.weather[0].main,
          temperature: data.main.temp,
          cityName: data.name,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
        };
        localStorage.setItem("lastWeather", JSON.stringify(weatherData));
      }
    })
    .catch((error) => {
      console.error("Error during fetching data:" + error);
    });
}

//function for set icon in the application
function setIcon(data) {
  let icon = document.getElementById("icon");

  if (data === "Clear") {
    icon.src = "weather-app-img/images/clear.png";
  } else if (data === "Clouds") {
    icon.src = "weather-app-img/images/clouds.png";
  } else if (data === "Rain") {
    icon.src = "weather-app-img/images/rain.png";
  } else if (data === "Thunderstorm") {
    icon.src = "weather-app-img/images/rain.png";
  } else if (data === "snow") {
    icon.src = "weather-app-img/images/snow.png";
  } else if (data === "Mist") {
    icon.src = "weather-app-img/images/mist.png";
  } else if (data === "Smoke") {
    icon.src = "weather-app-img/images/clouds.png";
  } else if (data === "Haze") {
    icon.src = "weather-app-img/images/mist.png";
  } else if (data === "Dust") {
    icon.src = "weather-app-img/images/wind.png";
  } else if (data === "Fog") {
    icon.src = "weather-app-img/images/humidity.png";
  } else {
    icon.src = "weather-app-img/images/clear.png";
  }
}

//function for set temperature in the application
function setTemperature(data) {
  let temperature = document.getElementById("temp");
  centigrateTemp = Math.round(data - 273.15);
  temperature.innerText = centigrateTemp;
  return centigrateTemp;
}

//function for set city name in the application
function setCityName(data) {
  let cityName = document.getElementById("city-name");
  cityName.innerText = data;
}
//function for set humidity in the application
function setHumidity(data) {
  let humidity = document.getElementById("humidity");
  humidity.innerText = data;
}

//function for set wind speed in the application
function setWindSpeed(data) {
  let windSpeed = document.getElementById("wind-speed");
  windSpeed.innerText = data;
}
document.addEventListener("DOMContentLoaded", () => {
  const storedWeatherData = localStorage.getItem("lastWeather");
  if (storedWeatherData) {
    const weatherData = JSON.parse(storedWeatherData);
    setIcon(weatherData.icon);
    setTemperature(weatherData.temperature);
    setCityName(weatherData.cityName);
    setHumidity(weatherData.humidity);
    setWindSpeed(weatherData.windSpeed);
  }
});
