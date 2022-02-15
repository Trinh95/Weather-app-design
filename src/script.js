//Display real time
function displayTime(currentTime) {
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];
  let day = days[currentTime.getDay()];
  let hour = currentTime.getHours();
  let minute = currentTime.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  return `${day}, ${hour}:${minute}`;
}

let dateTime = document.querySelector(".date-time");
let currentTime = new Date();
dateTime.innerHTML = displayTime(currentTime);

//Display city name in H1, temperature, humidity, wind, description.

function upperFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function showweather(response) {
  let city = response.data.name;
  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = city.toUpperCase();
  let temperatureNumber = response.data.main.temp;
  let humidityNumber = response.data.main.humidity;
  let windNumber = response.data.wind.speed;
  let description = response.data.weather[0].description;
  let temperatureElement = document.querySelector("#tempt");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionWeather = document.querySelector("h5");
  temperatureElement.innerHTML = Math.round(temperatureNumber);
  humidityElement.innerHTML = humidityNumber;
  windElement.innerHTML = windNumber;
  descriptionWeather.innerHTML = upperFirstLetter(description);
}

function queryLink(event) {
  event.preventDefault();
  let cityname = document.querySelector("#cityname");
  let city = cityname.value;
  let h1 = document.querySelector("h1");
  h1.innerHTML = city.toUpperCase();
  let apiKey = "c3b8d523aae85de22d68b39520fd6094";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(weatherUrl).then(showweather);
}

let searchbox = document.querySelector("#searchbox");
searchbox.addEventListener("submit", queryLink);

//Current location
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c3b8d523aae85de22d68b39520fd6094";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showweather);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let curLocButton = document.querySelector("#locationButton");
curLocButton.addEventListener("click", getLocation);

function KrakowWeather(city) {
  let apiKey = "c3b8d523aae85de22d68b39520fd6094";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(weatherUrl).then(showweather);
}
KrakowWeather("Krakow");

//function showPhoto(photo) {
// document.getElementById("cityPhoto").src = `${photo}`;
//}

//function showPhotoReference(response) {
//let photoRef = response.candidates[1].photo_reference;
//let apiPhoto = "AIzaSyBGe9y0OtkIttH_QUMmWvA8i7NYEJeIGEw";
//let linkPhoto = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoRef}&key=${apiPhoto}&maxwidth=400&maxheight=400`;
// axios.get(linkPhoto).then(showPhoto);
//}

//function changePhotoCity(city) {
//let apiPhoto = "AIzaSyBGe9y0OtkIttH_QUMmWvA8i7NYEJeIGEw";
//let linkPhotoReference = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${city}, IL&key=${apiPhoto}&inputtype=textquery&fields=name,photos`;
//axios.get(linkPhotoReference).then(showPhotoReference);
//}

//changePhotoCity("Cam Ranh");
