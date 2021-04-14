
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
        var newBtn =$("<button>")
        newBtn.text(cityHistoryArr[i])
        newLi.append(newBtn)
        cities.append(newLi)
        
    }
    

    // function handleBtnSubmit() {
    //  document.querySelector(".form-control").text(cityButton)
    // submit(value);
    
    // }
    // cityButton.on('click', function (){
    //     handleBtnSubmit()
        
    // });
}





function submit (e) {
    e.preventDefault()

    var value = document.querySelector(".form-control").value
    cityHistoryArr.push(value)
    if(cityHistoryArr.length>8){
        cityHistoryArr.splice(0,1)
    }
    localStorage.setItem("history", JSON.stringify(cityHistoryArr))
    renderButtons()
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=c67ede96dd8b09ac55a1a15325cc40ad&units=imperial`)
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
        // .then(function(currentDay) {
        //     // printCurrentDay(currentDay)
        // })

}

function printForcastCards(fiveDay){
    console.log(fiveDay);
    var forcastTemp = $("#forecast-temp1");
    forcastTemp.text(fiveDay[0].main.temp);
    var forecastHumidity = $("#forecast-humidity1");
    forecastHumidity.text(fiveDay[0].main.humidity);

    var forcastTemp2 = $("#forecast-temp2");
    forcastTemp2.text(fiveDay[1].main.temp);
    var forecastHumidity2 = $("#forecast-humidity2");
    forecastHumidity2.text(fiveDay[1].main.humidity);

    var forcastTemp3 = $("#forecast-temp3");
    forcastTemp3.text(fiveDay[2].main.temp);
    var forecastHumidity3 = $("#forecast-humidity3");
    forecastHumidity3.text(fiveDay[2].main.humidity);

    var forcastTemp4 = $("#forecast-temp4");
    forcastTemp4.text(fiveDay[3].main.temp);
    var forecastHumidity4 = $("#forecast-humidity4");
    forecastHumidity4.text(fiveDay[3].main.humidity);

    var forcastTemp5 = $("#forecast-temp5");
    forcastTemp5.text(fiveDay[4].main.temp);
    var forecastHumidity5 = $("#forecast-humidity5");
    forecastHumidity5.text(fiveDay[4].main.humidity);


}

function printCurrentDay(currentDay, uvi) {
    var cityName = $("#city-name");
    console.log(currentDay.weather[0].icon)
    var imgIcon = "http://openweathermap.org/img/wn/" + currentDay.weather[0].icon + "@2x.png"
    console.log(imgIcon)
    cityName.text(currentDay.name);
    var currentTemp = $("#current-temp");
    currentTemp.text(`Temperature: ${currentDay.main.temp}°F`)
    var currentHumidity = $("#current-humidity")
    currentHumidity.text(`Humidity: ${currentDay.main.humidity}%`)
    var currentWind = $("#current-wind");
    currentWind.text(`Wind Speed: ${currentDay.wind.speed} MPH`);
    var currentUvi = $("#current-uv")
    currentUvi.text(`UV Index: ${uvi}`)
}




renderButtons()
document.querySelector(".btn").addEventListener("click", submit)
