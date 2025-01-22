// document.addEventListener('DOMContentLoaded', () => {
//     fetchMemberData();

//     const toggleButton = document.querySelector('.toggle-button');
//     const navbarLinks = document.querySelector('.navbar-links');

//     toggleButton.addEventListener('click', () => {

//         navbarLinks.classList.toggle('show');
//         toggleButton.classList.toggle('active');

//     });

//     const currentPage = window.location.pathname.split("/").pop() || "index.html";
//     const navLinks = document.querySelectorAll('.nav-link');

//     navLinks.forEach(link => {
//         if (link.getAttribute('href') === currentPage) {
//             link.classList.add('current');
//         }
//     });

// });

// async function fetchMemberData() {

//     const response = await fetch('../chamber/data/members.json');
//     const members = await response.json();
//     console.log(members);
//     displayMembers(members);

// }

// function displayMembers(members) {
//     const layoutElement = document.getElementById('layout');
//     members.forEach(member => {

//         const memberDiv = document.createElement('div');
//         memberDiv.classList.add('member');

//         const name = document.createElement('h2');
//         name.textContent = member.name;
//         memberDiv.appendChild(name);

//         const link = document.createElement('a');
//         link.href = member.website;
//         link.target = '_blank';
//         link.rel = 'noopener noreferrer';

//         const img = document.createElement('img');
//         img.src = `../chamber/images/${member.image}`;
//         img.alt = member.name;
//         img.width = 400;
//         img.height = 200;
//         img.loading = 'eager';

//         link.appendChild(img);
//         memberDiv.appendChild(link);

//         const address = document.createElement('p');
//         address.textContent = `Address: ${member.address}`;
//         memberDiv.appendChild(address);

//         const phone = document.createElement('p');
//         phone.textContent = `Phone: ${member.phone}`;
//         memberDiv.appendChild(phone);

//         const description = document.createElement('p');
//         description.textContent = member.description;
//         description.style.fontStyle = 'italic';
//         description.style.fontWeight = 'bold';
//         memberDiv.appendChild(description);

//         memberDiv.style.border = `solid 3px ${member.membership_level === 3 ? 'gold' : member.membership_level === 2 ? 'silver' : 'green'}`;

//         memberDiv.setAttribute('class', 'member-card');

//         layoutElement.appendChild(memberDiv);
//     });
// }

// document.getElementById('toggleView').addEventListener('click', () => {
//     const layoutElement = document.getElementById('layout');
//     layoutElement.classList.toggle('list-view');
// });

// const lastModifiedElement = document.getElementById('lastModified');
// const lastModifiedDate = document.lastModified;

// lastModifiedElement.innerHTML = `Last Update: ${lastModifiedDate}`;

// const currentDate = new Date();
// const year = currentDate.getFullYear();

// document.getElementById("currentYear").textContent = ` ${year}`;

document.addEventListener('DOMContentLoaded', () => {
    fetchMemberData();
    const toggleButton = document.querySelector('.toggle-button');
    const navbarLinks = document.querySelector('.navbar-links');
    toggleButton.addEventListener('click', () => {
        navbarLinks.classList.toggle('show');
        toggleButton.classList.toggle('active');
    });
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => { if (link.getAttribute('href') === currentPage) { link.classList.add('current'); } });

    const layoutElement = document.getElementById('layout');
    layoutElement.innerHTML = '';

});
async function fetchMemberData() {
    const response = await fetch('../chamber/data/members.json');
    const members = await response.json();
    displayMembers(members);
}

function displayMembers(members) {
    const layoutElement = document.getElementById('layout');
    members.forEach(member => {
        const memberDiv = document.createElement('div');
        memberDiv.classList.add('member');
        memberDiv.setAttribute('class', 'member-card');
        const name = document.createElement('h2');
        name.textContent = member.name;
        memberDiv.appendChild(name);
        const link = document.createElement('a');
        link.href = member.website;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        const img = document.createElement('img');
        img.src = `../chamber/images/${member.image}`;
        img.alt = member.name;
        img.width = 400;
        img.height = 200;
        img.loading = 'lazy';
        link.appendChild(img);
        memberDiv.appendChild(link);
        const address = document.createElement('p');
        address.textContent = `Address: ${member.address}`;
        memberDiv.appendChild(address);
        const phone = document.createElement('p');
        phone.textContent = `Phone: ${member.phone}`;
        memberDiv.appendChild(phone);
        const description = document.createElement('p');
        description.textContent = member.description;
        memberDiv.appendChild(description);
        memberDiv.style.border = `solid 3px ${member.membership_level === 3 ? 'gold' : member.membership_level === 2 ? 'silver' : 'green'}`;
        layoutElement.appendChild(memberDiv);
    });
}
document.getElementById('toggleView').addEventListener('click', () => {
    const layoutElement = document.getElementById('layout');
    const cardList = document.querySelectorAll('.member-card');
    cardList.forEach(card => card.classList.toggle('list-view'));
    layoutElement.classList.toggle('list-view');
});
const lastModifiedElement = document.getElementById('lastModified');
const lastModifiedDate = document.lastModified;
lastModifiedElement.innerHTML = `Last Update: ${lastModifiedDate}`;
const currentDate = new Date();
const year = currentDate.getFullYear();
document.getElementById("currentYear").textContent