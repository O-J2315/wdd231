document.addEventListener('DOMContentLoaded', () => {
    fetchMemberData();
});

async function fetchMemberData() {

    const response = await fetch('../chamber/data/members.json');
    const members = await response.json();
    console.log(members);
    displayMembers(members);

}

function displayMembers(members) {
    const layoutElement = document.getElementById('layout');
    members.forEach(member => {

        const memberDiv = document.createElement('div');
        memberDiv.classList.add('member');

        const name = document.createElement('h2');
        name.textContent = member.name;
        memberDiv.appendChild(name);

        const img = document.createElement('img');
        img.src = `../chamber/images/${member.image}`;
        img.alt = member.name;
        img.width = 200;
        img.height = 200;
        memberDiv.appendChild(img);

        const address = document.createElement('p');
        address.textContent = `Address: ${member.address}`;
        memberDiv.appendChild(address);

        const phone = document.createElement('p');
        phone.textContent = `Phone: ${member.phone}`;
        memberDiv.appendChild(phone);

        memberDiv.setAttribute('class', 'member-card');

        layoutElement.appendChild(memberDiv);
    });
}

document.getElementById('toggleView').addEventListener('click', () => {
    const layoutElement = document.getElementById('layout');
    layoutElement.classList.toggle('list-view');
});