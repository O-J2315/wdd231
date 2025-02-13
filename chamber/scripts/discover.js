document.addEventListener("DOMContentLoaded", function () {
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

    loadPlaces(places);
});

import { places } from '../data/places.mjs';

async function loadPlaces(places) {
    try {
        const container = document.querySelector(".cards");

        places.forEach(place => {
            const card = document.createElement("div");

            const h2 = document.createElement("h2");
            h2.textContent = place.name

            const img = document.createElement('img');
            img.src = `${place.image}`;
            img.loading = 'lazy'
            img.width = '300';
            img.height = '200';
            img.alt = 'place.name';

            const address = document.createElement("address");
            address.textContent = place.address;

            const description = document.createElement("p");
            description.textContent = place.description;

            const button = document.createElement('button');
            button.innerHTML = `<a href="${place.link}" target="_blank">Learn More</a>`;




            card.appendChild(h2);
            card.appendChild(img);
            card.appendChild(address);
            card.appendChild(description);
            card.appendChild(button);

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading places:", error);
    }
}