const url = `https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=05333fd102aa44ae3646dcb33f0155e5`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=49.75&lon=6.64&units=imperial&appid=05333fd102aa44ae3646dcb33f0155e5`;


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

    fetchMemberData();

    apiFetch();


});

async function fetchMemberData() {
    const response = await fetch('../chamber/data/members.json');
    const members = await response.json();
    displayMembers(members);
}

function displayMembers(members) {
    const selectedMembers = [];
    const businessCards = [];

    businessCards.push(document.getElementById('businessCard1'));
    businessCards.push(document.getElementById('businessCard2'));
    businessCards.push(document.getElementById('businessCard3'));

    while (selectedMembers.length < 3) {
        const randomIndex = Math.floor(Math.random() * members.length);
        const member = members[randomIndex];
        if (!selectedMembers.includes(member)) {
            if (member.membership_level === 3 || member.membership_level === 2) {
                selectedMembers.push(member);
            }
        }
    }

    selectedMembers.forEach((member, index) => {
        let img = document.getElementById(`businessLogo${index + 1}`);

        document.getElementById(`b-name${index + 1}`).textContent = member.name;
        document.getElementById(`b-tag${index + 1}`).textContent = member.description;
        img.setAttribute('src', `../chamber/images/${member.image}`);
        img.setAttribute('alt', `${member.name} Logo`);
        img.setAttribute('width', '200');
        img.setAttribute('height', '200');
        img.setAttribute('loading', 'lazy');
        document.getElementById(`email${index + 1}`).innerHTML = `<strong>Email:</strong> ${member.email}`;
        document.getElementById(`phone${index + 1}`).innerHTML = `<strong>Phone:</strong> ${member.phone}`;
        document.getElementById(`url${index + 1}`).innerHTML = `${member.website}`;
        document.getElementById(`url${index + 1}`).setAttribute('href', `${member.website}`);



    });
}

const apiFetch = async() => {
    try {
        const response = await fetch(url);
        const foreResponse = await fetch(forecastURL);
        if (response.ok || foreResponse.ok) {
            const data = await response.json();
            const foreData = await foreResponse.json();
            console.log(foreData);
            console.log(data);
            displayWeather(data, foreData);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

const displayWeather = (data, foreData) => {
    const weatherImgElement = document.getElementById('weatherIcon');
    const imgSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let temp = data.main.temp;
    let description = data.weather[0].description;
    let high = data.main.temp_max;
    let low = data.main.temp_min;
    let humidity = data.main.humidity;
    // ForeCast Variables 
    // Convert the timestamp to milliseconds
    const timestamp1 = foreData.list[7].dt * 1000;
    const date1 = new Date(timestamp1);
    const dayOfWeek1 = date1.toLocaleDateString('en-US', { weekday: 'long' });
    const timestamp2 = foreData.list[15].dt * 1000;
    const date2 = new Date(timestamp2);
    const dayOfWeek2 = date2.toLocaleDateString('en-US', { weekday: 'long' });

    document.getElementById('temp').innerHTML = `<strong>Temp: </strong>${temp}°F`;
    weatherImgElement.setAttribute('src', imgSrc);
    weatherImgElement.setAttribute('alt', description);
    weatherImgElement.setAttribute('width', "50");
    weatherImgElement.setAttribute('height', '100');
    weatherImgElement.setAttribute('loading', 'lazy');

    document.getElementById('description').innerHTML = `${description}`;
    document.getElementById('high').innerHTML = `<strong>High:</strong> ${high}°F`;
    document.getElementById('low').innerHTML = `<strong>Low:</strong> ${low}°F`;
    document.getElementById('humidity').innerHTML = `<strong>Humidity:</strong> ${humidity}%`;

    document.getElementById('day1').innerHTML = `<strong>Today:</strong> ${foreData.list[0].main.temp}°F`;
    document.getElementById('day2').innerHTML = `<strong>${dayOfWeek1}:</strong> ${foreData.list[7].main.temp}°F`;
    document.getElementById('day3').innerHTML = `<strong>${dayOfWeek2}</strong> ${foreData.list[0].main.temp}°F`;
};