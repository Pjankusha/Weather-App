navigator.geolocation.getCurrentPosition(showPosition);
let currentDate = new Date();
let weekDaysNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let currentWeekDayName = weekDaysNames[currentDate.getDay()];
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
if(minutes < 10){
  minutes = '0'+ minutes;
}
let day = currentDate.getDate();
let currentMonth = currentDate.getMonth();
let infoAboutDateTime = document.querySelector('#currentDateTime');
infoAboutDateTime.innerHTML = `<br><span class="update"> Last update:</span> ${currentWeekDayName}, ${hours}:${minutes} <br> ${day} ${months[currentMonth]}`;

let currentCity;
let currentTemp;

let form = document.querySelector('#search-form');
form.addEventListener('submit', changeCity);
function changeCity(e){
    e.preventDefault();
    let usersCity = document.querySelector('#users-city');
    let userCityValue = usersCity.value;
    userCityValue = userCityValue.trim();
    let apiKey = '6323624f01fa63895cfaefb817b105ed';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${userCityValue}&appid=${apiKey}&units=metric`
    axios.get(url).then(showCity);
    usersCity.value = '';
    
}

function showCity(response){
    let city = response.data.name;
    console.log(city);
    document.querySelector('#city').innerHTML = `${city}`;
    let temp = Math.round(response.data.main.temp);
    document.querySelector('#main-temp').innerHTML = `${temp}°C`;
    currentTemp = temp;
    let wind = Math.round(response.data.wind.speed);
    document.querySelector('#wind').innerHTML = `${wind}`;
    let humidity = response.data.main.humidity;
    document.querySelector('#humidity').innerHTML = `${humidity}%`;
    let description = response.data.weather[0].description;
    document.querySelector('#weather-description').innerHTML = description;
    console.log(response.data);
    let icon = document.querySelector('#main-icon');
    let iconImg = response.data.weather[0].icon;
    //icon.setAttribute('src', `https://openweathermap.org/img/wn/${iconImg}@2x.png`);
    //console.log(iconImg);
    icon.innerHTML = `<img src='https://openweathermap.org/img/wn/${iconImg}@2x.png'>`;
    
}
function showTempCelcium(event){
    document.querySelector('#main-temp').innerHTML = `${currentTemp}°C`;
};

function showFaren(event){
    let farengeitFormula = currentTemp * 1.8 + 32;
    farengeitFormula = Math.round(farengeitFormula);
    document.querySelector('#main-temp').innerHTML = `${farengeitFormula}°F`;
  };
let celsium = document.querySelector('#celsium');  
celsium.addEventListener('click', showTempCelcium);
let farengeit = document.querySelector('#farengeit');
farengeit.addEventListener('click', showFaren);

function showPosition(position){
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = '6323624f01fa63895cfaefb817b105ed';
  let units = 'metric';
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&limit=5&units=${units}&appid=${apiKey}`;
  axios.get(url).then(showCity);
}
let currentButton = document.querySelector('#currentButton');
currentButton.addEventListener('click', showFirstCity);

function showFirstCity(event){
  navigator.geolocation.getCurrentPosition(showPosition);
}





