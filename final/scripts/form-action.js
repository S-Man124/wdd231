
const details = document.querySelector("#submission-details");
const params = new URLSearchParams(window.location.search);

const fields = [
    ["reporter", "Name"],
    ["email", "Email Address"],
    ["category", "Incident Category"],
    ["location", "General Location"],
    ["description", "Incident Description"]
];

if (details) {
    const hasSubmission = fields.some(([key]) => params.has(key));

    if (!hasSubmission) {
        const message = document.createElement("p");
        message.textContent = "No incident information was provided.";
        details.replaceWith(message);
    } else {
        fields.forEach(([key, label]) => {
            const term = document.createElement("dt");
            const value = document.createElement("dd");

            term.textContent = label;
            value.textContent = params.get(key) || "Not provided";

            details.append(term, value);
        });
    }
}
