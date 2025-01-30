const membershipLevels = [{
        level: "Non-Profit Org",
        cost: "$50/year",
        benefits: [
            "Access to basic resources",
            "Listing on the website",
            "Invitation to annual meeting"
        ]
    },
    {
        level: "Bronze",
        cost: "$100/year",
        benefits: [
            "Access to basic resources",
            "Listing on the website",
            "Invitation to annual meeting",
            "Spotlight position on homepage for 1 month",
            "Discounts on events"
        ]
    },
    {
        level: "Silver",
        cost: "$250/year",
        benefits: [
            "Access to all resources",
            "Listing on the website",
            "Invitation to annual meeting",
            "Spotlight position on homepage for 2 months",
            "Discounts on events",
            "Exclusive access to member-only workshops",
            "Recognition in newsletters"
        ]
    },
    {
        level: "Gold",
        cost: "$500/year",
        benefits: [
            "Access to all resources",
            "Priority listing on the website",
            "Invitation to annual meeting",
            "Spotlight position on homepage for 3 months",
            "Discounts on events",
            "Exclusive access to member-only workshops",
            "Recognition in newsletters",
            "Personalized consultation or coaching",
            "Free access to select events"
        ]
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

    document.getElementById('timestamp').value = new Date().toLocaleDateString('en-GB');

});

function displayMembershipDetails(selectedLevel) {
    let modalContent = document.getElementById("membership-details");
    modalContent.innerHTML = '';

    const membership = membershipLevels.find(level => level.level === selectedLevel);

    if (membership) {
        modalContent.innerHTML = `
        <button id="closeModalButton">❌</button>
        <h2>${membership.level} Membership</h2>
        <p><strong>Cost</strong>: ${membership.cost}</p>
        <h3>Benefits</h3>
        <ul>
            ${membership.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
        </ul>
        `;
    } else {
        modalContent.innerHTML = `<p>Membership level not found.</p>`;
    }

    document.getElementById("membership-details").showModal();

    document.getElementById("closeModalButton").addEventListener("click", () => {
        document.getElementById("membership-details").close();
    });
}