// ===============================
// 1️⃣ Select Elements
// ===============================

let cityInput = document.getElementById("city-input");
let searchBtn = document.getElementById("search-btn");
let historyDiv = document.getElementById("search-history");

let cityName = document.getElementById("city-name");
let temperature = document.getElementById("temperature");
let weatherType = document.getElementById("weather-type");
let humidity = document.getElementById("humidity");
let windSpeed = document.getElementById("wind-speed");

let consoleBox = document.getElementById("console-box");


// ===============================
// 2️⃣ Console Log Function
// ===============================

function addConsoleMessage(message) {
    let p = document.createElement("p");
    p.textContent = message;
    consoleBox.appendChild(p);
}


// ===============================
// 3️⃣ Fetch Weather Function
// ===============================

async function getWeather(city) {

    consoleBox.innerHTML = "";   // Clear console
    addConsoleMessage("Sync Start");

    try {

        addConsoleMessage("[ASYNC] Start fetching");

        // 🔥 Use your own API key from openweathermap
        let response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5f3d9a7c1b8e4f6a2c9d0e123456abcd`
        );

        let data = await response.json();

        addConsoleMessage("Promise.then (Microtask)");
        addConsoleMessage("setTimeout (Macrotask)");

        setTimeout(() => {
            addConsoleMessage("[ASYNC] Data received");
        }, 0);

        // Update UI
        cityName.textContent = data.name + ", " + data.sys.country;
        temperature.textContent = data.main.temp + " °C";
        weatherType.textContent = data.weather[0].main;
        humidity.textContent = data.main.humidity + "%";
        windSpeed.textContent = data.wind.speed + " m/s";

    } catch (error) {
        alert("City not found!");
        console.log(error);
    }

    addConsoleMessage("Sync End");
}


// ===============================
// 4️⃣ Add To History
// ===============================

function addToHistory(city) {

    let btn = document.createElement("button");
    btn.textContent = city;
    btn.classList.add("history-btn");

    btn.addEventListener("click", function () {
        getWeather(city);
    });

    historyDiv.appendChild(btn);
}


// ===============================
// 5️⃣ Button Click Event
// ===============================

searchBtn.addEventListener("click", function () {

    let city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter city name");
        return;
    }

    getWeather(city);
    addToHistory(city);

    cityInput.value = "";
});