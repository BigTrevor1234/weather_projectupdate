"use strict";
let titleLogo = document.querySelector(".title");
let bodyElem = document.querySelector("body");


let cityInput = document.querySelector("#get-city");
let sendBtn = document.querySelector("#send-btn");
cityInput.addEventListener("keypress", (event) => {
	if (event.key == "Enter") {
		fetchDataFromApi();
	}
});
if (sendBtn) {
	sendBtn.addEventListener("click", () => {
		fetchDataFromApi();
	});
}

let apiData = {
	url: "https://api.openweathermap.org/data/2.5/weather?q=",
	key: "124b92a8dd9ec01ffb0dbf64bc44af3c",
};
cityInput.value = "tokyo";
fetchDataFromApi();
cityInput.value = "";
function fetchDataFromApi() {
	let insertedCity = cityInput.value;
	fetch(`${apiData.url}${insertedCity}&&appid=${apiData.key}`)
		.then((res) => res.json())
		.then((data) => addDataToDom(data));
}

let cityName = document.querySelector(".city-name");
let cityTemp = document.querySelector(".weather-deg");
let cityCond = document.querySelector(".weather-condition");
let cityHumidity = document.querySelector(".humidity");
let todayDate = document.querySelector(".date");
function addDataToDom(data) {
	cityName.innerHTML = `${data.name}, ${data.sys.country}`;
	cityTemp.innerHTML = `${Math.round(data.main.temp - 273.15)}°c`;
	cityCond.innerHTML = data.weather[0].description;
	cityHumidity.innerHTML = `humidity: ${data.main.humidity}%`;
	todayDate.innerHTML = getDate();

	// Show weather icon
	let iconDisplay = document.querySelector('.weather-icon-display');
	if (iconDisplay) {
		// Remove previous icon if any
		iconDisplay.innerHTML = '';
		// Get icon code from OpenWeatherMap
		let iconCode = data.weather[0].icon;
		let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
		let img = document.createElement('img');
		img.src = iconUrl;
		img.alt = data.weather[0].main;
		img.className = 'weather-main-icon';
		iconDisplay.appendChild(img);
	}
}

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function getDate() {
	let newTime = new Date();
	let month = months[newTime.getMonth()];
	return `${newTime.getDate()} ${month} ${newTime.getFullYear()}`;
}
