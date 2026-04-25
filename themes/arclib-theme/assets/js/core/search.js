(function() {
    let index;
    const input = document.getElementsByClassName("arclib-search-input")[0];
    const results = document.getElementsByClassName("arclib-search-results")[0];

    async function init() {
        index = new FlexSearch.Document({
            tokenize: "forward",
            cache: 100,
            document: {
                id: "url",
                store: ["title", "content", "breadcrumb", "url"],
                index: ["title", "content"]
            }
        });

        const data = await (await fetch("/index.json")).json();
        data.forEach(item => index.add(item));
    }

    function search(e) {
        const query = e.target.value;
        results.innerHTML = "";

        if (!query) {
            results.classList.add("arclib-search-results-hidden");
            return;
        }

        const searchResults = index.search(query, { limit: 10, enrich: true });

        if (searchResults.length > 0) {
            const items = searchResults[0].result;
            items.forEach(item => {
                const doc = item.doc;
                const excerpt = doc.content ? doc.content.substring(0, 80) + "..." : "No description available";
                const li = document.createElement("li");
                li.className = "arclib-search-results-item";
                li.innerHTML = `
                    <div class="arclib-search-results-item-breadcrumb">${doc.breadcrumb || ""}</div>
                    <a class="arclib-search-results-item-title" href="${doc.url}" tabindex="0">${doc.title || "Untitled"}</a>
                    <div class="arclib-search-results-item-excerpt">${excerpt}</div>
                `;
                results.appendChild(li);
            });
            results.classList.remove("arclib-search-results-hidden");
        }
    }

    input.addEventListener("focus", init, { once: true });
    input.addEventListener("input", search);

    if (input) {
        input.addEventListener("focus", () => {
            if (input.value.length > 0) {
                results.classList.remove("arclib-search-results-hidden");
            }
        });

        input.addEventListener("blur", (e) => {
            if (e.relatedTarget && results.contains(e.relatedTarget)) {
                return;
            }
            results.classList.add("arclib-search-results-hidden");
        });
    }

    document.addEventListener("keydown", function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "k") {
            if (input) {
                e.preventDefault();
                input.focus();
                if(input.value.length > 0) {
                    results.classList.remove("arclib-search-results-hidden");
                }
            }
        }
    })
})();