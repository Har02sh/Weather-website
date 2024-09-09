const feelsLike = document.querySelector('#feelsLike');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const windSpeed = document.getElementById('wind_speed');
const humidity = document.getElementById('humidity_percent');
const currTime = document.getElementById('time');
const pressure = document.getElementById('pressure-value');
const weatherImg = document.getElementById('weather-icon');
const weatherBox = document.querySelector('.weather');
const errorBox = document.querySelector(".errorBox");
const detailBox = document.querySelector(".weather-details");
const inputField = document.querySelector('#searchCity')
const background = document.querySelector('body')


function time(offsetInSeconds) {
    const currentTime = new Date();
    const offsetInMilliseconds = offsetInSeconds * 1000;
    const timeInTimezone = new Date(currentTime.getTime() + offsetInMilliseconds);
    const hours = String(timeInTimezone.getUTCHours()).padStart(2, '0');
    const minutes = String(timeInTimezone.getUTCMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

function display(weather_data) {
    weatherBox.style.height = "55%";
    const url2 = `https://pixabay.com/api/?key=xxxxxxxx&q=${weather_data.name}&image_type=photo`
    if (weather_data.cod === '404') {
        // Show error message and hide weather details
        errorBox.style.display = "flex";
        detailBox.style.display = "none";
        weatherBox.style.boxShadow = "rgb(255, 0, 0, 0.8) 0px 20px 40px -5px";
        background.style.background = "url(map.jpg)"
        background.style.backgroundRepeat = "no-repeat";
        background.style.backgroundSize = "cover";
        background.style.backgroundAttachment = "fixed";
        background.style.backgroundPosition = "center";
        return;
    } else {
        // Hide error box and display weather details
        errorBox.style.display = "none";
        detailBox.style.display = "flex";
        weatherBox.style.boxShadow = "rgba(255, 223, 100, 0.8) 0px 20px 40px -5px";
    }
    async function backgroundImg(){
        let response = await fetch(url2)
        response = await response.json()
        background.style.background = `url(${response.hits[0].largeImageURL})`
        background.style.backgroundRepeat = "no-repeat";
        background.style.backgroundSize = "cover";
        background.style.backgroundAttachment = "fixed";
        background.style.backgroundPosition = "center";
    }
    backgroundImg()
    feelsLike.innerHTML = `Feels Like: ${Math.round(weather_data.main.feels_like)}°C`;
    temperature.innerHTML = `${Math.round(weather_data.main.temp)}°C`;
    description.innerHTML = `${weather_data.weather[0].main}`;
    windSpeed.innerHTML = `${Math.round(weather_data.wind.speed * 3.6)} km/h`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    currTime.innerHTML = `${time(weather_data.timezone)}`;
    pressure.innerHTML = `${weather_data.main.pressure} hPa`;

    const weatherIcon = weather_data.weather[0].main;
    updateWeatherIcon(weatherIcon);
}

function updateWeatherIcon(weatherIcon) {
    switch (weatherIcon) {
        case "Clouds":
        case "Haze":
        case "Mist":
            weatherImg.src = "cloud.png";
            weatherBox.style.boxShadow = "rgb(135, 206, 235, 0.8) 0px 20px 40px -5px";
            break;
        case "Snow":
            weatherImg.src = "snowflake.png";
            weatherBox.style.boxShadow = "rgb(255, 250, 250, 0.8) 0px 20px 40px -5px";
            break;
        case "Rain":
        case "Drizzle":
            weatherImg.src = "rain.png";
            weatherBox.style.boxShadow = "rgb(61, 10, 213, 0.8) 0px 20px 40px -5px";
            break;
        case "Thunderstorm":
            weatherImg.src = "thunderstorm.png";
            weatherBox.style.boxShadow = "rgb(61, 10, 213, 0.8) 0px 20px 40px -5px";
            break;
        case "Fog":
            weatherImg.src = "haze.png";
            weatherBox.style.boxShadow = "rgb(255, 250, 250, 0.8) 0px 20px 40px -5px";
            break;
        default:
            weatherImg.src = "sunny.png";
            weatherBox.style.boxShadow = "rgba(255, 223, 100, 0.8) 0px 20px 40px -5px";
    }
}

function weather(city_name) {
    const apiKey = "xxxxxxxxxxxxxxxxxxx"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(response => display(response))
        .catch(error => {
            console.error("Error:", error);
            // Show error box on any fetch failure
            errorBox.style.display = "flex";
            detailBox.style.display = "none";
            weatherBox.style.boxShadow = "rgb(255, 0, 0, 0.6) 0px 20px 40px -5px";
        });
}

const searchCity = document.querySelector('button');
searchCity.addEventListener('click', () => {
    const city_name = inputField.value;
    if (city_name.trim() !== "") {
        weather(city_name);
    }
});

inputField.addEventListener('keypress',(e)=>{
    if (e.key == "Enter"){
        const city_name = inputField.value;
        if (city_name.trim() !== "") {
            weather(city_name);
        }
    }
})

