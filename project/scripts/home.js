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
    small: "imagesshow-img-3-small.jpg",
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

document.getElementById("search-btn").addEventListener("click", function () {
    let query = document.getElementById("search-input").value;
    if (query) {
        alert("Searching for: " + query);
        // You can replace the alert with actual search functionality
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

    // Empty spaces before first day
    for (let i = 0; i < firstDay; i++) {
        let emptyDiv = document.createElement("div");
        daysContainer.appendChild(emptyDiv);
    }

    // Days of the month
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

const video = document.getElementById("video");
const playPauseBtn = document.getElementById("play-pause");
const progress = document.getElementById("progress");
const muteBtn = document.getElementById("mute");

// Play/Pause Toggle
playPauseBtn.addEventListener("click", () => {
    if (video.paused) {
        video.play();
        playPauseBtn.textContent = "⏸";
    } else {
        video.pause();
        playPauseBtn.textContent = "▶";
    }
});

// Update progress bar
video.addEventListener("timeupdate", () => {
    progress.value = (video.currentTime / video.duration) * 100;
});

// Seek video
progress.addEventListener("input", () => {
    video.currentTime = (progress.value / 100) * video.duration;
});

// Mute/Unmute
muteBtn.addEventListener("click", () => {
    video.muted = !video.muted;
    muteBtn.textContent = video.muted ? "🔇" : "🔊";
});