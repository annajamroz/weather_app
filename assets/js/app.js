let weatherForm = document.querySelector('.weather__form')
let inputCity = document.querySelector('.weather__city')
let apiDataContainer = document.querySelector('.weather__data')
let loader = document.querySelector('.weather__loader')

let apiUrl = 'https://api.weatherapi.com/v1/current.json?key=8a7cf9147860439d86e131323230104&aqi=yes&q='


weatherForm.addEventListener('submit', (event) => {
    let city = inputCity.value
    let fullApiUrl = apiUrl + city

    fetch(fullApiUrl).then(response => {
        hideLoader()
        if (response.status == 200) {
            return response.json()
        }

        throw new Error('Api Error')

    }).then((dataFromApi) => {
        // console.log(dataFromApi.current.temp_c)


        let view = ``
        // view += `W ${dataFromApi.location.name} jest dzisiaj ${dataFromApi.current.temp_c} stopni celcjusza`

        view += `<div class="weather__info">`
        //city
        view += `<div class="weather__location">
        <p>${dataFromApi.location.name}</p>
        <p>${dataFromApi.location.country}</p>
        <p>${dataFromApi.location.localtime}</p>
            </div>`
        //icon
        view += `<div class="weather__icon"><img src="${dataFromApi.current.condition.icon}" alt="${dataFromApi.current.condition.text}"></div>`
        //temp
        view += `<div class="weather__temp">${dataFromApi.current.temp_c} <span>
            &deg;C
        </span></div>`

        // details
        view += `<div class="weather__details">
                <p>The amount of rainfall: ${dataFromApi.current.precip_mm}mm </p>
                <p>Humidity: ${dataFromApi.current.humidity}%</p>
                <p>Wind: ${dataFromApi.current.wind_kph}km/h</p>
            </div>`;

        view += `</div>`

        apiDataContainer.innerHTML = view
    }).catch((error) => {
        showError()
    })




    event.preventDefault()



})

/*
Show error function
*/

let showError = () => {
    apiDataContainer.innerHTML = `<div class="weather__error"> City not found or we have problem with API</div>`


}

let showLoader = () => {
    loader.style.display = 'block'

}

let hideLoader = () => {
    loader.style.display = 'none'
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
}