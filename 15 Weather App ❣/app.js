const API_KEY = `5e74d2d93a29e5ae4f9dfdee08748076`

const formElm = document.querySelector('.form')
const formInputElm = document.querySelector('.form-input')
const weatherLocationElm = document.querySelector('.weather-location')
const weatherUnitElm = document.querySelector('.weather-unit')
const weatherValueElm = document.querySelector('.weather-value')
const weatherHumidityElm = document.querySelector('.weather-humidity')
const weatherDescriptionElm = document.querySelector('.weather-description')


let longitude, latitude = null
let celcius, farenheit = null

// get weather by user GeoLocation
async function getWeatherByGeoLocation() {
    if (longitude && latitude) {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            )
            const data = await response.json()
            setAndRenderWeather(data)
        }
        catch (e) {
            setErrorMessage()
        }
    } else {
        setErrorMessage()
    }
}

//get weather data using city name
async function getWeatherByCity(event) {
    event.preventDefault()
    const city = formInputElm.value
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        )
        const data = await response.json()
        if (data.cod === '404') throw "err"
        setAndRenderWeather(data)
    } catch (e) {
        setErrorMessage('City is not available')
    }
    formInputElm.value = ''
}

//render the values in dom
function setAndRenderWeather(weatherData) {
    celcius = weatherData?.main?.temp
    farenheit = Math.floor(celcius * (9 / 5) + 32)

    weatherLocationElm.textContent = weatherData.name
    weatherValueElm.textContent = celcius
    weatherUnitElm.textContent = 'C'
    weatherHumidityElm.textContent = `Hummidity ${weatherData?.main?.humidity}`
    weatherDescriptionElm.textContent = weatherData?.weather[0]?.description || weatherData?.weather[0]?.main
}

//toggleTemperature units
function toggleTemperatureUnit() {
    let currentWeatherUnit = weatherUnitElm.textContent

    if (currentWeatherUnit === 'C') {
        weatherValueElm.textContent = farenheit
        weatherUnitElm.textContent = 'F'
    } else if (currentWeatherUnit === 'F') {
        weatherValueElm.textContent = celcius
        weatherUnitElm.textContent = 'C'
    } else { return }

}

// get latitude and longitude using browser Navigation api.
function getGeoLocation() {
    navigator.geolocation.getCurrentPosition(async (position) => {
        latitude = position.coords.latitude
        longitude = position.coords.longitude
        await getWeatherByGeoLocation()
    })
}

//Set's error message
const setErrorMessage = (errMessage = '') => {
    weatherLocationElm.textContent = (errMessage === '') ? `Weather App..!` : errMessage
    weatherHumidityElm.textContent = ''
    weatherDescriptionElm.textContent = ''
    weatherValueElm.textContent = ''
    weatherUnitElm.textContent = ''
}

// Event Listeners
formElm.addEventListener('submit', getWeatherByCity)
weatherValueElm.addEventListener('click', toggleTemperatureUnit)
weatherUnitElm.addEventListener('click', toggleTemperatureUnit)
window.addEventListener('load', getGeoLocation)



/* -------- Notes ------------
API - https://openweathermap.org/api
Api EndPoint with City name  = `api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid=${API_KEY}`
Api EndPoint with lat,long = `api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid=${API_KEY}`

Required Attribute from API response
    name
    main.temp
    main.humidity
    weather[0].description
*/