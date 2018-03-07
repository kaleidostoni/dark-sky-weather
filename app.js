
const form = $('#search-form');
const apiKey = '4941258feb233f44c3411edc79dafc06';
const apiKeyGoogle = 'AIzaSyC_6vdS4q8F3Avr7FHynHJhV2o52lSkOcE'

function paintingWeather(weather){
    console.log(weather);
    const temperature = weather.temperature;
    console.log(temperature);
    const wind = weather.windSpeed;
    console.log(wind);
    const humidity = weather.humidity;
    console.log(humidity);
    const uv = weather.uvIndex;
    console.log(uv);
    const pressure = weather.pressure;
    console.log(pressure);
    //let temperature = weather.app
}

function getWeather(result){
    const weather = result.currently;
    paintingWeather(weather);
}

function weatherRequest(lng, lat) {

    $.ajax({
        url: `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${apiKey}/${lat},${lng}`
    }).done(getWeather)
        .fail(failedRequest)
}


function getCity(json) {
    const lng = json.results[0].geometry.location.lng;
    console.log(lng);
    const lat = json.results[0].geometry.location.lat;
    console.log(lat);
    weatherRequest(lng, lat);
}


function failedRequest() {
    console.log('oh no!');
}

form.submit(function (e) {
    e.preventDefault();
    let input = $('#search-input');
    let inputValue = input.val();

    $.ajax({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${inputValue}&key=${apiKeyGoogle}`
    }).done(getCity)
        .fail(failedRequest)

})


