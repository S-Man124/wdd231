const API_KEY = "9e9feed533ec619989a650e190a4eed3";

const city = "Johannesburg";
const country = "ZA";

const currentWeatherContainer =
    document.querySelector("#current-weather");

const forecastContainer =
    document.querySelector("#weather-forecast");

const spotlightContainer =
    document.querySelector("#spotlights");


async function getWeather() {
    const currentUrl =
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${API_KEY}`;

    const forecastUrl =
        `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&appid=${API_KEY}`;

    try {
        const [currentResponse, forecastResponse] =
            await Promise.all([
                fetch(currentUrl),
                fetch(forecastUrl)
            ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Unable to retrieve weather data.");
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);

    } catch (error) {
        console.error("Weather error:", error);

        currentWeatherContainer.innerHTML =
            "<p>Weather information is currently unavailable.</p>";

        forecastContainer.innerHTML =
            "<p>Forecast information is currently unavailable.</p>";
    }
}


function displayCurrentWeather(weather) {
    const temperature =
        Math.round(weather.main.temp);

    const description =
        weather.weather[0].description;

    const icon =
        weather.weather[0].icon;

    const iconUrl =
        `https://openweathermap.org/img/wn/${icon}@2x.png`;

    currentWeatherContainer.innerHTML = `
        <div class="weather-current-card">
            <img
                src="${iconUrl}"
                alt="${description}"
                width="100"
                height="100">

            <div>
                <p class="current-temperature">
                    ${temperature}&deg;C
                </p>

                <p>
                    ${description}
                </p>

                <p>
                    Johannesburg, South Africa
                </p>
            </div>
        </div>
    `;
}


function displayForecast(weatherData) {
    const dailyForecasts = {};

    weatherData.list.forEach((forecast) => {
        const date = forecast.dt_txt.split(" ")[0];
        const hour = new Date(forecast.dt * 1000).getHours();

        if (
            !dailyForecasts[date] ||
            Math.abs(hour - 12) <
            Math.abs(
                new Date(dailyForecasts[date].dt * 1000).getHours() - 12
            )
        ) {
            dailyForecasts[date] = forecast;
        }
    });

    const forecastDays =
        Object.values(dailyForecasts).slice(1, 4);

    forecastContainer.innerHTML = "";

    forecastDays.forEach((forecast) => {
        const date =
            new Date(forecast.dt * 1000);

        const dayName =
            date.toLocaleDateString("en-ZA", {
                weekday: "long"
            });

        const temperature =
            Math.round(forecast.main.temp);

        const description =
            forecast.weather[0].description;

        const icon =
            forecast.weather[0].icon;

        const iconUrl =
            `https://openweathermap.org/img/wn/${icon}@2x.png`;

        const card =
            document.createElement("article");

        card.classList.add("forecast-card");

        card.innerHTML = `
            <h4>${dayName}</h4>

            <img
                src="${iconUrl}"
                alt="${description}"
                width="80"
                height="80">

            <p class="forecast-temperature">
                ${temperature}&deg;C
            </p>

            <p>
                ${description}
            </p>
        `;

        forecastContainer.appendChild(card);
    });
}


async function getSpotlights() {
    try {
        const response =
            await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }

        const members =
            await response.json();

        const eligibleMembers =
            members.filter(
                (member) =>
                    member.membership === 2 ||
                    member.membership === 3
            );

        const shuffledMembers =
            [...eligibleMembers].sort(
                () => Math.random() - 0.5
            );

        const selectedMembers =
            shuffledMembers.slice(0, 3);

        displaySpotlights(selectedMembers);

    } catch (error) {
        console.error(
            "Unable to load member spotlights:",
            error
        );

        spotlightContainer.innerHTML =
            "<p>Unable to load member spotlights.</p>";
    }
}


function displaySpotlights(members) {
    spotlightContainer.innerHTML = "";

    members.forEach((member) => {
        const card =
            document.createElement("article");

        card.classList.add("spotlight-card");

        card.innerHTML = `
            <img
                src="images/${member.image}"
                alt="${member.name} logo"
                loading="lazy"
                width="300"
                height="200">

            <h3>${member.name}</h3>

            <p>
                <strong>Membership:</strong>
                ${getMembershipLevel(member.membership)}
            </p>

            <p>
                <strong>Phone:</strong>
                ${member.phone}
            </p>

            <p>
                <strong>Address:</strong>
                ${member.address}
            </p>

            <p>
                <a
                    href="${member.website}"
                    target="_blank"
                    rel="noopener noreferrer">
                    Visit Website
                </a>
            </p>
        `;

        spotlightContainer.appendChild(card);
    });
}


function getMembershipLevel(level) {
    if (level === 3) {
        return "Gold";
    }

    if (level === 2) {
        return "Silver";
    }

    return "Member";
}


getWeather();
getSpotlights();