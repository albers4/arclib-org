(function() {
    const grid = document.querySelector(".arclib-section-grid");
    const list = document.querySelector(".arclib-section-list");
    const params = new URLSearchParams(window.location.search);

    const buttonList = document.querySelector(".arclib-toolbar-view-list");
    const buttonGrid = document.querySelector(".arclib-toolbar-view-grid");

    const isSection = grid && list && buttonList && buttonGrid;

    if (params.get("display") == "grid" && isSection) {
        grid.classList.add("arclib-section-grid-show");
        list.classList.remove("arclib-section-list-show");
        buttonGrid.classList.add("arclib-btn-mute-active");
        buttonList.classList.remove("arclib-btn-mute-active");
    } else if (params.get("display") == "list" && isSection) {
        grid.classList.remove("arclib-section-grid-show");
        list.classList.add("arclib-section-list-show");
        buttonGrid.classList.remove("arclib-btn-mute-active");
        buttonList.classList.add("arclib-btn-mute-active");
    } else if (isSection) {
        grid.classList.add("arclib-section-grid-show");
        list.classList.remove("arclib-section-list-show");
        buttonGrid.classList.add("arclib-btn-mute-active");
        buttonList.classList.remove("arclib-btn-mute-active");
    }

    // Filter
    const tag = params.get("tag");

    if (tag && tag !== "all") {
        document.querySelectorAll("[data-tags]").forEach(el => {
            const tags = el.dataset.tags.split(",");
            if (!tags.includes(tag)) el.style.display = "none";
        });
    }

    // Sort
    const sort = params.get("sort");
    if (sort) {
        const containers = [
            document.querySelector(".arclib-section-grid"),
            document.querySelector(".arclib-section-list")
        ];

        containers.forEach(container => {
            if (!container) return;
            const items = Array.from(container.querySelectorAll("[data-date]"));

            items.sort((a, b) => {
                switch (sort) {
                    case "asc":  return a.dataset.date - b.dataset.date;
                    case "desc": return b.dataset.date - a.dataset.date;
                    case "az":   return a.dataset.title.localeCompare(b.dataset.title);
                    case "za":   return b.dataset.title.localeCompare(a.dataset.title);
                    default:     return 0;
                }
            });

            items.forEach(el => container.appendChild(el));
        });
    }

})();