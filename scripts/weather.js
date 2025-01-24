const figureElement = document.getElementById('weatherFigure');
const weatherImgElement = document.getElementById('weatherImg');
const weatherCaptionElement = document.getElementById('weatherCaption');
const currentTempElement = document.getElementById('current-temp');

const url = `https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=05333fd102aa44ae3646dcb33f0155e5`;

const apiFetch = async() => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayWeather(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }

}

const displayWeather = (data) => {
    currentTempElement.innerHTML = `${data.main.temp}°F`;
    const imgSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let description = data.weather[0].description;
    weatherImgElement.setAttribute('src', imgSrc);
    weatherImgElement.setAttribute('alt', description);
    weatherCaptionElement.textContent = description;
};

apiFetch();