const API_KEY = "1fb04d2579c36a21d0df8c0c939ad6d7";

// Create a variable to store the last searched city.
let lastSearchedCity = "";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
// Function to get data from the API.
function getData() {
  // Get the city name from the input field.
  let cityName = document.querySelector("#input").value;

  // Check if the city name is the same as the last searched city.
  if (cityName === lastSearchedCity) {
    // If the city name is the same, then get the data from the cache.
    const cachedData = localStorage.getItem("weatherData");
    if (cachedData !== null) {
      // Set the values of the weather data elements.
      setIcon(cachedData.weather[0].main);
      setTemperature(cachedData.main.temp);
      setCityName(cachedData.name);
      setHumidity(cachedData.main.humidity);
      setWindSpeed(cachedData.wind.speed);
    } else {
      // If the cache is empty, then get the data from the API.
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          // Save the data in the cache.
          localStorage.setItem("weatherData", JSON.stringify(data));

          // Set the values of the weather data elements.
          setIcon(data.weather[0].main);
          setTemperature(data.main.temp);
          setCityName(data.name);
          setHumidity(data.main.humidity);
          setWindSpeed(data.wind.speed);
        });
    }
  } else {
    // If the city name is not the same, then get the data from the API and clear the cache.
    localStorage.removeItem("weatherData");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Set the values of the weather data elements.
        setIcon(data.weather[0].main);
        setTemperature(data.main.temp);
        setCityName(data.name);
        setHumidity(data.main.humidity);
        setWindSpeed(data.wind.speed);

        // Save the data in the cache.
        localStorage.setItem("weatherData", JSON.stringify(data));
      });
  }

  // Save the last searched city.
  lastSearchedCity = cityName;
}
