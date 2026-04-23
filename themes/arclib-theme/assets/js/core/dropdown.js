(function() {
    document.addEventListener("click", function (e) {
        const toggle = e.target.closest("[data-dropdown-toggle]");
        const menu = e.target.closest(".arclib-dropdown-menu");

        if (toggle) {
            e.preventDefault();
            const container = toggle.closest(".arclib-dropdown");
            const isOpen = container.classList.contains("is-open");

            document.querySelectorAll(".arclib-dropdown.is-open").forEach(d => {
                if (d !== container) d.classList.remove("is-open");
            });

            container.classList.toggle("is-open", !isOpen);
            return;
        }

        if (menu) {
            return;
        }

        document.querySelectorAll(".arclib-dropdown.is-open").forEach(dropdown => {
            dropdown.classList.remove("is-open");
        });
    });
})();