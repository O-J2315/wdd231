const images = [{
    small: "images/show-img-1-small.jpg",
    medium: "images/show-img-1-medium.jpg",
    large: "images/show-img-1-large.jpg"
},
{
    small: "images/show-img-2-small.jpg",
    medium: "images/show-img-2-medium.jpg",
    large: "images/show-img-2-large.jpg"
},
{
    small: "images/show-img-3-small.jpg",
    medium: "images/show-img-3-medium.jpg",
    large: "images/show-img-3-large.jpg"
}
];


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


    // Call the calendar function
    generateCalendar(currentMonth, currentYear);

});

let index = 0;

function rotateImages() {
    index = (index + 1) % images.length;

    document.getElementById("source1-small").srcset = images[index].small;
    document.getElementById("source1-medium").srcset = images[index].medium;
    document.getElementById("img1").src = images[index].large;

    document.getElementById("source2-small").srcset = images[(index + 1) % images.length].small;
    document.getElementById("source2-medium").srcset = images[(index + 1) % images.length].medium;
    document.getElementById("img2").src = images[(index + 1) % images.length].large;

    document.getElementById("source3-small").srcset = images[(index + 2) % images.length].small;
    document.getElementById("source3-medium").srcset = images[(index + 2) % images.length].medium;
    document.getElementById("img3").src = images[(index + 2) % images.length].large;
}

setInterval(rotateImages, 10000);

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

function generateCalendar(month, year) {
    const daysContainer = document.getElementById("calendar-days");
    const monthYearText = document.getElementById("calendar-month-year");
    daysContainer.innerHTML = "";

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    monthYearText.innerText = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        let emptyDiv = document.createElement("div");
        daysContainer.appendChild(emptyDiv);
    }

    for (let day = 1; day <= totalDays; day++) {
        let dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.innerText = day;

        const today = new Date();
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayElement.classList.add("today");
        }

        daysContainer.appendChild(dayElement);
    }
}

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

document.getElementById("prev-month").addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
});

document.getElementById("next-month").addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
});
// Video Player
const playPauseButton = document.getElementById('play-pause');
const progressBar = document.getElementById('progress');
const muteButton = document.getElementById('mute');
const iframe = document.getElementById('video');

// Create a YouTube player instance
let player;

// When the YouTube iframe API is ready, we can set up the player
function onYouTubeIframeAPIReady() {
    player = new YT.Player('video', {
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

// This is fired when the player's state changes (play, pause, etc.)
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        playPauseButton.innerHTML = '⏸'; // Change button to pause
    } else if (event.data == YT.PlayerState.PAUSED) {
        playPauseButton.innerHTML = '▶'; // Change button to play
    }
}

// Play or pause the video when the button is clicked
playPauseButton.addEventListener('click', function () {
    if (player.getPlayerState() == YT.PlayerState.PLAYING) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
});

// Mute or unmute the video when the mute button is clicked
muteButton.addEventListener('click', function () {
    if (player.isMuted()) {
        player.unMute();
        muteButton.innerHTML = '🔊';
    } else {
        player.mute();
        muteButton.innerHTML = '🔇';
    }
});

// Update the progress bar as the video plays
function updateProgressBar() {
    const currentTime = player.getCurrentTime();
    const duration = player.getDuration();
    const value = (currentTime / duration) * 100;
    progressBar.value = value;
}

// Update the progress bar every second while the video is playing
setInterval(function () {
    if (player.getPlayerState() === YT.PlayerState.PLAYING) {
        updateProgressBar();
    }
}, 1000);

// Load the YouTube API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.body.appendChild(tag);