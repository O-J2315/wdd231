document.addEventListener('DOMContentLoaded', () => {
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

    loadServices(services);

});

import { services } from '../data/services.mjs';

async function loadServices(services) {
    try {
        const cardContainer = document.getElementById('cards-div');

        services.forEach(service => {
            const card = document.createElement("div");

            const h2 = document.createElement("h2");
            h2.textContent = service.name

            const img = document.createElement('img');
            img.src = `${service.image}`;
            img.loading = 'lazy'
            img.width = '300';
            img.height = '200';
            img.alt = `${service.name}`;

            const address = document.createElement("address");
            address.textContent = service.types;

            const description = document.createElement("p");
            description.textContent = service.description;

            const span = document.createElement('span');
            span.innerHTML = `<a href="https://wa.me/19153170849?text=I%20want%20a%20quote%20for%20${service.name}" target="_blank">Get a Quote</a>`;




            card.appendChild(h2);
            card.appendChild(img);
            card.appendChild(address);
            card.appendChild(description);
            card.appendChild(span);

            cardContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading Services:", error);
    }
}
