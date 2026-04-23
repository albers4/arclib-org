(function() {
    document.addEventListener("click", function (e) {
        const button = e.target.closest("[data-sidebar-toggle]");

        if (button) {
            button.closest("li").classList.toggle("arclib-sidebar-open");
        }
    });
})();