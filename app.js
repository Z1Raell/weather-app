let key = 'cfd642a0da5691003f0f5a9927e84022'


/* creating a function to set the initial block display values */

function initialStateVisibility() {
    let error404 = document.querySelector('.error404');
    let succsec = document.querySelector('.sucsses');
    let error = document.querySelector('.error');

    error404.style.display = 'none';
    succsec.style.display = 'none';
    error.style.display = 'none';
}

/* Getting weather data with the openweathermap API */

async function getWeather(city) {
    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`);
    let result = await res.json()
    return result;
}

document.querySelector('.search').addEventListener('click', async () => {
    let city = document.querySelector('#city');

    if (city.value === '') {
        return
    }

    let weather = await getWeather(city.value);

    if (weather.cod >= 200 && weather.cod < 300) {
        initialStateVisibility();
        console.log(weather);
        displayWeather(weather)
    }
    if (weather.cod === 404) {
        initialStateVisibility();
        displayError404()
    }
    if (weather.cod >= 400 && weather.cod < 600 && weather.cod !== 404) {
        initialStateVisibility();
        displayError404(weather)
    }
})

/* weather display function  */

function displayWeather(weather) {

    let img = document.querySelector('.weather-box img');
    let succsec = document.querySelector('.sucsses');
    let temperature = document.querySelector('.temperature');
    let description = document.querySelector('.description');
    let windSpead = document.querySelector('.wind .text span');
    let humidity = document.querySelector('.humidity .text span');



    succsec.style.display = 'block';

    temperature.innerHTML = `${Math.round(weather.main.temp - 273)}&degC`;
    description.innerHTML = weather.weather[0].description;
    windSpead.innerHTML = `${weather.wind.speed} km/h`;
    humidity.innerHTML = `${weather.main.humidity}%`



    switch (weather.weather[0].main) {
        case 'Clear':
            img.src = '/images/clear.png'
            break
        case 'Clouds':
            img.src = '/images/cloud.png'
            break
        case 'Mist':
            img.src = '/images/mist.png'
            break
        case 'Rain':
            img.src = '/images/rain.png'
            break
        case 'Snow':
            img.src = '/images/snow.png'
            break
    }
}

/* function display error city not founded */

function displayError404() {
    let error404 = document.querySelector('.error404');
    error404.style.display = 'block'
}

/* function display other error */
function displayError(data) {
    let error = document.querySelector('.error');
    let errorInfo = document.querySelector('.error p');
    error.style.display = 'block';
    errorInfo.innerHTML = `Oops! Somthing is wrong: ${data.cod}`
}

