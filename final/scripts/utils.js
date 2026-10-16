
export function formatIncidentDate(dateString) {
    const date = new Date(`${dateString}T00:00:00`);

    if (Number.isNaN(date.getTime())) {
        return dateString;
    }

    return new Intl.DateTimeFormat("en-ZA", {
        day: "numeric",
        month: "short",
        year: "numeric"
    }).format(date);
}
