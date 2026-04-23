(function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(function (entry) {
            const id = entry.target.getAttribute("id");
            const link = document.querySelector(`.arclib-toc-container a[href="#${id}"]`);
            if (entry.isIntersecting && link) {
                document.querySelectorAll(".arclib-toc-container a").forEach(function (a) {
                    a.classList.remove("arclib-toc-active");
                });
                link.classList.add("arclib-toc-active");
            }
        });
    }, { rootMargin: "0px 0px -95% 0px" });

    document.querySelectorAll("h2, h3, h4").forEach(section => observer.observe(section));
})();