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

let maxTempFrcst = [];
let minTempFrcst= [];


let mornTemperature;
let dayTemperture;
let nightTemperature;

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
    maxTempFrcst = [];
    minTempFrcst= [];
    mornTemperature = 0;
    dayTemperture = 0;
    nightTemperature =0;
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
    getFrcst(response.data.coord);

    
}
function showTempCelcium(valueOfTemp){
    document.querySelector('#main-temp').innerHTML = `${currentTemp}°C`;
    let frcstId = 0;
    maxTempFrcst.forEach(function(temp){
        frcstId+=1;
        document.getElementById(`tempmax${frcstId}`).innerHTML = `${temp}°`;
    });
    frcstId = 0;
    minTempFrcst.forEach(function(temp){
        frcstId+=1;
        document.getElementById(`tempmin${frcstId}`).innerHTML = `${temp}°`;
    });
    document.getElementById('morningTemp').innerHTML = `${mornTemperature}°`;
    document.getElementById('dayTemp').innerHTML = `${dayTemperture}°`;
    document.getElementById('nightTemp').innerHTML = `${nightTemperature}°`;
}



function showFaren(max, min){
    let farengeitFormula = currentTemp * 1.8 + 32;
    farengeitFormula = Math.round(farengeitFormula);
    document.querySelector('#main-temp').innerHTML = `${farengeitFormula}°F`;
    let idFrcst = 0;
    maxTempFrcst.forEach(function(nums){
      let far = nums * 1.8 + 32;
      idFrcst+=1;
      document.getElementById(`tempmax${idFrcst}`).innerHTML = `${Math.round(far)}°`;
    });
    idFrcst = 0;
    minTempFrcst.forEach(function(nums){
      let far = nums * 1.8 + 32;
      idFrcst+=1;
      document.getElementById(`tempmin${idFrcst}`).innerHTML = `${Math.round(far)}°`;
    });
    let mornTemp = Math.round(mornTemperature * 1.8 +32);
    document.getElementById('morningTemp').innerHTML = `${mornTemp}°`;
    let dayTemp = Math.round(dayTemperture * 1.8 +32);
    document.getElementById('dayTemp').innerHTML = `${dayTemp}°`;
    let nghtTemp = Math.round(nightTemperature * 1.8 +32);
    document.getElementById('nightTemp').innerHTML = `${nghtTemp}°`;
}
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
function getFrcst(coords){
  console.log(coords);
  let apiKey = '0fbf741dd6f046088a411342ceb1813f';
  let apiURL1 = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${apiKey}`;
  axios.get(apiURL1).then((response)=>{
    showFrcst(response);
    showHourlyIcon(response);
  });
}
function setForecastDate(days){
  let date = new Date(days * 1000);
  let day = date.getDay();
  return weekDaysNames[day];

};
function showFrcst(response){
  let frcstApiArray = response.data.daily;
  let frcst = document.querySelector('#forecast');
  let frcstHTML = '';
  let idFrcst = 0;
  frcstApiArray.forEach(function(frcstDay, index){
    if(index > 0 && index < 6){
        idFrcst+=1;
        frcstHTML += `<div class="col" id="weather-frcst">
        <div class="weather-frcst-day">
          ${setForecastDate(frcstDay.dt)}
        </div>
        <div class="weater-frcst-temp">
          <span class="weathr-frcst-tempmax" id="tempmax${idFrcst}">
            ${Math.round(frcstDay.temp.max)}°
          </span>
          <span class="weather-frcst-mintemp" id="tempmin${idFrcst}">
            ${Math.round(frcstDay.temp.min)}°
          </span>
        </div>
        <div class="weather-frcst-icon">
         <img src='https://openweathermap.org/img/wn/${frcstDay.weather[0].icon}@2x.png'>
        </div>
      </div>`;
        frcst.innerHTML = frcstHTML;
        let maxTempF = Math.round(frcstDay.temp.max);
        maxTempFrcst.push(maxTempF);
        console.log(maxTempFrcst);
        let minTempF = Math.round(frcstDay.temp.min);
        minTempFrcst.push(minTempF);
        console.log(minTempFrcst);

        mornTemperature = Math.round(frcstDay.temp.morn);
        dayTemperture = Math.round(frcstDay.temp.day);
        nightTemperature = Math.round(frcstDay.temp.night);
        
        let morningTemp = document.getElementById('morningTemp');
        morningTemp.innerHTML = `${Math.round(frcstDay.temp.morn)}°`;
        let dayTemp = document.getElementById('dayTemp');
        dayTemp.innerHTML = `${Math.round(frcstDay.temp.day)}°`;
        let nightTemp = document.getElementById('nightTemp');
        nightTemp.innerHTML = `${Math.round(frcstDay.temp.night)}°`;
      }
    })
};
function showHours(unixdate){
  let date = new Date(unixdate*1000);
  let hours = date.getHours();
  let minutes = `0${date.getMinutes()}`;
  return `${hours} : ${minutes.substring(-2)}`;
};
function showHourlyIcon(response){
   let currentDailyTemp = document.querySelector('#currentDailyWeather');
   let hourlyDataArr = response.data.hourly;
   console.log(hourlyDataArr);
     hourlyDataArr.forEach(function getHoursData(hourlyData){
      console.log(showHours(hourlyData.dt))
      console.log(setForecastDate(hourlyData.dt));     
   });      
};
showFrcst();
showHourlyIcon();


