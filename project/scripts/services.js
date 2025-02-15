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

document.getElementById("search-btn").addEventListener("click", async function () {
    let query = document.getElementById("search-input").value;

    if (query) {
        alert("Searching for weather in: " + query);

        try {
            // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
            const apiKey = '05333fd102aa44ae3646dcb33f0155e5';
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`);

            const data = await response.json();
            console.log('API Response:', data);

            if (response.ok) {
                // Extract relevant data
                let weather = data.weather[0].description;
                let temperature = data.main.temp;
                let cityName = data.name;
                let country = data.sys.country;
                let iconCode = data.weather[0].icon; // Get the icon code from the API response
                let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`; // Construct the icon URL

                // Display the weather information in the dialog box
                let modal = document.getElementById("response");
                modal.innerHTML = '';

                modal.innerHTML = `
                    <button id="closeModalButton">❌</button>
                    <h2>Weather in ${cityName}, ${country}:</h2>
                    <img src="${iconUrl}" alt="Weather icon" width="50" height="50">
                    <p>Temperature: ${temperature}°C</p>
                    <p>Weather: ${weather}</p>
                `;

                modal.style.display = "flex";
                modal.style.flexDirection = "column";
                modal.style.justifyContent = "center";
                modal.style.alignItems = "center";
                modal.showModal();

                document.getElementById("closeModalButton").addEventListener("click", () => {
                    modal.close();
                    modal.style.display = "none";
                    modal.innerHTML = '';
                });

            } else {
                alert("Failed to fetch weather data.");
            }
        } catch (error) {
            console.error("Error during search:", error);
            alert("An error occurred while fetching weather information.");
        }
    } else {
        alert("Please enter a city name.");
    }
});
