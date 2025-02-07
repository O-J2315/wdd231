document.addEventListener("DOMContentLoaded", function() {
    const visitMessage = document.getElementById("visit-message");
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSinceLastVisit = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

        if (daysSinceLastVisit < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            visitMessage.textContent = `You last visited ${daysSinceLastVisit} ${daysSinceLastVisit === 1 ? "day" : "days"} ago.`;
        }
    }

    localStorage.setItem("lastVisit", now);

    const toggleButton = document.querySelector('.toggle-button');
    const navbarLinks = document.querySelector('.navbar-links');
    toggleButton.addEventListener('click', () => {
        navbarLinks.classList.toggle('show');
        toggleButton.classList.toggle('active');
    });
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => { if (link.getAttribute('href') === currentPage) { link.classList.add('current'); } });

    const lastModifiedElement = document.getElementById('lastModified');
    const lastModifiedDate = document.lastModified;
    lastModifiedElement.innerHTML = `Last Update: ${lastModifiedDate}`;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    document.getElementById("currentYear").textContent = ` ${year}`;

    loadPlaces();
});

async function loadPlaces() {
    try {
        const response = await fetch("../chamber/data/places.json");
        const places = await response.json();
        const container = document.querySelector(".cards");

        places.forEach(place => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <h2>${place.name}</h2>
                <figure>
                    <img src="${place.image}" alt="${place.alt}" width="300" height="200" loading="lazy">
                </figure>
                <address>${place.address}</address>
                <p>${place.description}</p>
                <a href="${place.link}" target="_blank"><button>Learn More</button></a>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading places:", error);
    }
}