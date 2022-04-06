var currentCity = ""

function getWeather(city) { 
    var geo = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=0410708d7855732d8c891d609ff8098b"
    fetch (geo) 
    .then (function (response) {
        return response.json();
    })
    .then ( function (data) {
        var weather = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&exclude=minutely,hourly,alerts&appid=0410708d7855732d8c891d609ff8098b"
        fetch (weather)
        .then (function (response){
            return response.json();
        })
        .then (function (data){
            console.log(data);
        })
        .catch(function (errors){
            if (errors) {
            alert("weather api not working") }
        })
    }) 

    .catch (function (errors) {
        if (errors) {
            alert("An error has occured")}
        else {
            console.log('All Good!')
        }
    })
}; 

getWeather('Milwaukee');

// FUNCTIONS:
// display current weather
// display 5 day forcast, for loop [1-5], 
// display search history, for loop array local storage, add event listener
// save new city (local storage) search history
// event listener for search button, get value from input, calling get weather with user value input, global var for current city displayed
// create an icon date.current.weather[0].icon goes into http://openweathermap.org/img/wn/_________@2x.png