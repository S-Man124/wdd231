
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-navigation");
const yearElement = document.querySelector("#current-year");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );
    });
}

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

