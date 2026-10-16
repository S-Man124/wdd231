import { formatIncidentDate } from "./utils.js";
const incidentList = document.querySelector("#incident-list");
const searchInput = document.querySelector("#incident-search");
const categoryFilter = document.querySelector("#category-filter");
const resultsCount = document.querySelector("#results-count");
const dialog = document.querySelector("#incident-dialog");
const dialogContent = document.querySelector("#dialog-content");
const closeDialogButton = document.querySelector("#close-dialog");

let incidents = [];

const savedCategory = localStorage.getItem("incidentCategory");

if (savedCategory) {
    categoryFilter.value = savedCategory;
}

async function loadIncidents() {
    try {
        const response = await fetch("data/incidents.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        incidents = await response.json();
        displayIncidents();
    } catch (error) {
        incidentList.textContent = "Unable to load incident information.";
        console.error("Incident data error:", error);
    }
}

function displayIncidents() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filteredIncidents = incidents.filter((incident) => {
        const matchesSearch =
            incident.title.toLowerCase().includes(searchTerm) ||
            incident.location.toLowerCase().includes(searchTerm);

        const matchesCategory =
            selectedCategory === "all" ||
            incident.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    incidentList.innerHTML = "";

    filteredIncidents.forEach((incident) => {
        const card = document.createElement("article");
        card.className = "card";

        const heading = document.createElement("h3");
        heading.textContent = incident.title;

        const category = document.createElement("p");
        category.textContent = `Category: ${incident.category}`;

        const location = document.createElement("p");
        location.textContent = `Location: ${incident.location}`;

        const status = document.createElement("p");
        status.textContent = `Status: ${incident.status}`;

        const date = document.createElement("p");
        date.textContent = `Date: ${formatIncidentDate(incident.date)}`;

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "View Details";
        button.className = "button";
        button.addEventListener("click", () => showIncidentDetails(incident));

        card.append(heading, category, location, status, date, button);
        incidentList.appendChild(card);
    });

    resultsCount.textContent =
        `${filteredIncidents.length} incident record(s) found.`;
}

function showIncidentDetails(incident) {
    dialogContent.replaceChildren();

    const description = document.createElement("p");
    description.textContent = incident.description;

    const location = document.createElement("p");
    location.textContent = `Location: ${incident.location}`;

    const status = document.createElement("p");
    status.textContent = `Status: ${incident.status}`;

    dialogContent.append(description, location, status);
    dialog.showModal();
}

searchInput.addEventListener("input", displayIncidents);

categoryFilter.addEventListener("change", () => {
    localStorage.setItem("incidentCategory", categoryFilter.value);
    displayIncidents();
});

closeDialogButton.addEventListener("click", () => {
    dialog.close();
});

loadIncidents();
