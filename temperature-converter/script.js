function CToF() {
    document.getElementById('result').style.display = 'flex';

    let temp = document.getElementById("temperature").value;

    let temperature = parseFloat(temp);
    temperature = (temperature * 1.8) + 32;

    document.getElementById("result").innerHTML = temp + "°C is equal to " + temperature.toFixed(2) + "°F";
}

function FToC() {
    document.getElementById('result').style.display = 'flex';

    let temp = document.getElementById("temperature").value;

    let temperature = parseFloat(temp);
    temperature = (temperature - 32) / 1.8;
    
    document.getElementById("result").innerHTML = temp + "°F is equal to " + temperature.toFixed(2) + "°C";
}