///<reference path="/jquery.d.ts" />
var $ = jQuery.noConflict();

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
        loadWeather(position.coords.latitude, position.coords.longitude);
    });
} else{
    loadWeather("Auckland, NZ","");
}

$(document).ready(function(){
    setInterval(getWeather ,10000);
});

function loadWeather(location : any, woeid : any){
    $.simpleWeather({
        location: location,
        woeid: woeid,
        unit: 'C',
        success: function(weather){
            var city = weather.city;
            var temp = weather.temp + '&deg;';
            var wcode = '<img class="weathericon" src="images/weathericons/'+weather.code+'.svg">';
            var wind = '<p>'+weather.wind.speed+'</p><p>'+weather.units.speed+'</p>';
            var humidity = weather.humidity+' %';
            $(".location").text(city);
            $(".temperature").html(temp);
            $(".climate_bg").html(wcode);
            $(".windspeed").html(wind);
            $(".humidity").text(humidity);
        },
        error: function(error){
            $(".error").html('<p>'+error+'</p>');
        }
        
    });
}
