const formResults = document.querySelector("#form-results");

const params = new URLSearchParams(window.location.search);

if (!params.has("first-name")) {
    formResults.innerHTML = `
        <p>No membership application data was submitted.</p>
        <p>
            <a href="join.html">Complete the membership application</a>
        </p>
    `;
} else {
    const firstName = params.get("first-name");
    const lastName = params.get("last-name");
    const email = params.get("email");
    const phone = params.get("phone");
    const organization = params.get("organization");
    const title = params.get("title");
    const membership = params.get("membership");
    const description = params.get("description");
    const timestamp = params.get("timestamp");

    const membershipNames = {
        np: "NP Membership",
        bronze: "Bronze Membership",
        silver: "Silver Membership",
        gold: "Gold Membership"
    };

    formResults.innerHTML = `
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Business / Organization:</strong> ${organization}</p>
        <p><strong>Organizational Title:</strong> ${title}</p>
        <p><strong>Membership Level:</strong> ${membershipNames[membership]}</p>
        <p><strong>Description:</strong> ${description || "Not provided"}</p>
        <p><strong>Submitted:</strong> ${timestamp || "Not available"}</p>
    `;
}