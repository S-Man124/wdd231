const membersContainer = document.querySelector("#members");

const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");
function setView(view) {
    if (view === "grid") {
        membersContainer.classList.remove("member-list");
        membersContainer.classList.add("member-grid");

        gridButton.setAttribute("aria-pressed", "true");
        listButton.setAttribute("aria-pressed", "false");
    } else {
        membersContainer.classList.remove("member-grid");
        membersContainer.classList.add("member-list");

        gridButton.setAttribute("aria-pressed", "false");
        listButton.setAttribute("aria-pressed", "true");
    }
}

async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Unable to load member data:", error);
        membersContainer.innerHTML = "<p>Unable to load member information.</p>";
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("article");

        card.classList.add("member-card");

        card.innerHTML = `
            <img
                src="images/${member.image}"
                alt="${member.name} logo"
                loading="lazy"
                width="300"
                height="200">

            <h3>${member.name}</h3>

            <p>${member.description}</p>

            <p><strong>Address:</strong> ${member.address}</p>

            <p><strong>Phone:</strong> ${member.phone}</p>

            <p class="membership-level">
                <strong>Membership:</strong>
                ${getMembershipLevel(member.membership)}
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

        membersContainer.appendChild(card);
    });
}

function getMembershipLevel(level) {
    if (level === 3) {
        return "Gold";
    }

    if (level === 2) {
        return "Silver";
    }

    if (level === 1) {
        return "Member";
    }

    return "Other";
}

gridButton.addEventListener("click", () => {
    setView("grid");
});

listButton.addEventListener("click", () => {
    setView("list");
});

getMembers();