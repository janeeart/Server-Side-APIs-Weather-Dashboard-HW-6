// API KEY TO BE VIEWED BY EVERYONE THAT CROSSES THROUGH MY GITHUB
// I HAVE PUT THIS HERE SO THAT IT IS VISIBLE TO THE WORLD 
// PLEASE STEAL MY IDENTITY
// c67ede96dd8b09ac55a1a15325cc40ad


function submit (e) {
    e.preventDefault()

    let value = document.querySelector(".form-control").value
    
    
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=c67ede96dd8b09ac55a1a15325cc40ad&units=imperial`)
        .then(res => res.json())
        .then(fiveDay => {
            var filteredArr = fiveDay.list.filter(query => query.dt_txt.includes("12:00:00"))
            console.log(filteredArr)
    })

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${value}&appid=c67ede96dd8b09ac55a1a15325cc40ad&units=imperial`)
        .then(res => res.json())
        .then(currentDay => {
            console.log(currentDay)
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${currentDay.coord.lat}&lon=${currentDay.coord.lon}&appid=c67ede96dd8b09ac55a1a15325cc40ad`)
                .then(res => res.json())
                .then(({current}) => console.log(current.uvi))
        })

}




document.querySelector(".btn").addEventListener("click", submit)