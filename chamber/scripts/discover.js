import { places } from "../data/places.mjs";

const placesContainer = document.querySelector("#discover-cards");
const visitMessage = document.querySelector("#visit-message");

function displayPlaces() {
    placesContainer.innerHTML = "";

    places.forEach((place, index) => {
        const card = document.createElement("article");

        card.classList.add("discover-card");
        card.classList.add(`card-${index + 1}`);

        card.innerHTML = `
            <h2>${place.name}</h2>

            <figure>
                <img
                    src="images/${place.image}"
                    alt="${place.name}"
                    width="300"
                    height="200"
                    loading="lazy">
            </figure>

            <address>${place.address}</address>

            <p>${place.description}</p>

            <button type="button">Learn More</button>
        `;

        placesContainer.appendChild(card);
    });
}

function displayVisitMessage() {
    const currentVisit = Date.now();
    const lastVisit = localStorage.getItem("lastVisit");

    if (!lastVisit) {
        visitMessage.textContent =
            "Welcome! Let us know if you have any questions.";
    } else {
        const previousVisit = Number(lastVisit);
        const difference = currentVisit - previousVisit;
        const millisecondsPerDay = 1000 * 60 * 60 * 24;
        const daysBetweenVisits = Math.floor(
            difference / millisecondsPerDay
        );

        if (daysBetweenVisits < 1) {
            visitMessage.textContent =
                "Back so soon! Awesome!";
        } else if (daysBetweenVisits === 1) {
            visitMessage.textContent =
                "You last visited 1 day ago.";
        } else {
            visitMessage.textContent =
                `You last visited ${daysBetweenVisits} days ago.`;
        }
    }

    localStorage.setItem("lastVisit", currentVisit);
}

displayPlaces();
displayVisitMessage();