async function getWeather() {
    const location = document.getElementById('location').value;
    if(location === "")
    { 
        location.value = "Cambridge";
        document.getElementById('place').innerHTML = "Weather In Cambridge";
    }
    else {
        document.getElementById('place').innerHTML = "Weather In " + location;
    }

    const url = "https://wttr.in/" + location + "?format=j1";

    try {
        const response =  await fetch(url);
        const data = await response.json();

        if(response.ok) {
            //console.log(data);
            display(data);
        }
    }
    catch (errorMessage) {
    }
}

function display(data) {
    const currentCondition = data.current_condition[0];
    const feelsLikeTemperature = currentCondition.FeelsLikeC;
    const currentTemperature = currentCondition.temp_C;
    const sky = currentCondition.weatherDesc[0].value;
    const humidity = currentCondition.humidity;
    const windSpeed = currentCondition.windspeedKmph;
    const windSpeedMph = currentCondition.windspeedMiles;

    document.getElementById('feelsLike').innerHTML = feelsLikeTemperature + "°C";
    document.getElementById('temperature').innerHTML = currentTemperature + "°C";
    document.getElementById('sky').innerHTML = sky;
    document.getElementById('humidity').innerHTML = humidity + "%";
    document.getElementById('windkm').innerHTML = windSpeed + " Km/Hr";
    document.getElementById('windmph').innerHTML = windSpeedMph + "Mph/hr";
}