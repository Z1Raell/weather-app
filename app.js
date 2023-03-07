const API_KEY = 'cfd642a0da5691003f0f5a9927e84022'


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

    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    const result = await res.json();
    console.log(result);
    return result;
}

document.querySelector('.search').addEventListener('click', async () => {
    let city = document.querySelector('#city');
    if (city.value === '') {
        return;
    }
    try {
        let weather = await getWeather(city.value);
        if (weather.cod >= 200 && weather.cod < 300) {
            initialStateVisibility();
            displayWeather(weather);
        } else if (weather.cod === `404`) {
            initialStateVisibility();
            displayError404();
        } else {
            initialStateVisibility();
            displayError(weather);
        }
    } catch (error) {
        console.log(error);
        if (error.cod === 404) {
            console.log(hi);
            initialStateVisibility();
            displayError404();
        } else {
            initialStateVisibility();
            displayError(error);
        }
    }
});


/* weather display function  */

function displayWeather(weather) {
    const {
        weather: [{ main, description }],
        main: { temp, humidity },
        wind: { speed }
    } = weather;
    let img = document.querySelector('.weather-box img');
    let succsec = document.querySelector('.sucsses');
    let temperature = document.querySelector('.temperature');
    let descriptionEl = document.querySelector('.description');
    let windSpead = document.querySelector('.wind .text span');
    let humidityEl = document.querySelector('.humidity .text span');

    succsec.style.display = 'block';

    temperature.innerHTML = `${Math.round(temp - 273)}&degC`;
    descriptionEl.innerHTML = description;
    windSpead.innerHTML = `${speed} km/h`;
    humidityEl.innerHTML = `${humidity}%`;

    switch (main) {
        case 'Clear':
            img.src = '/images/clear.png';
            break;
        case 'Clouds':
            img.src = '/images/cloud.png';
            break;
        case 'Mist':
            img.src = '/images/mist.png';
            break;
        case 'Rain':
            img.src = '/images/rain.png';
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

