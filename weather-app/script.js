const API_KEY = "7b5d6888ee919a50bc4e62c507d4eb18";
const weatherData = document.querySelector("#weather__data");
const cityInput = document.querySelector("#city__input");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const cityValue = cityInput.value;
	getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${API_KEY}&units=metric`
		);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		const temperature = Math.round(data.main.temp);
		const description = data.weather[0].description;
		const icon = data.weather[0].icon;
		const details = [
			`Feels like: <span class="datas">${Math.round(
				data.main.feels_like
			)}°C</span>`,
			`Humidity: <span class="datas">${data.main.humidity}%</span>`,
			`Wind speed: <span class="datas">${data.wind.speed}m/s</span>`,
		];

		weatherData.querySelector(".icon").innerHTML = `
		<img src= "http://openweathermap.org/img/wn/${icon}.png" alt="weather icon">
		`;
		weatherData.querySelector(".temprature").textContent = `${temperature}°C`;
		weatherData.querySelector(".description").textContent = `${description}`;
		weatherData.querySelector(".details").innerHTML = details
			.map((detail) => `<div><span>${detail}</span></div></div>`)
			.join("");
	} catch (error) {
		weatherData.querySelector(".icon").innerHTML = "";
		weatherData.querySelector(".temprature").textContent = "";
		weatherData.querySelector(".description").textContent =
			"An Error happened please try again later";
		weatherData.querySelector(".details").innerHTML = "";
	}
}
