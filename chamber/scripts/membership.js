const benefitLinks = document.querySelectorAll(".benefit-link");
const closeButtons = document.querySelectorAll(".close-dialog");

benefitLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const dialogId = link.dataset.dialog;
        const dialog = document.querySelector(`#${dialogId}`);

        if (dialog) {
            dialog.showModal();
        }
    });
});

closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const dialog = button.closest("dialog");

        if (dialog) {
            dialog.close();
        }
    });
});