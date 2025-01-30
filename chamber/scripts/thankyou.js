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


const showInfo = document.getElementById('results');
showInfo.innerHTML = `

    <p><strong>Name:</strong> ${show('first-name')} ${show('last-name')}</p>
    <p><strong>Title:</strong> ${show('organization-title')}</p>
    <p><strong>Email:</strong> <a href='${show('email')}' target=_blanc>${show('email')}</a></p>
    <p><strong>Phone:</strong> ${show('phone')}</p>
    <p><strong>Company:</strong> ${show('organization_name')}</p>
    <p><strong>Membership Level:</strong> ${show('membership_level')}</p>
    <p><strong>Registration Date:</strong> ${show('timestamp')}</p>





    `;