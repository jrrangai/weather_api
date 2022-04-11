var currentCity = ""
var cityArray = JSON.parse(localStorage.getItem('city'))?JSON.parse(localStorage.getItem('city')):[]
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

var seachBtn = document.getElementById('cityInquire')

// fetch weather and the lat/lon
function getWeather(city) { 
    var geo = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=0410708d7855732d8c891d609ff8098b"
    fetch (geo) 
    .then (function (response) {
        return response.json();
    })
    .then ( function (data) {
        var weather = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&units=imperial&exclude=minutely,hourly,alerts&appid=0410708d7855732d8c891d609ff8098b"
        fetch (weather)
        .then (function (response){
            return response.json();
        })
        .then (function (data){
            console.log(data);
            getCurrent(city, data);
            fiveDay(data);
            pastSearch(currentCity);
        })
        .catch(function (errors){
            if (errors) {
            alert("weather api not working") }
        })
    })
}; 

// display current weather/date
function getCurrent (city, data) {
    var time = data.current.dt
    var date = dayjs().tz(data.timezone).format('M/D/YYYY')
    var displayWeather = document.getElementById('currentWeather')
    displayWeather.innerHTML = ""
    var weatherColumn = document.createElement('div')
    var weatherCard = document.createElement('div')
    var cityTitle = document.createElement('h2')
    var temp = document.createElement('p')
    var humidity = document.createElement('p')
    var wind = document.createElement('p')
    var uv = document.createElement('p')
    var icon = document.createElement('img')

    weatherColumn.setAttribute('class', 'col-md')
    weatherCard.setAttribute('class', 'card-body')
    icon.setAttribute('src', 'http://openweathermap.org/img/wn/' + data.current.weather[0].icon + '@2x.png')
    cityTitle.innerText = city + " " + date
    temp.innerText = data.current.temp + ' °F'
    humidity.innerText = "Humidity: " + data.current.humidity + '%'
    wind.innerText = "Wind: " + data.current.wind_speed + ' MPH'
    uv.innerText = "UV index: " + data.current.uvi
    displayWeather.append(weatherColumn)
    weatherColumn.append(weatherCard)
    weatherCard.append(cityTitle, icon, temp, humidity, wind, uv)
}

// display 5 day forcast, for loop [1-5], 
function fiveDay(data) {
    var fiveDayDiv = document.getElementById('fiveDay')
    fiveDayDiv.innerHTML = ""
    
    for(i = 1; i < 6; i++) {
    var fiveDayCol = document.createElement('div')
    fiveDayCol.setAttribute('class', 'col')
    var date = document.createElement('div')
    var icon = document.createElement('img')
    date.textContent = dayjs.unix(data.daily[i].dt).tz(data.timezone).format('M/D/YYYY')
    var tempDaily = document.createElement('p')
    var humidityDaily = document.createElement('p')
    var windDaily = document.createElement('p')
    var uvDaily = document.createElement('p')
    icon.setAttribute('src', 'http://openweathermap.org/img/wn/' + data.daily[i].weather[0].icon + '@2x.png')
    tempDaily.innerText = data.daily[i].temp.max + " °F"
    humidityDaily.innerText = 'Humidity: ' + data.daily[i].humidity + '%'
    windDaily.innerText = "Wind: " + data.daily[i].wind_speed + " MPH"
    uvDaily.innerText = "UV index: " + data.daily[i].uvi
    fiveDayCol.append(date, icon, tempDaily, humidityDaily, windDaily, uvDaily)
    fiveDayDiv.append(fiveDayCol)
    }
}

// search bar 
seachBtn.addEventListener('click', function(event) {
    event.preventDefault();
    currentCity = document.getElementById('search-city').value
    getWeather(currentCity) 
    
    var pastCities = document.getElementById('pastSearch');
    var list = document.createElement('li');
    var btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.innerText = document.querySelector('#search-city').value;
    list.append(btn);
    pastCities.append(list);
    btn.classList.add('btn', 'btn-info', 'btn-outline-dark');
})

// locally store searches
function pastSearch(city) {
    cityArray.push(city)
    localStorage.setItem('city', JSON.stringify(cityArray))
}

function loadCities() {
    var pastCities = document.getElementById('pastSearch');
    for(var i = 0; i < 5; i++) {
        var list = document.createElement('li');
        var btn = document.createElement('button');
        btn.setAttribute('type', 'button');
        btn.classList.add('btn', 'btn-info', 'btn-outline-dark')
        btn.innerText = cityArray[i];
        list.append(btn);
        pastCities.append(list);
    }
}

// default city
getWeather("Milwaukee");
loadCities();
