//Today Variables 
let today_name = document.getElementById("today_name");
let today_number = document.getElementById("today_number");
let today_month = document.getElementById("today_month");
let today_location = document.getElementById("today_location");
let today_temp = document.getElementById("today_temp");
let today_img = document.getElementById("today_img");
let today_condition = document.getElementById("today_condition");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let wind_dir = document.getElementById("wind_dir");


// next data

let tomorrow_name = document.getElementsByClassName("tomorrow_name");
let tomorrow_img = document.getElementsByClassName("tomorrow_img");
let next_max_temp = document.getElementsByClassName("next_max_temp");
let next_min_temp = document.getElementsByClassName("next_min_temp");
let tomorrow_condition = document.getElementsByClassName("tomorrow_condition");

// search input
let search = document.getElementById("search");


// Fetch Api Data 
async function getWeatherData(cityName){
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d16ec8af531646efbcf114524240908&q=${cityName}&days=7`);
    let weatherData = await weatherResponse.json();
    return weatherData;
    
    
}

// display Today Data

function displayTodayData(data){
    let todayData = new Date();
    today_name.innerHTML = todayData.toLocaleDateString("en-us",{weekday:"long"})
    today_number.innerHTML = todayData.getDate();
    today_month.innerHTML = todayData.toLocaleDateString("en-us" , {month:"long"})
    today_location.innerHTML = data.location.name;
    today_temp.innerHTML = data.current.temp_c;
    today_img.setAttribute("src","https:"+data.current.condition.icon);
    today_condition.innerHTML =  data.current.condition.text;
    humidity.innerHTML = data.current.humidity+"%";
    wind.innerHTML = data.current.wind_kph+"km/h";
    wind_dir.innerHTML = data.current.wind_dir;
    

}
// display Next Days Data

function displayNextData(data){
    let forecastData = data.forecast.forecastday;
    for(let i=0 ; i<2 ; i++){
        let nextDate = new Date(forecastData[i+1].date);
        tomorrow_name[i].innerHTML = nextDate.toLocaleDateString("en-us" , {weekday:"long"});
        next_max_temp[i].innerHTML = forecastData[i+1].day.maxtemp_c;
        next_min_temp[i].innerHTML = forecastData[i+1].day.mintemp_c;
        tomorrow_img[i].setAttribute("src","https:"+forecastData[i+1].day.condition.icon);
        console.log(forecastData[i+1].day.condition.icon)
        tomorrow_condition[i].innerHTML = forecastData[i+1].day.condition.text;
    }
}
// Start App
async function startApp(city="london"){
    let weatherData = await getWeatherData(city)
        if(!weatherData.error){
            displayTodayData(weatherData);
            displayNextData(weatherData);
        }
}
startApp()

search.addEventListener("input" , function(){
  startApp(search.value);
    
})