(function() {
    const themeToggleButton = document.getElementById("arclib-theme-toggle");
    const iconSun = themeToggleButton.querySelector(".arclib-btn-icon-left");
    const iconMoon = themeToggleButton.querySelector(".arclib-btn-icon-right");
    const doc = document.documentElement;

    function setTheme(theme) {
        if (theme === "system") {
            const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            theme = systemDark ? "dark" : "light";
        }

        doc.classList.remove("light", "dark");
        doc.classList.add(theme);
        doc.style.colorScheme = theme;

        if (theme === "light") {
            iconSun.style.display = "none";
            iconMoon.style.display = "inline-flex";
        } else {
            iconSun.style.display = "inline-flex";
            iconMoon.style.display = "none";
        }
    }

    function saveTheme(theme) {
        localStorage.setItem("color-theme", theme);
    }

    const savedTheme = localStorage.getItem("color-theme") || "system";
    setTheme(savedTheme);

    themeToggleButton.addEventListener("click", function (e) {
        e.preventDefault();

        const currentTheme = doc.classList.contains("dark") ? "dark" : "light";
        const newTheme = currentTheme === "light" ? "dark" : "light";

        setTheme(newTheme);
        saveTheme(newTheme);
    });

    // Listen for system changes
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
        if (localStorage.getItem("color-theme") === "system") {
            setTheme("system");
        }
    });
})();