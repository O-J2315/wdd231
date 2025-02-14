const url = window.location.href;

const formData = url.split('?')[1].split('&');

console.log(formData);


function show(cup) {
    formData.forEach((element) => {
        if (element.startsWith(cup)) {
            result = element.split('=')[1].replace(['%40'], ['@']).replaceAll('+', ' ').replaceAll('%2F', '/');
            console.log(result);
        }
    });
    return result;
}

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

    document.getElementById('timestamp').value = new Date().toLocaleDateString('en-GB');

});


const showInfo = document.getElementById('results');
showInfo.innerHTML = `

    <p><strong>Name:</strong> ${show('first-name')} ${show('last-name')}</p>
    <p><strong>Title:</strong> ${show('organization-title')}</p>
   <p><strong>Email:</strong> <a href="mailto:${show('email')}" target="_blank">${show('email')}</a></p>
    <p><strong>Phone:</strong> ${show('phone')}</p>
    <p><strong>Company:</strong> ${show('organization_name')}</p>
    <p><strong>Registration Date:</strong> ${show('timestamp')}</p>

`;