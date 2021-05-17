
// Connecting API to search form
var cityHistoryArr = []
if(localStorage.getItem("history")){
    cityHistoryArr = JSON.parse(localStorage.getItem("history"))
}

function renderButtons (){
    var cities = $("#city-list")
    cities.empty()

    for(i=0; i<cityHistoryArr.length; i++){
        var newLi = $("<li>")
        var newBtn = $("<button>")
        newBtn.addClass("city-button");
        newBtn.text(cityHistoryArr[i])
        newLi.append(newBtn)
        cities.append(newLi)
    newBtn.on("click", handleBtnSubmit)
    }

}

function handleBtnSubmit() {
    console.log("works");
var searchInputVal = this.textContent;
console.log(searchInputVal);
    
GetWeatherData(searchInputVal)

}

function GetWeatherData(value) {

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=c67ede96dd8b09ac55a1a15325cc40ad&units=imperial`)
        .then(res => res.json())
        .then(fiveDay => {
            var filteredArr = fiveDay.list.filter(query => query.dt_txt.includes("12:00:00"))
           // console.log(filteredArr);
            printForcastCards(filteredArr);
            
    })

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${value}&appid=c67ede96dd8b09ac55a1a15325cc40ad&units=imperial`)
        .then(res => res.json())
        .then(currentDay => {
            console.log(currentDay)
            
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${currentDay.coord.lat}&lon=${currentDay.coord.lon}&appid=c67ede96dd8b09ac55a1a15325cc40ad`)
                .then(res => res.json())
                .then(({current}) => {
                    printCurrentDay(currentDay, current.uvi)
                })
        })

}


function submit (e) {
    e.preventDefault()
    document.querySelector('#current-weather-row').setAttribute("class", "row")
    document.querySelector('#five-day-forcast').setAttribute("class", "row")
    var value = document.querySelector(".form-control").value
    cityHistoryArr.push(value)
    if(cityHistoryArr.length>8){
        cityHistoryArr.splice(0,1)
    }
    localStorage.setItem("history", JSON.stringify(cityHistoryArr))
    renderButtons()
    GetWeatherData(value)
}

function printForcastCards(fiveDay){
    console.log(fiveDay);
    console.log(fiveDay[0].dt_txt.split(" ")[0])
//     var dateOne = moment().format("(M/D/YYYY)");
//     $("#forecast-date1").text(new Date().toLocaleDateString())
//     var dayOneIcon = "http://openweathermap.org/img/w/" + fiveDay.weather[0].icon + ".png"
//    $("#forecast-icon1").attr("src", dayOneIcon)
// console.log(fiveDay.weather[0].icon)
    var forecastTemp = $("#forecast-temp1");
    forecastTemp.text(`Temp: ${fiveDay[0].main.temp}°F`);
    var forecastHumidity = $("#forecast-humidity1");
    forecastHumidity.text(`Humidity: ${fiveDay[0].main.humidity}`);
    
    var forecastTemp2 = $("#forecast-temp2");
    forecastTemp2.text(`Temp: ${fiveDay[1].main.temp}°F`);
    var forecastHumidity2 = $("#forecast-humidity2");
    forecastHumidity2.text(`Humidity: ${fiveDay[1].main.humidity}%`);

    var forecastTemp3 = $("#forecast-temp3");
    forecastTemp3.text(`Temp: ${fiveDay[2].main.temp}°F`);
    var forecastHumidity3 = $("#forecast-humidity3");
    forecastHumidity3.text(`Humidity: ${fiveDay[2].main.humidity}%`);


    var forecastTemp4 = $("#forecast-temp4");
    forecastTemp4.text(`Temp: ${fiveDay[3].main.temp}°F`);
    var forecastHumidity4 = $("#forecast-humidity4");
    forecastHumidity4.text(`Humidity: ${fiveDay[3].main.humidity}%`);


    var forecastTemp5 = $("#forecast-temp5");
    forecastTemp5.text(`Temp: ${fiveDay[4].main.temp}°F`);
    var forecastHumidity5 = $("#forecast-humidity5");
    forecastHumidity5.text(`Humidity: ${fiveDay[4].main.humidity}%`);
}

function printCurrentDay(currentDay, uvi) {
    var cityName = $("#city-name");
    cityName.text(currentDay.name);
    var todayDate = moment().format("(M/D/YYYY)");
    $("#current-date").text(new Date().toLocaleDateString())
    console.log(currentDay.weather[0].icon)
    var imgIcon = "http://openweathermap.org/img/w/" + currentDay.weather[0].icon + ".png"
   $("#current-icon").attr("src", imgIcon)
    var currentTemp = $("#current-temp");
    currentTemp.text(`Temperature: ${currentDay.main.temp}°F`)
    var currentHumidity = $("#current-humidity")
    currentHumidity.text(`Humidity: ${currentDay.main.humidity}%`)
    var currentWind = $("#current-wind");
    currentWind.text(`Wind Speed: ${currentDay.wind.speed} MPH`);
    var currentUvi = $("#current-uv")
    currentUvi.text(`UV Index: ${uvi}`)
}




// renderButtons()
document.querySelector(".btn").addEventListener("click", submit)
