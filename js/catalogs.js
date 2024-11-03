document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("dynamic-cards-container");

    fetch("catalogs/files.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load files.json");
            }
            return response.json();
        })
        .then(data => {
            data.files.forEach(file => {
                const card = document.createElement("div");
                card.classList.add("custom-block", "custom-block-topics-listing", "bg-white", "shadow-lg", "mb-5");

                card.innerHTML = `
                    <div class="d-flex">
                        <img src="${file.image}" class="custom-block-image img-fluid" alt="${file.name}">

                        <div class="custom-block-topics-listing-info d-flex">
                            <div>
                                <h5 class="mb-2">${file.name}</h5>
                                <p class="mb-0">${file.description}</p>

                                <a href="${file.path}" class="btn custom-btn mt-3 mt-lg-4" target="_blank">Preuzmi PDF</a>
                            </div>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Greška pri učitavanju kataloga:", error);
            container.innerHTML = "<p>Trenutno imamo problem sa učitavanjem kataloga.</p>";
        });
	
	// Routing handling
	// Check if we're on the news page
    if (document.body.id === "news-page") {
        document.querySelectorAll("a.click-scroll").forEach((link) => {
            link.addEventListener("click", function (event) {
                event.preventDefault();
                const targetAnchor = link.getAttribute("href");

                // Redirect to index.html, then update the URL hash
                window.location.href = "index.html" + targetAnchor;
            });
        });
    }

    // Handle URL cleaning when on the home page
    if (document.body.id === "home-page") {
        // Clean the URL by removing 'index.html' if it exists in the hash
        if (window.location.href.includes("index.html#")) {
            history.replaceState(
                null,
                "",
                window.location.href.replace("index.html", "")
            );
        }
    }
});
