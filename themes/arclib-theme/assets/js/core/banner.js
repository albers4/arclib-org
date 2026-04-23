(function() {
    const banner = document.getElementById("arclib-banner");
    const closeBtn = document.getElementById("arclib-banner-close");
    const storageKey = "banner-closed";

    if (!banner || !closeBtn) return;

    if (localStorage.getItem(storageKey) === "1") {
        banner.style.display = "none";
        return;
    }

    closeBtn.addEventListener("click", function(e) {
        e.preventDefault();
        banner.style.display = "none";
        localStorage.setItem(storageKey, "1");
    })
})();