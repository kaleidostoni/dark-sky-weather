
const form = $('#search-form');
const apiKey = '4941258feb233f44c3411edc79dafc06';
const apiKeyGoogle = 'AIzaSyC_6vdS4q8F3Avr7FHynHJhV2o52lSkOcE'

// función que pinta los datos obtenidos del clima
function paintingWeather(weather){
    let input = $('#search-input');
    let inputValue = input.val();
    const cityName = inputValue.toUpperCase();
    const temperatureF = weather.temperature;
    const temperatureC = Math.trunc((temperatureF-32)/1.8);
    const summary = weather.summary;
    const wind = Math.trunc(weather.windSpeed);
    const humidity = weather.humidity;
    const uv = weather.uvIndex;
    const pressure = Math.trunc(weather.pressure);
   let template = `<div class="col l6 s12 offset-l3 ">
     <div class="card  weather-card">
       <div class="card-content white-text">
         <h4 class=" center">${cityName}</h4>
         <h5 class="center">${summary}</h5>
         <h1 class="center">${temperatureC} ºC</h1>
       </div>
       <div class="card-action center">
       <h5 class="white-text">WIND   ${wind}km/h</h5>
       <h5 class="white-text">HUMIDITY   ${humidity}%</h5>
       <h5 class="white-text">UV INDEX   ${uv}</h5>
       <h5 class="white-text">PRESSURE   ${pressure}</h5>
       </div>
     </div>
   </div>`
    $('#weather-container').html(template);
}

//función que entra a los resultados del request
function getWeather(result){
    console.log(result);
    const weather = result.currently;
    paintingWeather(weather);
}

//función que hace la petición a la api dark sky usando la latitud y longitud  obtenidas con la api de google
function weatherRequest(lng, lat) {

    $.ajax({
        url: `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${apiKey}/${lat},${lng}`
    }).done(getWeather)
        .fail(failedRequest)
}

//función que entra a el resultado de la petición y guarda la latitud y longitud
function getCity(json) {
    const lng = json.results[0].geometry.location.lng;
    // console.log(lng);
    const lat = json.results[0].geometry.location.lat;
    // console.log(lat);
    weatherRequest(lng, lat);
}

function failedRequest() {
    console.log('oh no!');
}
//función que realiza la petición a la api de google con la ciudad inglesada por el usuario
form.submit(function (e) {
    e.preventDefault();
    let input = $('#search-input');
    let inputValue = input.val();

    $.ajax({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${inputValue}&key=${apiKeyGoogle}`
    }).done(getCity)
        .fail(failedRequest)

})

