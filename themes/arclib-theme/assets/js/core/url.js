(function() {
    document.querySelectorAll("[data-query-key]").forEach(el => {
        const key = el.dataset.queryKey;
        const value = el.dataset.queryValue;

        const params = new URLSearchParams(window.location.search);
        params.set(key, value);
        el.href = "?" + params.toString();

        const current = new URLSearchParams(window.location.search).get(key);
        if (current == value || (!current && value == "all")) {
            el.classList.add("active");
        } else {
            el.classList.remove("active");
        }
    });
})();