
const form = $('#search-form');
const apiKey = '4941258feb233f44c3411edc79dafc06';
const apiKeyGoogle = 'AIzaSyC_6vdS4q8F3Avr7FHynHJhV2o52lSkOcE'

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


