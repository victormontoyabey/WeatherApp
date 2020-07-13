window.addEventListener('load', ()=> {
    let long;
    let lat;
    let locationTimeZone = document.querySelector('.location-timezone');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let humidity = document.querySelector('.humidity');
    let todayDate = document.querySelector('.today-date');
    let windSpeed = document.querySelector('.wind-speed');
    let visibility = document.querySelector('.visibility');
    let pressure = document.querySelector('.pressure');
    let sunrise = document.querySelector('.sunrise');
    let sunset = document.querySelector('.sunset');
    let myDate = new Date();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=d5f88bf8e740a9d82677f46f346f0a33&units=Imperial`;
        
            fetch(api) 
            .then(response => {
                return response.json();
                })
                .then(data => {
                    console.log(data);
                    // Set DOM Elements from the API 
                    locationTimeZone.textContent = data.name;
                    temperatureDegree.textContent = Math.round(data.main.temp);
                    humidity.textContent = data.main.humidity + '%';
                    todayDate.textContent = myDate.format('l F d') + 'th, ' + myDate.format('Y');
                    windSpeed.textContent = data.wind.speed + ' MPH';
                    visibility.textContent = Math.round(data.visibility / 1609) + '+ Mi';
                    pressure.textContent = data.main.pressure + ' mb';
                    sunrise.textContent = data.sys.sunrise;
                    sunset.textContent = data.sys.sunset;

                    // Set Icon
                    let iconCode = data.weather[0].icon;
                    let iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
                    $('#weather-icons').attr('src', iconUrl);
                });
        });
    }
});